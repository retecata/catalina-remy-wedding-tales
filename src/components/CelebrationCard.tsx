import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { Language, translations, eventDates, countdownLabels } from '@/lib/translations';
import cardBg from '@/assets/card-bg.png';

interface CelebrationCardProps {
  event: 'netherlands' | 'romania';
  flag: string;
  lang: Language;
}

const CelebrationCard = ({ event, flag, lang }: CelebrationCardProps) => {
  const navigate = useNavigate();
  const t = translations[event][lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      onClick={() => navigate(`/${event}`)}
      className="relative overflow-hidden bg-card rounded-sm border border-border p-8 md:p-12 max-w-lg w-full cursor-pointer group hover:border-primary/30 transition-colors duration-300 flex flex-col"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${cardBg})` }}
      />

      <h3 className="relative z-10 font-display text-2xl md:text-3xl font-medium text-foreground mb-6">
        {t.title}
      </h3>

      <p className="relative z-10 leading-relaxed mb-8 font-light flex-grow" style={{ color: 'hsl(var(--card-description))' }}>
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

      <div className="relative z-10 flex items-center justify-center gap-2 mt-6 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>{t.details}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
};

export default CelebrationCard;
