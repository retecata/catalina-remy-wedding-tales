import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import CountdownTimer from './CountdownTimer';
import { Language, translations, eventDates, countdownLabels } from '@/lib/translations';

interface CelebrationCardProps {
  event: 'netherlands' | 'romania';
  flag: string;
  defaultLang: Language;
}

const CelebrationCard = ({ event, flag, defaultLang }: CelebrationCardProps) => {
  const [lang, setLang] = useState<Language>(defaultLang);
  const t = translations[event][lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-card rounded-sm border border-border p-8 md:p-12 max-w-lg w-full"
    >
      <div className="flex items-center justify-between mb-8">
        <span className="text-3xl">{flag}</span>
        <LanguageToggle current={lang} onChange={setLang} />
      </div>

      <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-6">
        {t.title}
      </h3>

      <p className="text-muted-foreground leading-relaxed mb-8 font-light">
        {t.description}
      </p>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{t.date}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{t.location}</span>
        </div>
      </div>

      <div className="section-divider" />

      <CountdownTimer targetDate={eventDates[event]} labels={countdownLabels[lang]} />

      <p className="text-center text-sm text-muted-foreground italic mt-6">
        {t.details}
      </p>
    </motion.div>
  );
};

export default CelebrationCard;
