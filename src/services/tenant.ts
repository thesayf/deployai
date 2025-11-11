import { supabase } from '@/lib/supabase';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';

export interface Tenant {
  id: string;
  subdomain: string;
  company_name: string;
  email: string;
  custom_title?: string;
  custom_logo_url?: string;
  stripe_customer_id?: string;
  subscription_tier?: 'starter' | 'professional' | 'scale';
  subscription_status: string;
  trial_end_date?: string | null;
  assessments_used: number;
  assessments_limit?: number;
  created_at: string;
  updated_at: string;
  // Branding fields for white-label customization
  logo_url?: string;
  brand_color?: string;
  tagline?: string;
  client_logos?: Array<{ url: string; alt: string }>;
}

export interface TenantMember {
  id: string;
  tenant_id: string;
  user_email: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export interface TenantContext {
  tenant: Tenant;
  member?: TenantMember;
  canUseAssessment: boolean;
  remainingAssessments?: number;
}

class TenantService {
  async getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('subdomain', subdomain)
      .single();

    if (error || !data) {
      console.error('Error fetching tenant:', error);
      return null;
    }

    return data as Tenant;
  }

  async getTenantById(tenantId: string): Promise<Tenant | null> {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .single();

    if (error || !data) {
      console.error('Error fetching tenant by ID:', error);
      return null;
    }

    return data as Tenant;
  }

  async validateTenantAccess(tenantId: string, userEmail: string): Promise<TenantMember | null> {
    const { data, error } = await supabase
      .from('tenant_members')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('user_email', userEmail)
      .single();

    if (error || !data) {
      return null;
    }

    return data as TenantMember;
  }

  async getTenantContext(subdomain: string, userEmail?: string): Promise<TenantContext | null> {
    const tenant = await this.getTenantBySubdomain(subdomain);

    if (!tenant) {
      return null;
    }

    let member: TenantMember | undefined;
    if (userEmail) {
      const memberData = await this.validateTenantAccess(tenant.id, userEmail);
      if (memberData) {
        member = memberData;
      }
    }

    const canUseAssessment = this.checkAssessmentAvailability(tenant);
    const remainingAssessments = this.getRemainingAssessments(tenant);

    return {
      tenant,
      member,
      canUseAssessment,
      remainingAssessments,
    };
  }

  async incrementAssessmentUsage(tenantId: string): Promise<boolean> {
    const tenant = await this.getTenantById(tenantId);

    if (!tenant) {
      return false;
    }

    if (!this.checkAssessmentAvailability(tenant)) {
      return false;
    }

    const { error } = await supabase
      .from('tenants')
      .update({
        assessments_used: tenant.assessments_used + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', tenantId);

    if (error) {
      console.error('Error incrementing assessment usage:', error);
      return false;
    }

    return true;
  }

  async resetMonthlyUsage(tenantId: string): Promise<boolean> {
    const { error } = await supabase
      .from('tenants')
      .update({
        assessments_used: 0,
        updated_at: new Date().toISOString()
      })
      .eq('id', tenantId);

    if (error) {
      console.error('Error resetting monthly usage:', error);
      return false;
    }

    return true;
  }

  private checkAssessmentAvailability(tenant: Tenant): boolean {
    // Check if subscription is active or trialing
    if (tenant.subscription_status !== 'active' && tenant.subscription_status !== 'trialing') {
      return false;
    }

    // CHANGED: Always allow assessments - overages will be billed automatically
    // This ensures the assessment link never breaks, even if limit is exceeded
    return true;
  }

  private getRemainingAssessments(tenant: Tenant): number | undefined {
    if (tenant.subscription_tier === 'scale') {
      return undefined;
    }

    if (tenant.assessments_limit) {
      return Math.max(0, tenant.assessments_limit - tenant.assessments_used);
    }

    return 0;
  }

  async createTenant(data: {
    subdomain: string;
    company_name: string;
    email: string;
    subscription_tier?: 'starter' | 'professional' | 'scale';
  }): Promise<Tenant | null> {
    const assessmentsLimit = this.getAssessmentLimitForTier(data.subscription_tier);

    const { data: tenant, error } = await supabase
      .from('tenants')
      .insert({
        subdomain: data.subdomain,
        company_name: data.company_name,
        email: data.email,
        subscription_tier: data.subscription_tier || 'starter',
        assessments_limit: assessmentsLimit,
      })
      .select()
      .single();

    if (error || !tenant) {
      console.error('Error creating tenant:', error);
      return null;
    }

    const { error: memberError } = await supabase
      .from('tenant_members')
      .insert({
        tenant_id: tenant.id,
        user_email: data.email,
        role: 'admin',
      });

    if (memberError) {
      console.error('Error creating tenant member:', memberError);
    }

    return tenant as Tenant;
  }

  private getAssessmentLimitForTier(tier?: string): number | null {
    // If no tier provided, default to starter
    if (!tier) {
      return SUBSCRIPTION_TIERS.starter.assessments;
    }

    // Get tier config from SUBSCRIPTION_TIERS (single source of truth)
    const tierConfig = SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS];

    // Return assessment limit, or default to starter if tier not found
    return tierConfig ? tierConfig.assessments : SUBSCRIPTION_TIERS.starter.assessments;
  }

  async updateSubscription(
    tenantId: string,
    tier: 'starter' | 'professional' | 'scale',
    stripeCustomerId?: string
  ): Promise<boolean> {
    const assessmentsLimit = this.getAssessmentLimitForTier(tier);

    const { error } = await supabase
      .from('tenants')
      .update({
        subscription_tier: tier,
        assessments_limit: assessmentsLimit,
        stripe_customer_id: stripeCustomerId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', tenantId);

    if (error) {
      console.error('Error updating subscription:', error);
      return false;
    }

    return true;
  }
}

export const tenantService = new TenantService();