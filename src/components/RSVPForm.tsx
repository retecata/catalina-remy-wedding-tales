import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Language } from '@/lib/translations';
import { z } from 'zod';

const ACCESS_CODE = '2323';

const rsvpSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  attending: z.boolean(),
  is_child: z.boolean(),
  dietary_requirements: z.string().trim().max(500).optional(),
  song_request: z.string().trim().max(200).optional(),
});

type RSVPEvent = 'netherlands' | 'romania';

const formTranslations: Record<Language, {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  attending: string;
  yes: string;
  no: string;
  dietary: string;
  dietaryPlaceholder: string;
  song: string;
  songPlaceholder: string;
  isChild: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
  codeTitle: string;
  codeSubtitle: string;
  codePlaceholder: string;
  codeSubmit: string;
  codeError: string;
}> = {
  en: {
    title: 'RSVP',
    subtitle: "We'd love to know if you can make it",
    name: 'Your name',
    namePlaceholder: 'Full name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    attending: 'Will you be attending?',
    yes: 'Joyfully accepts',
    no: 'Regretfully declines',
    dietary: 'Dietary requirements',
    dietaryPlaceholder: 'Vegetarian, vegan, allergies…',
    song: 'Song request',
    songPlaceholder: 'What song gets you on the dance floor?',
    isChild: 'This is a child (under 18)',
    submit: 'Send RSVP',
    submitting: 'Sending…',
    successTitle: 'Thank you!',
    successMessage: "Your RSVP has been received. We can't wait to celebrate with you!",
    errorMessage: 'Something went wrong. Please try again.',
    codeTitle: 'Enter your invitation code',
    codeSubtitle: 'You can find this on your invitation',
    codePlaceholder: 'Code',
    codeSubmit: 'Continue',
    codeError: 'Incorrect code. Please try again.',
  },
  nl: {
    title: 'RSVP',
    subtitle: 'We horen graag of je erbij kunt zijn',
    name: 'Je naam',
    namePlaceholder: 'Volledige naam',
    email: 'E-mail',
    emailPlaceholder: 'je@email.nl',
    attending: 'Kun je erbij zijn?',
    yes: 'Accepteert met vreugde',
    no: 'Moet helaas afzeggen',
    dietary: 'Dieetwensen',
    dietaryPlaceholder: 'Vegetarisch, veganistisch, allergieën…',
    song: 'Muziekverzoek',
    songPlaceholder: 'Welk nummer krijgt jou op de dansvloer?',
    submit: 'Verstuur RSVP',
    submitting: 'Verzenden…',
    successTitle: 'Bedankt!',
    successMessage: 'Je RSVP is ontvangen. We kunnen niet wachten om met je te vieren!',
    errorMessage: 'Er ging iets mis. Probeer het opnieuw.',
    codeTitle: 'Voer je uitnodigingscode in',
    codeSubtitle: 'Deze vind je op je uitnodiging',
    codePlaceholder: 'Code',
    codeSubmit: 'Doorgaan',
    codeError: 'Onjuiste code. Probeer het opnieuw.',
  },
  ro: {
    title: 'RSVP',
    subtitle: 'Ne-ar bucura să știm dacă poți veni',
    name: 'Numele tău',
    namePlaceholder: 'Nume complet',
    email: 'Email',
    emailPlaceholder: 'email@exemplu.ro',
    attending: 'Vei participa?',
    yes: 'Accept cu bucurie',
    no: 'Din păcate, nu pot',
    dietary: 'Cerințe alimentare',
    dietaryPlaceholder: 'Vegetarian, vegan, alergii…',
    song: 'Cerere muzicală',
    songPlaceholder: 'Ce melodie te scoate pe ringul de dans?',
    submit: 'Trimite RSVP',
    submitting: 'Se trimite…',
    successTitle: 'Mulțumim!',
    successMessage: 'RSVP-ul tău a fost primit. Abia așteptăm să sărbătorim împreună!',
    errorMessage: 'Ceva nu a mers bine. Te rugăm să încerci din nou.',
    codeTitle: 'Introdu codul de invitație',
    codeSubtitle: 'Îl găsești pe invitația ta',
    codePlaceholder: 'Cod',
    codeSubmit: 'Continuă',
    codeError: 'Cod incorect. Te rugăm să încerci din nou.',
  },
};

interface RSVPFormProps {
  event: RSVPEvent;
  lang: Language;
}

const RSVPForm = ({ event, lang }: RSVPFormProps) => {
  const t = formTranslations[lang];
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    attending: true,
    dietary_requirements: '',
    song_request: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === ACCESS_CODE) {
      setUnlocked(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(false);

    const result = rsvpSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('rsvps').insert({
      name: result.data.name,
      email: result.data.email,
      attending: result.data.attending,
      dietary_requirements: result.data.dietary_requirements || null,
      song_request: result.data.song_request || null,
      event,
    });

    setSubmitting(false);
    if (error) {
      setSubmitError(true);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-medium text-foreground mb-2">{t.successTitle}</h3>
        <p className="text-muted-foreground font-light">{t.successMessage}</p>
      </motion.div>
    );
  }

  const inputClass =
    'w-full bg-background border border-input rounded-sm px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors';

  // Code gate
  if (!unlocked) {
    return (
      <motion.form
        onSubmit={handleCodeSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-medium text-foreground mb-2">{t.codeTitle}</h2>
          <p className="text-muted-foreground font-light">{t.codeSubtitle}</p>
        </div>

        <div className="max-w-xs mx-auto space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setCodeError(false); }}
            placeholder={t.codePlaceholder}
            className={`${inputClass} text-center text-lg tracking-widest`}
            maxLength={10}
            autoFocus
          />
          {codeError && (
            <p className="text-destructive text-sm text-center">{t.codeError}</p>
          )}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {t.codeSubmit}
          </button>
        </div>
      </motion.form>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-medium text-foreground mb-2">{t.title}</h2>
        <p className="text-muted-foreground font-light">{t.subtitle}</p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">{t.name}</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={t.namePlaceholder}
          className={inputClass}
          maxLength={100}
        />
        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">{t.email}</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder={t.emailPlaceholder}
          className={inputClass}
          maxLength={255}
        />
        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Attending */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">{t.attending}</label>
        <div className="flex gap-3">
          {[true, false].map((value) => (
            <button
              key={String(value)}
              type="button"
              onClick={() => setForm({ ...form, attending: value })}
              className={`flex-1 py-3 px-4 rounded-sm border text-sm font-light transition-all ${
                form.attending === value
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-input text-muted-foreground hover:border-primary/50'
              }`}
            >
              {value ? t.yes : t.no}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary - only show if attending */}
      {form.attending && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="block text-sm font-medium text-foreground mb-1.5">{t.dietary}</label>
          <input
            type="text"
            value={form.dietary_requirements}
            onChange={(e) => setForm({ ...form, dietary_requirements: e.target.value })}
            placeholder={t.dietaryPlaceholder}
            className={inputClass}
            maxLength={500}
          />
        </motion.div>
      )}

      {/* Song request - only show if attending */}
      {form.attending && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="block text-sm font-medium text-foreground mb-1.5">{t.song}</label>
          <input
            type="text"
            value={form.song_request}
            onChange={(e) => setForm({ ...form, song_request: e.target.value })}
            placeholder={t.songPlaceholder}
            className={inputClass}
            maxLength={200}
          />
        </motion.div>
      )}

      {submitError && (
        <p className="text-destructive text-sm text-center">{t.errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {submitting ? t.submitting : t.submit}
      </button>
    </motion.form>
  );
};

export default RSVPForm;
