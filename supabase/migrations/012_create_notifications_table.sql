-- =====================================================================
-- Migration: Create Notifications Table
-- =====================================================================
-- Description: Creates a notifications system for admin users
-- =====================================================================

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Notification details
  type VARCHAR(50) NOT NULL CHECK (type IN (
    'waitlist_lead',
    'account_paused',
    'account_resumed',
    'assessment_completed',
    'usage_warning',
    'payment_failed',
    'trial_ending',
    'assessment_request'
  )),

  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(500),

  -- Priority level
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),

  -- Metadata
  metadata JSONB DEFAULT '{}',

  -- Read status
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_tenant_id ON notifications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_tenant_unread ON notifications(tenant_id, read, created_at DESC);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policy: Tenants can view their own notifications
CREATE POLICY "Tenants can view their notifications" ON notifications
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_email = current_setting('app.user_email', true)
    )
  );

-- Policy: Tenants can update their own notifications (mark as read)
CREATE POLICY "Tenants can update their notifications" ON notifications
  FOR UPDATE USING (
    tenant_id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_email = current_setting('app.user_email', true)
    )
  );

-- Trigger to auto-update updated_at
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT SELECT, UPDATE ON notifications TO authenticated;
GRANT ALL ON notifications TO service_role;

-- Add comments for documentation
COMMENT ON TABLE notifications IS 'Stores in-app notifications for tenant admins';
COMMENT ON COLUMN notifications.type IS 'Type of notification (waitlist_lead, account_paused, etc.)';
COMMENT ON COLUMN notifications.priority IS 'Priority level: high (red), medium (amber), low (blue)';
COMMENT ON COLUMN notifications.metadata IS 'Additional JSON metadata for the notification';
COMMENT ON COLUMN notifications.link IS 'Optional URL to navigate to when notification is clicked';

-- Migration complete message
DO $$
BEGIN
  RAISE NOTICE 'Notifications table created successfully';
  RAISE NOTICE 'Indexes created for performance';
  RAISE NOTICE 'RLS policies enabled';
END $$;
