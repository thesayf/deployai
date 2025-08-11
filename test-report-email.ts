import { supabaseAdmin } from './src/lib/supabase';
import { sendReportReadyEmail } from './src/lib/email/email-service';

async function testReportEmail() {
  const reportId = '473017e7-a0a8-4153-839a-d6a1e158d017';
  
  console.log('=== TESTING REPORT EMAIL ===');
  console.log('Report ID:', reportId);
  console.log('');
  
  try {
    const supabase = supabaseAdmin();
    
    // EXACT SAME QUERY FROM step4-generate.ts lines 154-166
    console.log('[TEST] Fetching report with user data using inner join...');
    const { data: reportWithUser, error: fetchError } = await supabase
      .from('ai_reports')
      .select(`
        access_token,
        quiz_responses!inner(
          user_email,
          user_first_name,
          user_last_name,
          user_company
        )
      `)
      .eq('id', reportId)
      .single();
    
    if (fetchError) {
      console.error('[TEST] ❌ ERROR fetching data:', fetchError);
      console.error('[TEST] Error details:', JSON.stringify(fetchError, null, 2));
      return;
    }
    
    if (!reportWithUser) {
      console.error('[TEST] ❌ No data returned from query');
      return;
    }
    
    console.log('[TEST] ✅ Query successful!');
    console.log('[TEST] Raw data structure:', JSON.stringify(reportWithUser, null, 2));
    
    // EXACT SAME DATA EXTRACTION FROM step4-generate.ts lines 172-176
    const userData = Array.isArray(reportWithUser.quiz_responses) 
      ? reportWithUser.quiz_responses[0] 
      : reportWithUser.quiz_responses;
    
    console.log('[TEST] Extracted user data:', JSON.stringify(userData, null, 2));
    
    const userEmail = userData?.user_email;
    
    if (!userEmail) {
      console.error('[TEST] ❌ No email address found in userData');
      return;
    }
    
    console.log('[TEST] Email address found:', userEmail);
    console.log('[TEST] Access token:', reportWithUser.access_token);
    console.log('');
    
    // EXACT SAME EMAIL SENDING FROM step4-generate.ts lines 184-192
    console.log('[TEST] Sending report email...');
    
    const emailResult = await sendReportReadyEmail({
      reportId,
      userEmail,
      firstName: userData.user_first_name || 'there',
      lastName: userData.user_last_name || '',
      company: userData.user_company,
      accessToken: reportWithUser.access_token,
      // Note: not passing req since we're running this standalone
    });
    
    if (!emailResult.success) {
      console.error('[TEST] ❌ Email failed:', emailResult.error);
    } else {
      console.log('[TEST] ✅ EMAIL SENT SUCCESSFULLY!');
      console.log('[TEST] Email ID:', emailResult.emailId);
    }
    
  } catch (error) {
    console.error('[TEST] ❌ CRITICAL ERROR:', error);
    if (error instanceof Error) {
      console.error('[TEST] Error type:', error.name);
      console.error('[TEST] Error message:', error.message);
      console.error('[TEST] Error stack:', error.stack);
    }
  }
}

// Run the test
testReportEmail().catch(console.error);