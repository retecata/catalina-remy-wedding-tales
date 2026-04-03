import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, CalendarPlus } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { Language, translations, eventDates, countdownLabels } from '@/lib/translations';
import cardBg from '@/assets/card-bg.png';

interface CelebrationCardProps {
  event: 'netherlands' | 'romania';
  flag: string;
  lang: Language;
}

const googleCalendarLinks: Record<'netherlands' | 'romania', string> = {
  netherlands: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Cătălina & Remy — Netherlands Celebration')}&dates=20260905/20260906&location=${encodeURIComponent('Brouwerskolkje, Overveen, Netherlands')}&details=${encodeURIComponent('Wedding celebration of Cătălina & Remy in the Netherlands')}`,
  romania: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Cătălina & Remy — Romania Celebration')}&dates=20270911/20270912&location=${encodeURIComponent('Sun Garden Resort, Cluj-Napoca, Romania')}&details=${encodeURIComponent('Wedding celebration of Cătălina & Remy in Romania')}`,
};

const CelebrationCard = ({ event, flag, lang }: CelebrationCardProps) => {
  const navigate = useNavigate();
  const t = translations[event][lang];

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(googleCalendarLinks[event], '_blank');
  };

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

      <p className="relative z-10 text-card-description leading-relaxed mb-8 font-light flex-grow whitespace-pre-line">
        {t.description}
      </p>

      <div className="relative z-10 space-y-3 text-sm">
        <div className="flex items-center gap-3 text-card-description">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{t.date}</span>
        </div>
        <div className="flex items-center gap-3 text-card-description">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{t.location}</span>
        </div>
      </div>

      <div className="section-divider" />

      <CountdownTimer targetDate={eventDates[event]} labels={countdownLabels[lang]} />

      <div className="relative z-10 mt-8 flex gap-3">
        <button
          className="flex-1 py-3 px-6 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          RSVP
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleCalendarClick}
          className="py-3 px-4 border border-primary text-primary font-body text-sm rounded-sm hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center"
          title="Add to Google Calendar"
        >
          <CalendarPlus className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default CelebrationCard;
