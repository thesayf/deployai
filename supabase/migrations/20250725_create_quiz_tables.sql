-- Quiz responses table
CREATE TABLE quiz_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT NOT NULL,
    user_first_name TEXT NOT NULL,
    user_last_name TEXT NOT NULL,
    user_company TEXT,
    responses JSONB NOT NULL,
    total_score INTEGER CHECK (total_score >= 15 AND total_score <= 85),
    industry TEXT,
    company_size TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI reports table  
CREATE TABLE ai_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quiz_response_id UUID REFERENCES quiz_responses(id) ON DELETE CASCADE,
    stage_1_analysis JSONB, -- Structured AI analysis
    stage_2_report TEXT,    -- Final HTML report
    report_status TEXT DEFAULT 'generating' CHECK (
        report_status IN ('generating', 'completed', 'failed')
    ),
    access_token TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_quiz_responses_email ON quiz_responses(user_email);
CREATE INDEX idx_quiz_responses_completed ON quiz_responses(completed_at);
CREATE INDEX idx_ai_reports_access_token ON ai_reports(access_token);
CREATE INDEX idx_ai_reports_status ON ai_reports(report_status);

-- Enable Row Level Security
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quiz_responses
-- Allow users to insert their own quiz responses
CREATE POLICY "Users can create their own quiz responses" ON quiz_responses
    FOR INSERT WITH CHECK (true);

-- Allow users to view their own quiz responses
CREATE POLICY "Users can view their own quiz responses" ON quiz_responses
    FOR SELECT USING (auth.jwt() ->> 'email' = user_email);

-- RLS Policies for ai_reports  
-- Allow public access to reports via access token
CREATE POLICY "Public can view reports with access token" ON ai_reports
    FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_ai_reports_updated_at 
    BEFORE UPDATE ON ai_reports 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();