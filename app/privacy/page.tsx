"use client";

import { useEffect } from "react";
import StaticHeader from "@/components/StaticHeader";
import "./privacy.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <StaticHeader />
      <div className="privacy-page">
        <div className="privacy-header fade-in">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">Last updated: January 2026</p>
        </div>

      <div className="privacy-content">
        <section className="privacy-section fade-in">
          <h2>1. Introduction</h2>
          <p>
            Welcome to AVA. We respect your privacy and are committed to protecting your personal
            data. This privacy policy will inform you about how we look after your personal data
            when you visit our website and tell you about your privacy rights.
          </p>
        </section>

        <section className="privacy-section fade-in">
          <h2>2. Information We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
          <ul>
            <li>
              <strong>Identity Data:</strong> includes first name, last name, username or similar
              identifier.
            </li>
            <li>
              <strong>Contact Data:</strong> includes email address and telephone numbers.
            </li>
            <li>
              <strong>Technical Data:</strong> includes internet protocol (IP) address, browser type
              and version, time zone setting and location, browser plug-in types and versions,
              operating system and platform.
            </li>
            <li>
              <strong>Usage Data:</strong> includes information about how you use our website and
              services.
            </li>
          </ul>
        </section>

        <section className="privacy-section fade-in">
          <h2>3. How We Use Your Information</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our services</li>
            <li>To monitor the usage of our services</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section className="privacy-section fade-in">
          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from
            being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            We limit access to your personal data to those employees, agents, contractors and other
            third parties who have a business need to know.
          </p>
        </section>

        <section className="privacy-section fade-in">
          <h2>5. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes
            we collected it for, including for the purposes of satisfying any legal, accounting, or
            reporting requirements.
          </p>
        </section>

        <section className="privacy-section fade-in">
          <h2>6. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section className="privacy-section fade-in">
          <h2>7. Cookies</h2>
          <p>
            Our website uses cookies to distinguish you from other users of our website. This helps
            us to provide you with a good experience when you browse our website and also allows us
            to improve our site.
          </p>
        </section>

        <section className="privacy-section fade-in">
          <h2>8. Third-Party Links</h2>
          <p>
            This website may include links to third-party websites, plug-ins and applications.
            Clicking on those links or enabling those connections may allow third parties to collect
            or share data about you. We do not control these third-party websites and are not
            responsible for their privacy statements.
          </p>
        </section>

        <section className="privacy-section fade-in">
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please
            contact us:
          </p>
          <p className="contact-info">
            Email: <a href="mailto:info@avaholding.com">info@avaholding.com</a>
            <br />
            Phone: <a href="tel:+37477423333">+374 (77) 423333</a>
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
