export type Language = 'en' | 'nl' | 'ro';

export const translations = {
  netherlands: {
    en: {
      title: 'The Netherlands Celebration',
      date: 'Date to be announced',
      location: 'Location to be announced',
      description: 'Join us for our celebration in the Netherlands as we begin our journey together surrounded by friends and family.',
      details: 'More details coming soon',
      rsvp: 'RSVP',
    },
    nl: {
      title: 'Feest in Nederland',
      date: 'Datum wordt nog aangekondigd',
      location: 'Locatie wordt nog aangekondigd',
      description: 'Vier met ons mee in Nederland terwijl we onze reis samen beginnen, omringd door vrienden en familie.',
      details: 'Meer details volgen binnenkort',
      rsvp: 'RSVP',
    },
    ro: {
      title: 'Celebrarea din Olanda',
      date: 'Data va fi anunțată',
      location: 'Locația va fi anunțată',
      description: 'Alăturați-vă nouă pentru celebrarea din Olanda, în timp ce ne începem călătoria împreună, înconjurați de prieteni și familie.',
      details: 'Mai multe detalii în curând',
      rsvp: 'RSVP',
    },
  },
  romania: {
    en: {
      title: 'The Romania Celebration',
      date: 'Date to be announced',
      location: 'Location to be announced',
      description: 'Celebrate with us in Romania as we honor our roots and share our joy with loved ones.',
      details: 'More details coming soon',
      rsvp: 'RSVP',
    },
    nl: {
      title: 'Feest in Roemenië',
      date: 'Datum wordt nog aangekondigd',
      location: 'Locatie wordt nog aangekondigd',
      description: 'Vier met ons mee in Roemenië terwijl we onze wortels eren en onze vreugde delen met dierbaren.',
      details: 'Meer details volgen binnenkort',
      rsvp: 'RSVP',
    },
    ro: {
      title: 'Celebrarea din România',
      date: 'Data va fi anunțată',
      location: 'Locația va fi anunțată',
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
