'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import styles from './LanguageSelector.module.css';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'ka', name: 'Georgian' }
];

interface GoogleTranslateElement {
  new (options: {
    pageLanguage: string;
    includedLanguages?: string;
    autoDisplay?: boolean;
  }, element: string): void;
}

interface GoogleTranslateInit {
  (): void;
}

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: GoogleTranslateElement;
      };
    };
  }
}

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('selectedLang');
      return storedLang ? JSON.parse(storedLang) : languages[0];
    }
    return languages[0];
  });

  useEffect(() => {
    // Remove existing elements
    const removeElements = () => {
      const elements = document.querySelectorAll('.skiptranslate, #google_translate_element');
      elements.forEach(el => el.remove());

      // Reset body position
      document.body.style.top = '0px';
      document.body.style.position = 'static';

      // Remove the Google Translate banner
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) {
        banner.remove();
      }
    };

    removeElements();

    // Create and inject the Google Translate element
    const googleDiv = document.createElement('div');
    googleDiv.id = 'google_translate_element';
    googleDiv.style.display = 'none';
    document.body.appendChild(googleDiv);

    // Create a function to initialize Google Translate
    const initTranslate: GoogleTranslateInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,ka',
            autoDisplay: false,
          },
          'google_translate_element'
        );

        // Apply initial translation if needed
        if (currentLang.code !== 'en') {
          setTimeout(() => {
            const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
            if (select) {
              select.value = currentLang.code;
              select.dispatchEvent(new Event('change'));
            }
          }, 1000);
        }
      }
    };

    // Assign the initialization function
    const originalInit = window.googleTranslateElementInit;
    window.googleTranslateElementInit = initTranslate;

    // Load Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Add styles to hide Google Translate elements
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame.skiptranslate,
      .goog-te-gadget-icon,
      .goog-te-gadget-simple img,
      .goog-te-menu-value span,
      .goog-te-gadget span,
      .goog-te-banner-frame,
      .VIpgJd-ZVi9od-l4eHX-hSRGPd,
      .VIpgJd-ZVi9od-ORHb-OEVmcd {
        display: none !important;
      }
      
      .goog-te-gadget-simple {
        border: none !important;
        background-color: transparent !important;
      }
      
      .goog-te-gadget {
        height: 0;
        padding: 0;
        margin: 0;
      }

      body {
        top: 0 !important;
      }
      
      .VIpgJd-ZVi9od-l4eHX-hSRGPd,
      .goog-te-spinner-pos {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
      if (googleDiv.parentNode) {
        googleDiv.parentNode.removeChild(googleDiv);
      }
      // Restore original init function if it existed
      window.googleTranslateElementInit = originalInit;
    };
  }, [currentLang.code]);

  const resetToEnglish = () => {
    // Get the iframe that Google Translate uses
    const iframe = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      // Manually reset the translation
      const googleSelect = iframe.contentWindow.document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (googleSelect) {
        googleSelect.value = 'en';
        googleSelect.dispatchEvent(new Event('change'));
      }
    }

    // Remove Google Translate classes from the body
    const googleBody = document.getElementsByTagName('body')[0];
    googleBody.classList.remove('translated-ltr');
    
    // Force a reload of the page (if needed)
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('selectedLang', JSON.stringify(lang));

    if (lang.code === 'en') {
      // Reset to English
      resetToEnglish();
    } else {
      // Translate to the selected language
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = lang.code;
        select.dispatchEvent(new Event('change'));
      }
    }
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
