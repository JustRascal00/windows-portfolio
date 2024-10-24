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

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: any;
        Element: any;
      };
    };
    googleTranslateElementInit: () => void;
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
    const removeGoogleTranslateElements = () => {
      const elements = document.querySelectorAll('.skiptranslate, #google_translate_element');
      elements.forEach(el => el.remove());
      document.body.style.top = '0px';
      document.body.classList.remove('translated-ltr');
      document.documentElement.classList.remove('translated-ltr');
    };

    removeGoogleTranslateElements();

    const googleDiv = document.createElement('div');
    googleDiv.id = 'google_translate_element';
    googleDiv.style.display = 'none';
    document.body.appendChild(googleDiv);

    const initTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,ka',
            autoDisplay: false,
          },
          'google_translate_element'
        );

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

    const originalInit = window.googleTranslateElementInit;
    window.googleTranslateElementInit = initTranslate;

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

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

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      if (style.parentNode) style.parentNode.removeChild(style);
      if (googleDiv.parentNode) googleDiv.parentNode.removeChild(googleDiv);
      window.googleTranslateElementInit = originalInit;
    };
  }, [currentLang.code]);

  const resetToEnglish = () => {
    // Reset Google Translate
    const googleTranslateSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (googleTranslateSelect) {
      googleTranslateSelect.value = 'en';
      googleTranslateSelect.dispatchEvent(new Event('change'));
    }

    // Remove Google Translate classes and reset styles
    document.body.classList.remove('translated-ltr');
    document.documentElement.classList.remove('translated-ltr');
    document.body.style.removeProperty('top');
    document.documentElement.style.removeProperty('overflow-x');

    // Reset all translated elements
    document.querySelectorAll('[lang]').forEach(el => {
      el.removeAttribute('lang');
    });

    // Manually trigger a re-render of React components
    window.dispatchEvent(new Event('languagechange'));
  };

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('selectedLang', JSON.stringify(lang));

    if (lang.code === 'en') {
      resetToEnglish();
    } else {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = lang.code;
        select.dispatchEvent(new Event('change'));
      }
    }
  };

  return (
    <div className="language-selector">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="language-button">
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