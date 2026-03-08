import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Plane, Hotel, UtensilsCrossed, Clock } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import CountdownTimer from '@/components/CountdownTimer';
import { Language, translations, eventDates, countdownLabels } from '@/lib/translations';
import romanianLandscape from '@/assets/romanian-landscape.png';

const travelInfo = {
  en: {
    back: 'Back',
    travelTitle: 'Getting There',
    travelText: 'Sun Garden Golf & Spa Resort is located near Cluj-Napoca. Fly into Cluj-Napoca International Airport (CLJ) — the resort is just a 15-minute drive away. Alternatively, fly to Bucharest (OTP) and take a domestic flight or train to Cluj.',
    stayTitle: 'Where to Stay',
    stayText: 'The resort itself offers beautiful accommodation with spa, golf, and restaurant facilities. We highly recommend staying on-site to enjoy the full experience. We\'ll share booking details and group rates soon.',
    scheduleTitle: 'Schedule',
    scheduleText: 'A detailed schedule for the celebration will be shared closer to the date.',
    diningTitle: 'Food & Drinks',
    diningText: 'A traditional Romanian feast will be served at the resort. Please let us know of any dietary requirements when you RSVP.',
  },
  nl: {
    back: 'Terug',
    travelTitle: 'Bereikbaarheid',
    travelText: 'Sun Garden Golf & Spa Resort ligt vlakbij Cluj-Napoca. Vlieg naar Cluj-Napoca International Airport (CLJ) — het resort is slechts 15 minuten rijden. Je kunt ook naar Boekarest (OTP) vliegen en een binnenlandse vlucht of trein naar Cluj nemen.',
    stayTitle: 'Overnachten',
    stayText: 'Het resort zelf biedt prachtige accommodatie met spa, golf en restaurant. We raden sterk aan om op het resort te verblijven. Boekingsdetails en groepstarieven volgen binnenkort.',
    scheduleTitle: 'Programma',
    scheduleText: 'Een gedetailleerd programma wordt dichter bij de datum gedeeld.',
    diningTitle: 'Eten & Drinken',
    diningText: 'Een traditioneel Roemeens feestmaal wordt geserveerd in het resort. Laat ons weten of je dieetwensen hebt bij je RSVP.',
  },
  ro: {
    back: 'Înapoi',
    travelTitle: 'Cum ajungi',
    travelText: 'Sun Garden Golf & Spa Resort se află lângă Cluj-Napoca. Zburați la Aeroportul Internațional Cluj-Napoca (CLJ) — resortul este la doar 15 minute cu mașina. Alternativ, zburați la București (OTP) și luați un zbor intern sau tren spre Cluj.',
    stayTitle: 'Cazare',
    stayText: 'Resortul oferă cazare superbă cu facilități de spa, golf și restaurant. Vă recomandăm cu căldură să vă cazați la resort. Detalii de rezervare și tarife de grup vor fi distribuite în curând.',
    scheduleTitle: 'Program',
    scheduleText: 'Un program detaliat va fi distribuit mai aproape de dată.',
    diningTitle: 'Mâncare & Băuturi',
    diningText: 'Va fi servit un festin tradițional românesc la resort. Vă rugăm să ne anunțați dacă aveți cerințe alimentare speciale la RSVP.',
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <motion.img
        src={romanianLandscape}
        alt=""
        className="absolute top-20 right-0 w-[300px] md:w-[420px] opacity-50 pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      />
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
          <div className="flex flex-col sm:flex-row gap-4 text-sm mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{t.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t.location}</span>
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-muted-foreground font-light text-lg leading-relaxed mb-8">
            {t.description}
          </p>

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
