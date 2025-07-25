-- Create quiz_responses table
CREATE TABLE IF NOT EXISTS quiz_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT NOT NULL,
    user_first_name TEXT NOT NULL,
    user_last_name TEXT NOT NULL,
    user_company TEXT,
    responses JSONB NOT NULL DEFAULT '{}',
    total_score INTEGER CHECK (total_score >= 15 AND total_score <= 85),
    industry TEXT,
    company_size TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_reports table  
CREATE TABLE IF NOT EXISTS ai_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quiz_response_id UUID REFERENCES quiz_responses(id) ON DELETE CASCADE,
    stage1_content TEXT,     -- Stage 1 AI analysis
    stage2_content TEXT,     -- Stage 2 recommendations
    report_status TEXT DEFAULT 'generating' CHECK (
        report_status IN ('pending', 'generating', 'stage1_complete', 'completed', 'failed')
    ),
    access_token TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid()::TEXT,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_quiz_responses_email ON quiz_responses(user_email);
CREATE INDEX idx_quiz_responses_completed ON quiz_responses(completed_at);
CREATE INDEX idx_ai_reports_access_token ON ai_reports(access_token);
CREATE INDEX idx_ai_reports_status ON ai_reports(report_status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to both tables
CREATE TRIGGER update_quiz_responses_updated_at 
    BEFORE UPDATE ON quiz_responses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_reports_updated_at 
    BEFORE UPDATE ON ai_reports 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_reports ENABLE ROW LEVEL SECURITY;

-- Policy for quiz_responses: Users can only insert (no read/update/delete via public access)
CREATE POLICY "Enable insert for all users" ON quiz_responses
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Policy for ai_reports: Can be read with valid access token
CREATE POLICY "Enable read with access token" ON ai_reports
    FOR SELECT TO anon, authenticated
    USING (access_token IS NOT NULL);

-- Policy for ai_reports: Service role can do everything
CREATE POLICY "Service role has full access to quiz_responses" ON quiz_responses
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role has full access to ai_reports" ON ai_reports
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON quiz_responses TO anon, authenticated;
GRANT SELECT ON ai_reports TO anon, authenticated;
GRANT ALL ON quiz_responses TO service_role;
GRANT ALL ON ai_reports TO service_role;