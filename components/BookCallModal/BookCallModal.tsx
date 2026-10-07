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
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  agreeToEmails: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  email?: string;
  agreeToEmails?: string;
}

export const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    agreeToEmails: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Middle Name validation (optional)
    if (formData.middleName.trim() && formData.middleName.trim().length < 2) {
      newErrors.middleName = "Middle name must be at least 2 characters";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Email validation (optional)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
        setFormData({
          firstName: "",
          lastName: "",
          middleName: "",
          phone: "",
          email: "",
          agreeToEmails: false,
        });
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
      setFormData({
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        email: "",
        agreeToEmails: false,
      });
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
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                error={errors.firstName}
                fullWidth
                required
                autoComplete="given-name"
                disabled={isSubmitting}
              />

              <Input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                error={errors.lastName}
                fullWidth
                required
                autoComplete="family-name"
                disabled={isSubmitting}
              />

              <Input
                type="text"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={handleChange("middleName")}
                error={errors.middleName}
                fullWidth
                autoComplete="additional-name"
                disabled={isSubmitting}
              />

              <Input
                type="tel"
                placeholder="+374 (98) 333372"
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
