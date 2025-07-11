import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const ShiftingContactForm = () => {
  const [selected, setSelected] = useState("individual");
  return (
    <section className="bg-zinc-100 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-6xl font-black text-zinc-900">
            Let's Build Something <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Amazing</span>
          </h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl border-4 border-zinc-900 shadow-[12px_12px_0px_#18181b] lg:flex-row lg:min-h-[600px]"
        >
          <div className="flex w-full lg:w-1/2">
            <Form selected={selected} setSelected={setSelected} />
          </div>
          <div className="hidden lg:block lg:w-1/2 lg:min-h-[600px]">
            <Images selected={selected} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Form = ({ selected, setSelected }: { selected: string; setSelected: (value: string) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: selected,
          email: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", company: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await response.json();
        console.error('Form submission error:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-full p-8 lg:p-12 bg-white"
    >
      <h3 className="mb-8 text-5xl font-black text-zinc-900">Contact us</h3>

      {/* Name input */}
      <div className="mb-6">
        <p className="mb-3 text-2xl font-bold text-zinc-900">Hi 👋! My name is...</p>
        <input
          type="text"
          placeholder="Your name..."
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full rounded-xl border-4 border-zinc-900 bg-white p-4 text-lg font-medium text-zinc-900 placeholder-zinc-500 shadow-[5px_5px_0px_#18181b] transition-all focus:translate-y-[-2px] focus:shadow-[7px_7px_0px_#18181b] focus:outline-0"
        />
      </div>

      {/* Email input */}
      <div className="mb-6">
        <p className="mb-3 text-2xl font-bold text-zinc-900">and my email is...</p>
        <input
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full rounded-xl border-4 border-zinc-900 bg-white p-4 text-lg font-medium text-zinc-900 placeholder-zinc-500 shadow-[5px_5px_0px_#18181b] transition-all focus:translate-y-[-2px] focus:shadow-[7px_7px_0px_#18181b] focus:outline-0"
        />
      </div>

      {/* Company/individual toggle */}
      <div className="mb-6">
        <p className="mb-3 text-2xl font-bold text-zinc-900">and I represent...</p>
        <FormSelect selected={selected} setSelected={setSelected} />
      </div>

      {/* Company name */}
      <AnimatePresence>
        {selected === "company" && (
          <motion.div
            initial={{
              marginTop: -104,
              opacity: 0,
            }}
            animate={{
              marginTop: 0,
              opacity: 1,
            }}
            exit={{
              marginTop: -104,
              opacity: 0,
            }}
            transition={BASE_TRANSITION}
            className="mb-6"
          >
            <p className="mb-3 text-2xl font-bold text-zinc-900">by the name of...</p>
            <input
              type="text"
              placeholder="Your company name..."
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-xl border-4 border-zinc-900 bg-white p-4 text-lg font-medium text-zinc-900 placeholder-zinc-500 shadow-[5px_5px_0px_#18181b] transition-all focus:translate-y-[-2px] focus:shadow-[7px_7px_0px_#18181b] focus:outline-0"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info */}
      <div className="mb-6">
        <p className="mb-3 text-2xl font-bold text-zinc-900">I'd love to ask about...</p>
        <textarea
          placeholder="Whatever your heart desires :)"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          className="min-h-[150px] w-full resize-none rounded-xl border-4 border-zinc-900 bg-white p-4 text-lg font-medium text-zinc-900 placeholder-zinc-500 shadow-[5px_5px_0px_#18181b] transition-all focus:translate-y-[-2px] focus:shadow-[7px_7px_0px_#18181b] focus:outline-0"
        />
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.99,
        }}
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl border-4 border-zinc-900 bg-white py-4 text-center text-xl font-black text-zinc-900 shadow-[6px_6px_0px_#18181b] transition-all hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#18181b] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>

      {/* Status messages */}
      {submitStatus === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-green-600 font-semibold"
        >
          Message sent successfully! We'll get back to you soon.
        </motion.p>
      )}
      {submitStatus === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-red-600 font-semibold"
        >
          Something went wrong. Please try again.
        </motion.p>
      )}
    </form>
  );
};

const FormSelect = ({ selected, setSelected }: { selected: string; setSelected: (value: string) => void }) => {
  return (
    <div className="w-fit overflow-hidden rounded-xl border-4 border-zinc-900 bg-white font-medium shadow-[5px_5px_0px_#18181b]">
      <button
        type="button"
        className={`${
          selected === "individual" ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
        } relative px-4 py-2 text-base font-semibold transition-colors duration-[750ms]`}
        onClick={() => setSelected("individual")}
      >
        <span className="relative z-10">An individual</span>
      </button>
      <button
        type="button"
        className={`${
          selected === "company" ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
        } relative px-4 py-2 text-base font-semibold transition-colors duration-[750ms]`}
        onClick={() => setSelected("company")}
      >
        <span className="relative z-10">A company</span>
      </button>
    </div>
  );
};

const Images = ({ selected }: { selected: string }) => {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h3 className="text-3xl font-bold mb-4">
            {selected === "individual" ? "Perfect for Freelancers" : "Built for Teams"}
          </h3>
          <p className="text-lg opacity-90">
            {selected === "individual" 
              ? "Get personal support for your projects" 
              : "Scale your business with enterprise solutions"}
          </p>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    </div>
  );
};

export default ShiftingContactForm;

const BASE_TRANSITION = { ease: "anticipate", duration: 0.75 };