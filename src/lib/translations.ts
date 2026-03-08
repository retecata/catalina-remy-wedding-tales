export type Language = 'en' | 'nl' | 'ro';

export const eventDates = {
  netherlands: new Date('2026-09-05T00:00:00'),
  romania: new Date('2027-09-11T00:00:00'),
};

export const countdownLabels: Record<Language, { days: string; hours: string; minutes: string; seconds: string }> = {
  en: { days: 'Days', hours: 'Hours', minutes: 'Min', seconds: 'Sec' },
  nl: { days: 'Dagen', hours: 'Uren', minutes: 'Min', seconds: 'Sec' },
  ro: { days: 'Zile', hours: 'Ore', minutes: 'Min', seconds: 'Sec' },
};

export const translations = {
  netherlands: {
    en: {
      title: 'The Netherlands Celebration',
      date: '5 September 2026',
      location: 'Brouwerskolkje, Overveen',
      description: 'Join us for our celebration in the Netherlands as we begin our journey together surrounded by friends and family.',
      details: 'More details coming soon',
      rsvp: 'RSVP',
    },
    nl: {
      title: 'Feest in Nederland',
      date: '5 september 2026',
      location: 'Brouwerskolkje, Overveen',
      description: 'Vier met ons mee in Nederland terwijl we onze reis samen beginnen, omringd door vrienden en familie.',
      details: 'Meer details volgen binnenkort',
      rsvp: 'RSVP',
    },
    ro: {
      title: 'Celebrarea din Olanda',
      date: '5 septembrie 2026',
      location: 'Brouwerskolkje, Overveen',
      description: 'Alăturați-vă nouă pentru celebrarea din Olanda, în timp ce ne începem călătoria împreună, înconjurați de prieteni și familie.',
      details: 'Mai multe detalii în curând',
      rsvp: 'RSVP',
    },
  },
  romania: {
    en: {
      title: 'The Romania Celebration',
      date: '11 September 2027',
      location: 'Sun Garden Resort, Cluj-Napoca',
      description: 'Celebrate with us in Romania as we honor our roots and share our joy with loved ones.',
      details: 'More details coming soon',
      rsvp: 'RSVP',
    },
    nl: {
      title: 'Feest in Roemenië',
      date: '11 september 2027',
      location: 'Sun Garden Resort, Cluj-Napoca',
      description: 'Vier met ons mee in Roemenië terwijl we onze wortels eren en onze vreugde delen met dierbaren.',
      details: 'Meer details volgen binnenkort',
      rsvp: 'RSVP',
    },
    ro: {
      title: 'Celebrarea din România',
      date: '11 septembrie 2027',
      location: 'Sun Garden Resort, Cluj-Napoca',
      description: 'Sărbătoriți alături de noi în România, în timp ce ne onorăm rădăcinile și ne împărtășim bucuria cu cei dragi.',
      details: 'Mai multe detalii în curând',
      rsvp: 'RSVP',
    },
  },
} as const;

export const languageLabels: Record<Language, string> = {
  en: 'English',
  nl: 'Nederlands',
  ro: 'Română',
};
