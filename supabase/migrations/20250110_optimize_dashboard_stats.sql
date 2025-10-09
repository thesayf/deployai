-- Create optimized function for dashboard stats
-- This replaces 5 separate queries with a single aggregated query

CREATE OR REPLACE FUNCTION get_assessment_stats(
  p_tenant_id UUID,
  p_this_month_start TIMESTAMPTZ,
  p_last_month_start TIMESTAMPTZ,
  p_last_month_end TIMESTAMPTZ
)
RETURNS TABLE (
  total BIGINT,
  completed BIGINT,
  processing BIGINT,
  failed BIGINT,
  this_month BIGINT,
  last_month BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT qr.id) as total,
    COUNT(DISTINCT ar.id) FILTER (WHERE ar.report_status = 'completed') as completed,
    COUNT(DISTINCT ar.id) FILTER (WHERE ar.report_status IN ('generating', 'processing', 'pending')) as processing,
    COUNT(DISTINCT ar.id) FILTER (WHERE ar.report_status = 'failed') as failed,
    COUNT(DISTINCT qr.id) FILTER (WHERE qr.created_at >= p_this_month_start) as this_month,
    COUNT(DISTINCT qr.id) FILTER (WHERE qr.created_at >= p_last_month_start AND qr.created_at <= p_last_month_end) as last_month
  FROM quiz_responses qr
  LEFT JOIN ai_reports ar ON ar.quiz_response_id = qr.id AND ar.tenant_id = p_tenant_id
  WHERE qr.tenant_id = p_tenant_id;
END;
$$;

-- Create optimized function for monthly trend
-- This replaces 6 separate queries with a single GROUP BY query

CREATE OR REPLACE FUNCTION get_monthly_trend(
  p_tenant_id UUID,
  p_months_ago INT DEFAULT 6
)
RETURNS TABLE (
  month TIMESTAMPTZ,
  count BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    DATE_TRUNC('month', created_at)::TIMESTAMPTZ as month,
    COUNT(*)::BIGINT as count
  FROM quiz_responses
  WHERE tenant_id = p_tenant_id
    AND created_at >= DATE_TRUNC('month', NOW() - (p_months_ago || ' months')::INTERVAL)
  GROUP BY DATE_TRUNC('month', created_at)
  ORDER BY month DESC;
END;
$$;
