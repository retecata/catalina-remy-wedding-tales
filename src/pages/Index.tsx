import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.png';
import cardBg from '@/assets/card-bg.png';
import polaroid1 from '@/assets/polaroid-1.png';
import polaroid2 from '@/assets/polaroid-2.png';
import polaroid3 from '@/assets/polaroid-3.png';
import polaroid4 from '@/assets/polaroid-4.png';
import polaroid5 from '@/assets/polaroid-5.png';
import polaroid6 from '@/assets/polaroid-6.png';
import CelebrationCard from '@/components/CelebrationCard';
import LanguageToggle from '@/components/LanguageToggle';
import { Heart } from 'lucide-react';
import { Language, pageTranslations } from '@/lib/translations';

const polaroids = [
  { src: polaroid1, alt: "Cătălina and Remy in India", rotate: -6 },
  { src: polaroid2, alt: "Cătălina and Remy in costume", rotate: 3 },
  { src: polaroid3, alt: "Cătălina and Remy at King's Day", rotate: 5 },
  { src: polaroid4, alt: "Cătălina and Remy at the stadium", rotate: -3 },
  { src: polaroid5, alt: "Cătălina and Remy dressed up", rotate: -4 },
  { src: polaroid6, alt: "Cătălina and Remy on quad bikes", rotate: 4 },
];

const PolaroidCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animationId: number;
    let scrollPos = 0;
    const speed = 0.2;

    const animate = () => {
      scrollPos += speed;
      const halfScroll = el.scrollWidth / 2;
      if (scrollPos >= halfScroll) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const items = [...polaroids, ...polaroids];

  return (
    <div className="xl:hidden mt-12 -mx-6 overflow-hidden">
      <div ref={scrollRef} className="flex gap-6 overflow-hidden px-6" style={{ scrollBehavior: 'auto' }}>
        {items.map((p, i) => (
          <div
            key={i}
            className="flex-shrink-0 bg-white p-2 pb-4 shadow-md w-40"
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            <img src={p.src} alt={p.alt} className="w-full h-44 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

const StoryParagraph = ({ text }: { text: string }) => {
  // Split on | delimiters to find quoted text
  const parts = text.split('|');
  return (
    <p>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="italic text-foreground">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
};

const Index = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = pageTranslations[lang];

  return (
    <div className="min-h-screen bg-background">
      {/* Language Toggle - fixed top left */}
      <motion.div
        className="fixed top-6 left-6 z-50 bg-background/80 backdrop-blur-sm rounded-sm border border-border px-3 py-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <LanguageToggle current={lang} onChange={setLang} />
      </motion.div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        {/* Mobile: card-bg floral at 40% opacity, Desktop: full hero-bg */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden opacity-40"
          style={{ backgroundImage: `url(${cardBg})` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        <div className="relative z-10 mt-32 md:mt-40">
          <motion.p
            className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 font-body font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t.gettingMarried}
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Cătălina{' '}
            <span className="font-light italic text-primary">&</span>{' '}
            Remy
          </motion.h1>

          <motion.div
            className="section-divider mt-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          />

          <motion.p
            className="text-muted-foreground font-body font-light text-lg mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {t.tagline}
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="w-px h-12 bg-border mx-auto animate-pulse" />
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 md:py-32 px-6 lg:px-24 bg-card/50">
        <div className="relative max-w-4xl mx-auto lg:px-16">
          {/* Polaroid frames - left side */}
          <motion.div
            className="hidden xl:block absolute -left-32 top-8"
            initial={{ opacity: 0, rotate: -8 }}
            whileInView={{ opacity: 1, rotate: -6 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-2 pb-4 shadow-md rotate-[-6deg] w-44">
              <img src={polaroid1} alt="Cătălina and Remy in India" className="w-full h-48 object-cover" />
            </div>
          </motion.div>

          <motion.div
            className="hidden xl:block absolute -left-24 top-[22rem]"
            initial={{ opacity: 0, rotate: 4 }}
            whileInView={{ opacity: 1, rotate: 3 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-2 pb-4 shadow-md rotate-[3deg] w-40">
              <img src={polaroid2} alt="Cătălina and Remy in costume" className="w-full h-44 object-cover" />
            </div>
          </motion.div>

          {/* Polaroid frames - right side */}
          <motion.div
            className="hidden xl:block absolute -right-32 top-16"
            initial={{ opacity: 0, rotate: 6 }}
            whileInView={{ opacity: 1, rotate: 5 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-2 pb-4 shadow-md rotate-[5deg] w-44">
              <img src={polaroid3} alt="Cătălina and Remy at King's Day" className="w-full h-48 object-cover" />
            </div>
          </motion.div>

          <motion.div
            className="hidden xl:block absolute -right-24 top-80"
            initial={{ opacity: 0, rotate: -4 }}
            whileInView={{ opacity: 1, rotate: -3 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-2 pb-4 shadow-md rotate-[-3deg] w-40">
              <img src={polaroid4} alt="Cătălina and Remy at the stadium" className="w-full h-44 object-cover" />
            </div>
          </motion.div>

          {/* Extra polaroid frames */}
          <motion.div
            className="hidden xl:block absolute -left-36 bottom-4"
            initial={{ opacity: 0, rotate: -6 }}
            whileInView={{ opacity: 1, rotate: -4 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-2 pb-4 shadow-md rotate-[-4deg] w-40">
              <img src={polaroid5} alt="Cătălina and Remy dressed up" className="w-full h-44 object-cover" />
            </div>
          </motion.div>

          <motion.div
            className="hidden xl:block absolute -right-36 -bottom-4"
            initial={{ opacity: 0, rotate: 6 }}
            whileInView={{ opacity: 1, rotate: 4 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-2 pb-4 shadow-md rotate-[4deg] w-42">
              <img src={polaroid6} alt="Cătălina and Remy on quad bikes" className="w-full h-48 object-cover" />
            </div>
          </motion.div>

          {/* Story content */}
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Heart className="w-5 h-5 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-6">
                {t.ourStoryTitle}
              </h2>
              <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg text-left">
                {t.story.map((paragraph, i) => (
                  <StoryParagraph key={i} text={paragraph} />
                ))}
              </div>

              <PolaroidCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Celebrations Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4">
            {t.ourCelebrationsTitle}
          </h2>
          <p className="text-muted-foreground font-light max-w-md mx-auto">
            {t.ourCelebrationsSubtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
          <CelebrationCard event="netherlands" flag="🇳🇱" lang={lang} />
          <CelebrationCard event="romania" flag="🇷🇴" lang={lang} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-border">
        <p className="font-display text-xl text-foreground italic">
          C & R
        </p>
        <p className="text-sm text-muted-foreground mt-2 font-light">
          {t.footer}
        </p>
      </footer>
    </div>
  );
};

export default Index;
