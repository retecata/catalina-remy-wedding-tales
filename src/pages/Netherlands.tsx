import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Plane, Hotel, UtensilsCrossed, Clock, Shirt, Heart, Music, MoonStar } from 'lucide-react';
import RSVPForm from '@/components/RSVPForm';
import LanguageToggle from '@/components/LanguageToggle';
import CountdownTimer from '@/components/CountdownTimer';
import { Language, translations, eventDates, countdownLabels } from '@/lib/translations';
import dutchWindmills from '@/assets/dutch-windmills.png';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import LanguageToggle from '@/components/LanguageToggle';
import CountdownTimer from '@/components/CountdownTimer';
import { Language, translations, eventDates, countdownLabels } from '@/lib/translations';
import dutchWindmills from '@/assets/dutch-windmills.png';


const travelInfo = {
  en: {
    back: 'Back',
    travelTitle: 'Getting There',
    travelText: 'Brouwerskolkje is located in Overveen, in the heart of Bloemendaal\'s forested dunes. Fly into Amsterdam Schiphol Airport (AMS), then take a train to Haarlem (15 min) followed by bus 81 to Overveen, or rent a car for the 30-minute drive.',
    stayTitle: 'Where to Stay',
    stayText: 'We recommend staying in Haarlem or Bloemendaal. Hotels in Haarlem city centre are a short bus or taxi ride away. More specific suggestions will follow.',
     scheduleTitle: 'Programme',
    dressCodeTitle: 'Dress Code',
    dressCodeText: 'Formal attire. Think elegant suits, cocktail dresses, or evening wear.',
    diningTitle: 'Food & Drinks',
    diningText: 'Dinner and drinks will be provided at the venue. Please let us know of any dietary requirements when you RSVP.',
  },
  nl: {
    back: 'Terug',
    travelTitle: 'Bereikbaarheid',
    travelText: 'Het Brouwerskolkje ligt in Overveen, in het groene hart van de gemeente Bloemendaal. Vlieg naar Schiphol (AMS), neem de trein naar Haarlem (15 min) en vervolgens bus 81 naar Overveen, of huur een auto (30 min rijden).',
    stayTitle: 'Overnachten',
    stayText: 'We raden aan om te overnachten in Haarlem of Bloemendaal. Hotels in het centrum van Haarlem liggen op korte bus- of taxiafstand. Meer suggesties volgen.',
     scheduleTitle: 'Programma',
    dressCodeTitle: 'Dresscode',
    dressCodeText: 'Formele kleding. Denk aan elegante pakken, cocktailjurken of avondkleding.',
    diningTitle: 'Eten & Drinken',
    diningText: 'Diner en drankjes worden verzorgd op de locatie. Laat ons weten of je dieetwensen hebt bij je RSVP.',
  },
  ro: {
    back: 'Înapoi',
    travelTitle: 'Cum ajungi',
    travelText: 'Brouwerskolkje se află în Overveen, în inima dunelor împădurite din Bloemendaal. Zburați la Amsterdam Schiphol (AMS), apoi luați trenul spre Haarlem (15 min) și autobuzul 81 spre Overveen, sau închiriați o mașină (30 min).',
    stayTitle: 'Cazare',
    stayText: 'Vă recomandăm cazare în Haarlem sau Bloemendaal. Hotelurile din centrul Haarlem sunt la distanță scurtă cu autobuzul sau taxiul. Mai multe sugestii vor urma.',
     scheduleTitle: 'Program',
    dressCodeTitle: 'Cod Vestimentar',
    dressCodeText: 'Ținută formală. Costume elegante, rochii de cocktail sau ținute de seară.',
    diningTitle: 'Mâncare & Băuturi',
    diningText: 'Cina și băuturile vor fi asigurate la locație. Vă rugăm să ne anunțați dacă aveți cerințe alimentare speciale la RSVP.',
  },
};

const Netherlands = () => {
  const [lang, setLang] = useState<Language>('nl');
  const navigate = useNavigate();
  const t = translations.netherlands[lang];
  const info = travelInfo[lang];

  const scheduleItems: Record<Language, { time: string; label: string; icon: typeof Heart }[]> = {
    en: [
      { time: '16:00', label: 'Ceremony', icon: Heart },
      { time: '17:00', label: 'Dinner', icon: UtensilsCrossed },
      { time: '20:00', label: 'Dancing', icon: Music },
      { time: '23:00', label: 'The End', icon: MoonStar },
    ],
    nl: [
      { time: '16:00', label: 'Ceremonie', icon: Heart },
      { time: '17:00', label: 'Diner', icon: UtensilsCrossed },
      { time: '20:00', label: 'Dansen', icon: Music },
      { time: '23:00', label: 'Einde', icon: MoonStar },
    ],
    ro: [
      { time: '16:00', label: 'Ceremonie', icon: Heart },
      { time: '17:00', label: 'Cină', icon: UtensilsCrossed },
      { time: '20:00', label: 'Dans', icon: Music },
      { time: '23:00', label: 'Sfârșit', icon: MoonStar },
    ],
  };

  const sections = [
    { icon: Plane, title: info.travelTitle, text: info.travelText },
    { icon: Hotel, title: info.stayTitle, text: info.stayText },
    { icon: Shirt, title: info.dressCodeTitle, text: info.dressCodeText },
    { icon: UtensilsCrossed, title: info.diningTitle, text: info.diningText },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <motion.img
        src={dutchWindmills}
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              RSVP
            </button>
            <LanguageToggle current={lang} onChange={setLang} />
          </div>
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

          <CountdownTimer targetDate={eventDates.netherlands} labels={countdownLabels[lang]} />
        </motion.div>

        <div className="section-divider my-16" />

        {/* Programme Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-xl font-medium text-foreground">{info.scheduleTitle}</h2>
          </div>

          <div className="grid grid-cols-4 gap-0">
            {scheduleItems[lang].map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connecting line */}
                {i < scheduleItems[lang].length - 1 && (
                  <div className="absolute top-4 left-[calc(50%+12px)] right-0 h-px bg-accent w-full" />
                )}
                {/* Icon */}
                <div className="relative z-10 w-10 h-10 rounded-full bg-background flex items-center justify-center mb-3">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                {/* Time */}
                <span className="font-display text-lg font-medium text-foreground tabular-nums mb-1">{item.time}</span>
                {/* Label */}
                <span className="text-sm text-muted-foreground font-light">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

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

        <div className="section-divider my-16" />

        <div id="rsvp-section">
          <RSVPForm event="netherlands" lang={lang} />
        </div>
      </main>

      <footer className="py-12 text-center border-t border-border">
        <p className="font-display text-lg text-foreground italic">C & R</p>
      </footer>
    </div>
  );
};

export default Netherlands;
