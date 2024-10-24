declare namespace google {
    namespace translate {
      class TranslateElement {
        constructor(options: TranslateElementOptions, element: string | HTMLElement);
      }
  
      interface TranslateElementOptions {
        pageLanguage: string;
        includedLanguages?: string;
        layout?: TranslateElementLayout;
        autoDisplay?: boolean;
        gaTrack?: boolean;
        gaId?: string;
        multilanguagePage?: boolean;
      }
  
      type TranslateElementLayout = 
        | 'HORIZONTAL'
        | 'VERTICAL'
        | 'SIMPLE'
        | 'InlineLayout.HORIZONTAL'
        | 'InlineLayout.VERTICAL'
        | 'InlineLayout.SIMPLE';
    }
  }
  
  interface Window {
    googleTranslateElementInit: () => void;
  }