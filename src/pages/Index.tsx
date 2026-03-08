import { motion } from 'framer-motion';
import heroBotanical from '@/assets/hero-botanical.png';
import CelebrationCard from '@/components/CelebrationCard';
import { Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        <motion.img
          src={heroBotanical}
          alt="Botanical decoration"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] opacity-60 pointer-events-none select-none"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        <div className="relative z-10 mt-32 md:mt-40">
          <motion.p
            className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 font-body font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We're getting married
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Catalina{' '}
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
            Two celebrations, one love
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
      <section className="py-24 md:py-32 px-6 bg-card/50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Heart className="w-5 h-5 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg text-left">
              <p>
                It was the tail end of the pandemic, and like many, we'd both found refuge in gaming. One day, fate queued us into the same Apex Legends match. After a few rounds of surprisingly good teamwork, Catalina turned to Remy and said:{' '}
                <span className="italic text-foreground">"Can I be forever in your team?"</span>
              </p>
              <p>
                What started with headsets and ping calls grew into late-night WhatsApp messages, endless Discord calls, and the kind of connection that makes the distance between Romania and the Netherlands feel like nothing at all.
              </p>
              <p>
                Then came the leap of faith — Catalina flew to the Netherlands to meet Remy in person. A bit crazy in hindsight, perhaps, but from the very first moment they met, everything just clicked. Soon after, Remy made the trip to Romania.
              </p>
              <p>
                <span className="italic text-foreground">"I don't know if this has a future,"</span> Catalina said honestly.{' '}
                <span className="italic text-foreground">"I have a career in Dublin and I'm not willing to move right now."</span>{' '}
                Without hesitation, Remy replied:{' '}
                <span className="italic text-foreground">"No problem — I'll move."</span>
              </p>
              <p>
                From that moment, his commitment never wavered. They lived together in Dublin for a year and a half before deciding to move to the Netherlands to be closer to his family. Is the Netherlands the final stop? They don't know yet — but wherever life takes them, they'll be in each other's team.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Celebrations Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4">
            Our Celebrations
          </h2>
          <p className="text-muted-foreground font-light max-w-md mx-auto">
            We invite you to share in our joy across two beautiful countries
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
          <CelebrationCard event="netherlands" flag="🇳🇱" defaultLang="nl" />
          <CelebrationCard event="romania" flag="🇷🇴" defaultLang="ro" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-border">
        <p className="font-display text-xl text-foreground italic">
          C & R
        </p>
        <p className="text-sm text-muted-foreground mt-2 font-light">
          With love and gratitude
        </p>
      </footer>
    </div>
  );
};

export default Index;
