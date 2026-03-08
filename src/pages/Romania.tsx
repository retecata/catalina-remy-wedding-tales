import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Plane, Hotel, UtensilsCrossed, Clock } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import CountdownTimer from '@/components/CountdownTimer';
import { Language, translations, eventDates, countdownLabels } from '@/lib/translations';

const travelInfo = {
  en: {
    back: 'Back',
    travelTitle: 'Getting There',
    travelText: 'Romania is accessible via Henri Coandă International Airport (OTP) in Bucharest or Cluj-Napoca International Airport (CLJ). Domestic flights and trains connect major cities.',
    stayTitle: 'Where to Stay',
    stayText: 'We recommend booking accommodation nearby. More specific hotel suggestions will be shared once the venue is confirmed.',
    scheduleTitle: 'Schedule',
    scheduleText: 'A detailed schedule for the day will be shared closer to the date.',
    diningTitle: 'Food & Drinks',
    diningText: 'A traditional Romanian feast will be served. Please let us know of any dietary requirements when you RSVP.',
  },
  nl: {
    back: 'Terug',
    travelTitle: 'Bereikbaarheid',
    travelText: 'Roemenië is bereikbaar via de internationale luchthaven Henri Coandă (OTP) in Boekarest of Cluj-Napoca (CLJ). Binnenlandse vluchten en treinen verbinden de grote steden.',
    stayTitle: 'Overnachten',
    stayText: 'We raden aan om accommodatie in de buurt te boeken. Specifieke hotelsuggesties volgen zodra de locatie bevestigd is.',
    scheduleTitle: 'Programma',
    scheduleText: 'Een gedetailleerd programma wordt dichter bij de datum gedeeld.',
    diningTitle: 'Eten & Drinken',
    diningText: 'Een traditioneel Roemeens feestmaal wordt geserveerd. Laat ons weten of je dieetwensen hebt bij je RSVP.',
  },
  ro: {
    back: 'Înapoi',
    travelTitle: 'Cum ajungi',
    travelText: 'România este accesibilă prin Aeroportul Internațional Henri Coandă (OTP) din București sau Aeroportul Internațional Cluj-Napoca (CLJ). Zboruri interne și trenuri conectează orașele principale.',
    stayTitle: 'Cazare',
    stayText: 'Vă recomandăm să rezervați cazare în apropiere. Sugestii specifice de hoteluri vor fi oferite odată ce locația este confirmată.',
    scheduleTitle: 'Program',
    scheduleText: 'Un program detaliat va fi distribuit mai aproape de dată.',
    diningTitle: 'Mâncare & Băuturi',
    diningText: 'Va fi servit un festin tradițional românesc. Vă rugăm să ne anunțați dacă aveți cerințe alimentare speciale la RSVP.',
  },
};

const Romania = () => {
  const [lang, setLang] = useState<Language>('ro');
  const navigate = useNavigate();
  const t = translations.romania[lang];
  const info = travelInfo[lang];

  const sections = [
    { icon: Plane, title: info.travelTitle, text: info.travelText },
    { icon: Hotel, title: info.stayTitle, text: info.stayText },
    { icon: Clock, title: info.scheduleTitle, text: info.scheduleText },
    { icon: UtensilsCrossed, title: info.diningTitle, text: info.diningText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {info.back}
          </button>
          <LanguageToggle current={lang} onChange={setLang} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-4xl mb-6 block">🇷🇴</span>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-muted-foreground font-light text-lg leading-relaxed mb-8">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 text-sm mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{t.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t.location}</span>
            </div>
          </div>

          <CountdownTimer targetDate={eventDates.romania} labels={countdownLabels[lang]} />
        </motion.div>

        <div className="section-divider my-16" />

        <div className="space-y-12">
          {sections.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-2">{title}</h2>
                <p className="text-muted-foreground font-light leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-12 text-center border-t border-border">
        <p className="font-display text-lg text-foreground italic">C & R</p>
      </footer>
    </div>
  );
};

export default Romania;
