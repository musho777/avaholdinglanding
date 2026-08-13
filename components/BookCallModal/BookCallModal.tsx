"use client";

import { useState, FormEvent } from "react";
import { Modal, ModalBody, ModalFooter } from "@/components/ui/Modal/Modal";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import styles from "./BookCallModal.module.css";

export interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  agreeToEmails: boolean;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  agreeToEmails?: string;
}

export const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    agreeToEmails: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Checkbox validation
    if (!formData.agreeToEmails) {
      newErrors.agreeToEmails = "You must agree to receive emails and promotions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/save-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save call information");
      }

      setIsSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({ fullName: "", phone: "", email: "", agreeToEmails: false });
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ fullName: "", phone: "", email: "", agreeToEmails: false });
      setErrors({});
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Book a Call"
      size="md"
      closeOnOverlayClick={!isSubmitting}
    >
      {isSuccess ? (
        <ModalBody>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="32" cy="32" r="32" fill="#c9a267" />
                <path
                  d="M18 32L26 40L46 20"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Thank You!</h3>
            <p>We&apos;ll get back to you soon.</p>
          </div>
        </ModalBody>
      ) : (
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className={styles.formGrid}>
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange("fullName")}
                error={errors.fullName}
                fullWidth
                required
                autoComplete="name"
                disabled={isSubmitting}
              />

              <Input
                type="tel"
                placeholder="+374 (93) 000-000"
                value={formData.phone}
                onChange={handleChange("phone")}
                error={errors.phone}
                fullWidth
                required
                autoComplete="tel"
                disabled={isSubmitting}
              />

              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange("email")}
                error={errors.email}
                fullWidth
                required
                autoComplete="email"
                disabled={isSubmitting}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              variant="taupe"
              fullWidth
              className={styles.submitButton}
              size="lg"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.agreeToEmails}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      agreeToEmails: e.target.checked,
                    }));
                    // Clear error when user checks the box
                    if (e.target.checked && errors.agreeToEmails) {
                      setErrors((prev) => ({ ...prev, agreeToEmails: undefined }));
                    }
                  }}
                  disabled={isSubmitting}
                  className={styles.checkbox}
                />
                <span>Agree to receive emails and promotions</span>
              </label>
              {errors.agreeToEmails && (
                <p className={styles.checkboxError}>{errors.agreeToEmails}</p>
              )}
            </div>
          </ModalFooter>
        </form>
      )}
    </Modal>
  );
};
