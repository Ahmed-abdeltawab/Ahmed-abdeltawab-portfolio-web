"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import { Send, Check, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Validate form
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Send request to API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Handle error
        throw new Error(data.error || "Failed to send message");
      }

      // Success
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSuccess(false);
        onSuccess?.();
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      // Show error in UI
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.";
      alert(errorMessage); // You can replace this with a toast notification
      console.error("Contact form error:", error);
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-strong relative rounded-[2em] border border-white/10 p-[2em] sm:p-[3em]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Success overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center rounded-[2em] bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="mb-[1em] inline-flex h-[4em] w-[4em] items-center justify-center rounded-full bg-green-500/20"
              >
                <Check className="h-[2em] w-[2em] text-green-400" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-[0.5em] text-[1.5em] font-bold text-green-400"
              >
                Message Sent!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-foreground/70"
              >
                Thanks for reaching out. I'll get back to you soon!
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-[1.5em]">
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="mb-[0.5em] block text-[0.9em] font-medium text-foreground/80"
          >
            Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <motion.input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={`glass-card w-full rounded-[0.75em] border px-[1.25em] py-[0.75em] text-[1em] transition-all focus:outline-none ${
                errors.name
                  ? "border-red-400/50 focus:border-red-400"
                  : focusedField === "name"
                  ? "border-primary/50 focus:border-primary"
                  : "border-white/10 focus:border-primary/50"
              }`}
              placeholder="Your full name"
            />
            {focusedField === "name" && !errors.name && (
              <motion.div
                className="absolute -inset-[0.125em] rounded-[0.75em] bg-primary/20 blur-sm -z-10"
                layoutId="inputFocus"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-[0.5em] flex items-center gap-[0.5em] text-[0.85em] text-red-400"
              >
                <AlertCircle className="h-[1em] w-[1em]" />
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="mb-[0.5em] block text-[0.9em] font-medium text-foreground/80"
          >
            Email <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={`glass-card w-full rounded-[0.75em] border px-[1.25em] py-[0.75em] text-[1em] transition-all focus:outline-none ${
                errors.email
                  ? "border-red-400/50 focus:border-red-400"
                  : focusedField === "email"
                  ? "border-primary/50 focus:border-primary"
                  : "border-white/10 focus:border-primary/50"
              }`}
              placeholder="your.email@example.com"
            />
            {focusedField === "email" && !errors.email && (
              <motion.div
                className="absolute -inset-[0.125em] rounded-[0.75em] bg-primary/20 blur-sm -z-10"
                layoutId="inputFocus"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-[0.5em] flex items-center gap-[0.5em] text-[0.85em] text-red-400"
              >
                <AlertCircle className="h-[1em] w-[1em]" />
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Subject Input */}
        <div>
          <label
            htmlFor="subject"
            className="mb-[0.5em] block text-[0.9em] font-medium text-foreground/80"
          >
            Subject <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <motion.input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField("subject")}
              onBlur={() => setFocusedField(null)}
              className={`glass-card w-full rounded-[0.75em] border px-[1.25em] py-[0.75em] text-[1em] transition-all focus:outline-none ${
                errors.subject
                  ? "border-red-400/50 focus:border-red-400"
                  : focusedField === "subject"
                  ? "border-primary/50 focus:border-primary"
                  : "border-white/10 focus:border-primary/50"
              }`}
              placeholder="What's this about?"
            />
            {focusedField === "subject" && !errors.subject && (
              <motion.div
                className="absolute -inset-[0.125em] rounded-[0.75em] bg-primary/20 blur-sm -z-10"
                layoutId="inputFocus"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
          <AnimatePresence>
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-[0.5em] flex items-center gap-[0.5em] text-[0.85em] text-red-400"
              >
                <AlertCircle className="h-[1em] w-[1em]" />
                {errors.subject}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Message Textarea */}
        <div>
          <label
            htmlFor="message"
            className="mb-[0.5em] block text-[0.9em] font-medium text-foreground/80"
          >
            Message <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <motion.textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              rows={6}
              className={`glass-card w-full resize-none rounded-[0.75em] border px-[1.25em] py-[0.75em] text-[1em] transition-all focus:outline-none ${
                errors.message
                  ? "border-red-400/50 focus:border-red-400"
                  : focusedField === "message"
                  ? "border-primary/50 focus:border-primary"
                  : "border-white/10 focus:border-primary/50"
              }`}
              placeholder="Tell me about your project..."
            />
            {focusedField === "message" && !errors.message && (
              <motion.div
                className="absolute -inset-[0.125em] rounded-[0.75em] bg-primary/20 blur-sm -z-10"
                layoutId="inputFocus"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-[0.5em] flex items-center gap-[0.5em] text-[0.85em] text-red-400"
              >
                <AlertCircle className="h-[1em] w-[1em]" />
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="glass-button relative w-full overflow-hidden rounded-[0.75em] bg-primary/20 px-[2em] py-[0.75em] text-[1em] font-medium transition-all hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {/* Ripple effect on hover */}
          <motion.span
            className="absolute inset-0 bg-white/10"
            initial={{ scale: 0, opacity: 0.5 }}
            whileHover={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />

          <span className="relative z-10 flex items-center justify-center gap-[0.5em]">
            {isSubmitting ? (
              <>
                <motion.div
                  className="h-[1.2em] w-[1.2em] rounded-full border-2 border-primary border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-[1.2em] w-[1.2em]" />
                Send Message
              </>
            )}
          </span>
        </motion.button>
      </div>
    </motion.form>
  );
}
