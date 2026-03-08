import { Language, languageLabels } from '@/lib/translations';

interface LanguageToggleProps {
  current: Language;
  onChange: (lang: Language) => void;
}

const LanguageToggle = ({ current, onChange }: LanguageToggleProps) => {
  const languages: Language[] = ['en', 'nl', 'ro'];

  return (
    <div className="flex items-center gap-1 text-sm font-body">
      {languages.map((lang, i) => (
        <span key={lang} className="flex items-center gap-1">
          <button
            onClick={() => onChange(lang)}
            className={`px-2 py-1 rounded-sm transition-colors ${
              current === lang
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {languageLabels[lang]}
          </button>
          {i < languages.length - 1 && (
            <span className="text-border">·</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default LanguageToggle;
