'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
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

  // Define buttonRef using useRef hook
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / btn.clientWidth) * 100;
      const y = ((e.clientY - rect.top) / btn.clientHeight) * 100;
      btn.style.setProperty('--x', `${x}%`);
      btn.style.setProperty('--y', `${y}%`);
    };

    if (button) {
      button.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (button) {
        button.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

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
          <Button 
            ref={buttonRef}  // Attach the ref here
            variant="outline" 
            size="sm" 
            className={`  
              ${styles.languageButton}
              group
              relative
              overflow-hidden
              transition-all
              duration-300
              hover:bg-gradient-to-r
              hover:from-white/10
              hover:to-white/5
              hover:border-white/30
              hover:shadow-lg
              hover:shadow-white/5
              active:scale-95
              font-medium
              text-white/90
              flex
              items-center
              gap-2
            `}
          >
            <div className={styles.buttonGlow} />
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wide">
                {currentLang.code.toUpperCase()}
              </span>
              <span className={` 
                h-4 w-px bg-white/20 
                group-hover:bg-white/30
                group-hover:h-5
                transition-all duration-300
              `}/>
              <span className="text-xs text-white/70 group-hover:text-white/90">
                {currentLang.name}
              </span>
            </span>
            <ChevronDown 
              className="w-4 h-4 ml-1 opacity-70 
                group-hover:opacity-100 
                group-hover:translate-y-0.5 
                transition-all duration-300"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className={` 
            min-w-[140px] 
            backdrop-blur-md 
            bg-black/50 
            border-white/10
            ${styles.dropdownContent}
          `}
        >
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code} 
              onSelect={() => changeLanguage(lang)}
              className={`  
                flex items-center gap-2 
                cursor-pointer
                transition-all
                duration-200
                hover:bg-white/10
                hover:text-white
                group
                px-4
                py-2
              `}
            >
              <span className="font-medium tracking-wide">{lang.code.toUpperCase()}</span>
              <span className="h-3 w-px bg-white/20 group-hover:bg-white/30"/>
              <span className="text-sm text-white/70 group-hover:text-white/90">
                {lang.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
