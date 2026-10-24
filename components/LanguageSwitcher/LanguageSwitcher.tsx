"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import styles from "./LanguageSwitcher.module.css";

const locales = [
  { code: "en", label: "EN" },
  { code: "am", label: "AM" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className={styles.switcher}>
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => switchLocale(loc.code)}
          className={`${styles.langBtn} ${locale === loc.code ? styles.active : ""}`}
          aria-label={`Switch to ${loc.label}`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
