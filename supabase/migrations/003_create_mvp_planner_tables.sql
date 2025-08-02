-- Create mvp_planner_responses table
CREATE TABLE IF NOT EXISTS mvp_planner_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT NOT NULL,
    user_first_name TEXT NOT NULL,
    user_last_name TEXT NOT NULL,
    user_company TEXT,
    responses JSONB NOT NULL DEFAULT '{}',
    total_score INTEGER,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mvp_planner_reports table  
CREATE TABLE IF NOT EXISTS mvp_planner_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mvp_planner_response_id UUID REFERENCES mvp_planner_responses(id) ON DELETE CASCADE,
    report_content TEXT,
    report_status TEXT DEFAULT 'pending' CHECK (
        report_status IN ('pending', 'generating', 'completed', 'failed')
    ),
    access_token TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid()::TEXT,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_mvp_planner_responses_email ON mvp_planner_responses(user_email);
CREATE INDEX idx_mvp_planner_responses_completed ON mvp_planner_responses(completed_at);
CREATE INDEX idx_mvp_planner_reports_access_token ON mvp_planner_reports(access_token);
CREATE INDEX idx_mvp_planner_reports_status ON mvp_planner_reports(report_status);

-- Add triggers for updated_at
CREATE TRIGGER update_mvp_planner_responses_updated_at 
    BEFORE UPDATE ON mvp_planner_responses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mvp_planner_reports_updated_at 
    BEFORE UPDATE ON mvp_planner_reports 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE mvp_planner_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE mvp_planner_reports ENABLE ROW LEVEL SECURITY;

-- Policy for mvp_planner_responses: Users can only insert
CREATE POLICY "Enable insert for all users" ON mvp_planner_responses
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Policy for mvp_planner_reports: Can be read with valid access token
CREATE POLICY "Enable read with access token" ON mvp_planner_reports
    FOR SELECT TO anon, authenticated
    USING (access_token IS NOT NULL);

-- Policy for service role: Full access
CREATE POLICY "Service role has full access to mvp_planner_responses" ON mvp_planner_responses
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role has full access to mvp_planner_reports" ON mvp_planner_reports
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions
GRANT INSERT ON mvp_planner_responses TO anon, authenticated;
GRANT SELECT ON mvp_planner_reports TO anon, authenticated;
GRANT ALL ON mvp_planner_responses TO service_role;
GRANT ALL ON mvp_planner_reports TO service_role;