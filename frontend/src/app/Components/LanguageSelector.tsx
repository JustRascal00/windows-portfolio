"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import styles from './LanguageSelector.module.css'

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'ka', name: 'Georgian' }
];

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('selectedLang');
      return storedLang ? JSON.parse(storedLang) : languages[0];
    }
    return languages[0];
  });

  useEffect(() => {
    // Remove any existing Google Translate elements
    const existingElements = document.querySelectorAll('.skiptranslate, #google_translate_element');
    existingElements.forEach(el => el.remove());

    // Create a new element for Google Translate
    const googleTranslateElement = document.createElement('div');
    googleTranslateElement.id = 'google_translate_element';
    googleTranslateElement.style.display = 'none';
    document.body.appendChild(googleTranslateElement);

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'en',
        autoDisplay: false,
        includedLanguages: 'en,ka', // Only include English and Georgian
      }, 'google_translate_element');

      // Automatically trigger the translation if the stored language is not 'en'
      if (currentLang.code !== 'en') {
        triggerLanguageChange(currentLang.code);
      }
    };

    // Add a style tag to hide Google Translate widget
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame, .goog-te-balloon-frame { display: none !important; }
      body { top: 0 !important; }
      .goog-te-gadget { font-size: 0 !important; }
      .goog-te-gadget > span { display: none !important; }
      .goog-te-menu-value { text-decoration: none !important; }
      .goog-te-menu-value span { color: #333; }
      .goog-te-menu-frame { box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.1); }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
      document.body.removeChild(googleTranslateElement);
      delete (window as any).googleTranslateElementInit;
    };
  }, [currentLang]);

  const triggerLanguageChange = (langCode: string) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('selectedLang', JSON.stringify(lang));
    triggerLanguageChange(lang.code);
  };

  return (
    <div className={styles.languageSelector}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={styles.languageButton}>
            {currentLang.code.toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {languages.map((lang) => (
            <DropdownMenuItem key={lang.code} onSelect={() => changeLanguage(lang)}>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}