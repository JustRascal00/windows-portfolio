'use client'

import React, { useState, useEffect, useCallback } from 'react';
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

  const removeGoogleTranslateElements = useCallback(() => {
    const elements = document.querySelectorAll('.skiptranslate, #google_translate_element');
    elements.forEach(el => el.remove());
    document.body.style.top = '0px';
    document.body.classList.remove('translated-ltr');
    document.documentElement.classList.remove('translated-ltr');
    const googleFrame = document.getElementById(':1.container');
    if (googleFrame) googleFrame.remove();
  }, []);

  const initializeGoogleTranslate = useCallback(() => {
    removeGoogleTranslateElements();

    const googleDiv = document.createElement('div');
    googleDiv.id = 'google_translate_element';
    googleDiv.style.display = 'none';
    document.body.appendChild(googleDiv);

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
  }, [currentLang.code, removeGoogleTranslateElements]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = initializeGoogleTranslate;

    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame.skiptranslate,
      .goog-te-gadget-icon,
      .goog-te-gadget-simple img,
      .goog-te-menu-value span,
      .goog-te-gadget span,
      .goog-te-banner-frame,
      .VIpgJd-ZVi9od-l4eHX-hSRGPd,
      .VIpgJd-ZVi9od-ORHb-OEVmcd,
      #goog-gt-tt,
      .goog-te-balloon-frame,
      div#goog-gt-,
      .goog-te-spinner-pos {
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
    `;
    document.head.appendChild(style);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      if (style.parentNode) style.parentNode.removeChild(style);
      removeGoogleTranslateElements();
    };
  }, [initializeGoogleTranslate, removeGoogleTranslateElements]);

  const resetToEnglish = useCallback(() => {
    const googleTranslateSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (googleTranslateSelect) {
      googleTranslateSelect.value = 'en';
      googleTranslateSelect.dispatchEvent(new Event('change'));
    }

    document.body.classList.remove('translated-ltr');
    document.documentElement.classList.remove('translated-ltr');
    document.body.style.removeProperty('top');
    document.documentElement.style.removeProperty('overflow-x');

    document.querySelectorAll('[lang]').forEach(el => {
      el.removeAttribute('lang');
    });

    removeGoogleTranslateElements();
    window.dispatchEvent(new Event('languagechange'));
  }, [removeGoogleTranslateElements]);

  const changeLanguage = useCallback((lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('selectedLang', JSON.stringify(lang));

    if (lang.code === 'en') {
      resetToEnglish();
    } else {
      initializeGoogleTranslate();
      setTimeout(() => {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
          select.value = lang.code;
          select.dispatchEvent(new Event('change'));
        }
      }, 300);
    }
  }, [initializeGoogleTranslate, resetToEnglish]);

  return (
    <div className={styles.languageSelector}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={`${styles.languageButton} language-button`}>
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