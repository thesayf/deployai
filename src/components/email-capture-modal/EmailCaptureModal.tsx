import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/shared/Button';
import { EmailCaptureFormData } from '@/types/quiz';

// Validation schema
const emailCaptureSchema = z.object({
  firstName: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  projectName: z.string()
    .min(1, 'Project name is required')
    .min(2, 'Project name must be at least 2 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmailCaptureFormData) => void;
  isSubmitting?: boolean;
}

export const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailCaptureFormData>({
    resolver: zodResolver(emailCaptureSchema),
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleFormSubmit = (data: EmailCaptureFormData) => {
    onSubmit(data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none"
          >
            <div 
              className="bg-[#F5F5F5] border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full p-10 relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Modal content */}
              <p className="text-center mb-6 text-gray-700">
                Enter your details to get your MVP blueprint
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
                {/* Name field */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    id="firstName"
                    className={`
                      w-full px-3 py-3 bg-white rounded-md
                      transition-all outline-none text-sm
                      ${errors.firstName ? 'ring-2 ring-red-500' : ''}
                    `}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Project name field */}
                <div>
                  <label htmlFor="projectName" className="block text-sm font-semibold mb-1">
                    Project Name
                  </label>
                  <input
                    {...register('projectName')}
                    type="text"
                    id="projectName"
                    className={`
                      w-full px-3 py-3 bg-white rounded-md
                      transition-all outline-none text-sm
                      ${errors.projectName ? 'ring-2 ring-red-500' : ''}
                    `}
                    placeholder="e.g., TaskFlow Pro"
                    disabled={isSubmitting}
                  />
                  {errors.projectName && (
                    <p className="text-red-500 text-xs mt-1">{errors.projectName.message}</p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-1">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`
                      w-full px-3 py-3 bg-white rounded-md
                      transition-all outline-none text-sm
                      ${errors.email ? 'ring-2 ring-red-500' : ''}
                    `}
                    placeholder="you@company.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="large"
                    intent="primary"
                    className="w-full !animate-none !border-0 !shadow-none hover:!shadow-none !py-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Starting...' : 'Start'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};