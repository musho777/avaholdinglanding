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
  name: string;
  surname: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
}

export const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Surname validation
    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    } else if (formData.surname.trim().length < 2) {
      newErrors.surname = "Surname must be at least 2 characters";
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
        setFormData({ name: "", surname: "", phone: "", email: "" });
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

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: "", surname: "", phone: "", email: "" });
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
      size="sm"
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
                label="Name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange("name")}
                error={errors.name}
                fullWidth
                required
                autoComplete="given-name"
                disabled={isSubmitting}
              />

              <Input
                label="Surname"
                type="text"
                placeholder="Enter your surname"
                value={formData.surname}
                onChange={handleChange("surname")}
                error={errors.surname}
                fullWidth
                required
                autoComplete="family-name"
                disabled={isSubmitting}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange("phone")}
                error={errors.phone}
                fullWidth
                required
                autoComplete="tel"
                disabled={isSubmitting}
              />

              <Input
                label="Email"
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
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </ModalFooter>
        </form>
      )}
    </Modal>
  );
};
