import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

  useEffect(() => {
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
      }
    };

    // Check if Calendly is already loaded
    if (window.Calendly) {
      initCalendly();
    } else {
      // Wait for script to load
      const script = document.querySelector('script[src*="calendly.com"]');
      if (script) {
        script.addEventListener("load", initCalendly);
        return () => script.removeEventListener("load", initCalendly);
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
            Get Your Solution Built in 30 Days
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <div
            ref={calendlyRef}
            className="mx-auto flex justify-center"
            style={{ 
              minWidth: "320px",
              maxWidth: "100%"
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
            ⏱️ 30-minute discovery call • 💰 Completely free • 🎯 Custom AI strategy
          </p>
        </motion.div>
      </div>
    </section>
  );
};