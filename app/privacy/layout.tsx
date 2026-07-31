import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AVA",
  description: "Privacy policy for AVA. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
