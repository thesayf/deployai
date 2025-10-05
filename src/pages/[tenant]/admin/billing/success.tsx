import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BillingSuccess() {
  const router = useRouter();
  const { tenant } = router.query;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(`/${tenant}/admin`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, tenant]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8 md:p-12 text-center">
          {/* Success icon */}
          <div className="mb-6">
            <div className="inline-block p-6 bg-[#F0FFF5] border-[3px] border-black">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
            Trial Activated!
          </h1>

          <p className="text-xl font-bold text-gray-700 mb-8">
            Your 14-day free trial has started
          </p>

          {/* Trial details */}
          <div className="space-y-4 mb-8">
            <div className="border-[3px] border-black p-4 bg-[#FFF5F0]">
              <p className="font-bold text-lg">
                ✓ 5 AI assessments available
              </p>
            </div>

            <div className="border-[3px] border-black p-4 bg-[#F0F5FF]">
              <p className="font-bold text-lg">
                ✓ Full platform access for 14 days
              </p>
            </div>

            <div className="border-[3px] border-black p-4 bg-[#F0FFF5]">
              <p className="font-bold text-lg">
                ✓ Auto-converts to Starter plan ($199/mo) after trial
              </p>
            </div>
          </div>

          {/* Redirect notice */}
          <div className="p-4 border-[3px] border-black bg-yellow-50 mb-6">
            <p className="font-bold">
              Redirecting to your dashboard in {countdown} seconds...
            </p>
          </div>

          <button
            onClick={() => router.push(`/${tenant}/admin`)}
            className="py-3 px-8 bg-[#FF6B35] hover:bg-[#FF8555] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all font-black text-lg uppercase text-white"
          >
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </div>
  );
}