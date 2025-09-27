import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the subdomain from the stored session or URL
        const storedSubdomain = localStorage.getItem('auth_redirect_subdomain');

        if (storedSubdomain) {
          // Clear the stored subdomain
          localStorage.removeItem('auth_redirect_subdomain');
          // Redirect to the admin portal for that subdomain
          router.push(`/${storedSubdomain}/admin`);
        } else {
          // Fallback: try to get subdomain from current hostname
          const hostname = window.location.hostname;
          const subdomain = hostname.split('.')[0];

          if (subdomain && subdomain !== 'localhost' && subdomain !== 'www') {
            router.push(`/${subdomain}/admin`);
          } else {
            router.push('/');
          }
        }
      } catch (err) {
        console.error('Callback error:', err);
        router.push('/');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl font-medium text-gray-600 mb-2">Authenticating...</div>
        <div className="animate-pulse bg-gray-300 h-2 w-32 mx-auto rounded"></div>
      </div>
    </div>
  );
};

export default AuthCallback;