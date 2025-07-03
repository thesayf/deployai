import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

export const CalendlyInline = () => {
  const calendlyRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize immediately when component mounts
    const initCalendly = () => {
      if (window.Calendly && calendlyRef.current && !isInitialized.current) {
        // Clear any existing content first
        calendlyRef.current.innerHTML = '';
        
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/hello-deployai/30min?hide_event_type_details=1&hide_gdpr_banner=1&embed_domain=" + window.location.hostname + "&embed_type=Inline",
          parentElement: calendlyRef.current,
          resize: true,
        });
        
        // Apply brand styling directly to Calendly widget with multiple attempts
        const applyStyles = () => {
          const widget = calendlyRef.current?.querySelector('.calendly-inline-widget') as HTMLElement;
          const iframe = calendlyRef.current?.querySelector('iframe') as HTMLElement;
          
          if (widget) {
            widget.style.setProperty('width', '100%', 'important');
            widget.style.setProperty('margin', '0', 'important');
            widget.style.setProperty('padding', '0', 'important');
            widget.style.setProperty('border', '4px solid #18181b', 'important');
            widget.style.setProperty('border-radius', '1rem', 'important');
            widget.style.setProperty('box-shadow', '0px 8px 0px #18181b', 'important');
            widget.style.setProperty('background-color', 'white', 'important');
            widget.style.setProperty('overflow', 'visible', 'important');
            widget.style.setProperty('position', 'relative', 'important');
            widget.style.setProperty('display', 'block', 'important');
          }
          
          if (iframe) {
            iframe.style.setProperty('width', '100%', 'important');
            iframe.style.setProperty('margin', '0', 'important');
            iframe.style.setProperty('padding', '0', 'important');
            iframe.style.setProperty('border', 'none', 'important');
            iframe.style.setProperty('border-radius', '1rem', 'important');
          }
        };
        
        // Apply styles multiple times to ensure they stick
        setTimeout(applyStyles, 500);
        setTimeout(applyStyles, 1000);
        setTimeout(applyStyles, 2000);
        
        isInitialized.current = true;
        setIsLoading(false);
      }
    };

    // Initialize immediately - don't wait for scroll into view
    if (window.Calendly) {
      initCalendly();
    } else {
      // Wait for script to load, then initialize immediately
      const script = document.querySelector('script[src*="calendly.com"]');
      if (script) {
        script.addEventListener("load", initCalendly);
        return () => script.removeEventListener("load", initCalendly);
      } else {
        // Fallback: check every 100ms for up to 5 seconds
        const checkInterval = setInterval(() => {
          if (window.Calendly) {
            clearInterval(checkInterval);
            initCalendly();
          }
        }, 100);
        
        setTimeout(() => clearInterval(checkInterval), 5000);
      }
    }

    // Cleanup function
    return () => {
      if (calendlyRef.current) {
        calendlyRef.current.innerHTML = '';
      }
      isInitialized.current = false;
    };
  }, []);

  return (
    <section id="book-call" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-12 text-4xl font-black text-zinc-900 md:text-5xl">
            Get Your Solution <br/> Built in 30 Days
          </h2>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          {isLoading && (
            <div className="flex h-96 items-center justify-center rounded-xl border-4 border-zinc-900 bg-white shadow-[0px_8px_0px_#18181b]">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
                <p className="text-zinc-600">Loading calendar...</p>
              </div>
            </div>
          )}
          <div
            ref={calendlyRef}
            className="mx-auto flex justify-center"
            style={{
              minWidth: "320px",
              maxWidth: "100%",
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-zinc-500">
            ⏱️ 30-minute discovery call • 💰 Completely free • 🎯 Custom AI
            strategy
          </p>
        </motion.div>
      </div>
    </section>
  );
};