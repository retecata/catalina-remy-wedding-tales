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

export const pageTranslations: Record<Language, {
  gettingMarried: string;
  tagline: string;
  ourStoryTitle: string;
  ourCelebrationsTitle: string;
  ourCelebrationsSubtitle: string;
  footer: string;
  story: string[];
}> = {
  en: {
    gettingMarried: "We're getting married",
    tagline: 'Two celebrations, one love',
    ourStoryTitle: 'Our Story',
    ourCelebrationsTitle: 'Our Celebrations',
    ourCelebrationsSubtitle: 'We invite you to share in our joy across two beautiful countries',
    footer: 'With love and gratitude',
    story: [
      'It was the tail end of the pandemic, and like many, we\'d both found refuge in gaming. One day, fate queued us into the same Apex Legends match. After a few rounds of surprisingly good teamwork, Catalina turned to Remy and said: |"Can I be forever in your team?"',
      'What started with headsets and ping calls grew into late-night WhatsApp messages, endless Discord calls, and the kind of connection that makes the distance between Romania and the Netherlands feel like nothing at all.',
      'Then came the leap of faith — Catalina flew to the Netherlands to meet Remy in person. A bit crazy in hindsight, perhaps, but from the very first moment they met, everything just clicked. Soon after, Remy made the trip to Romania.',
      '|"I don\'t know if this has a future,"| Catalina said honestly. |"I have a career in Dublin and I\'m not willing to move right now."| Without hesitation, Remy replied: |"No problem — I\'ll move."',
      'From that moment, his commitment never wavered. They lived together in Dublin for a year and a half before deciding to move to the Netherlands to be closer to his family. Is the Netherlands the final stop? They don\'t know yet — but wherever life takes them, they\'ll be in each other\'s team.',
    ],
  },
  nl: {
    gettingMarried: 'Wij gaan trouwen',
    tagline: 'Twee feesten, één liefde',
    ourStoryTitle: 'Ons Verhaal',
    ourCelebrationsTitle: 'Onze Feesten',
    ourCelebrationsSubtitle: 'We nodigen jullie uit om onze vreugde te delen in twee prachtige landen',
    footer: 'Met liefde en dankbaarheid',
    story: [
      'Het was aan het einde van de pandemie, en zoals velen hadden we allebei onze toevlucht gezocht in gaming. Op een dag plaatste het lot ons in dezelfde Apex Legends match. Na een paar rondes verrassend goed teamwork, zei Catalina tegen Remy: |"Mag ik voor altijd in jouw team?"',
      'Wat begon met headsets en ping calls groeide uit tot nachtelijke WhatsApp-berichten, eindeloze Discord-gesprekken en het soort verbinding dat de afstand tussen Roemenië en Nederland als niets doet voelen.',
      'Toen kwam de sprong in het diepe — Catalina vloog naar Nederland om Remy persoonlijk te ontmoeten. Achteraf gezien misschien een beetje gek, maar vanaf het allereerste moment klikte het gewoon. Kort daarna maakte Remy de reis naar Roemenië.',
      '|"Ik weet niet of dit een toekomst heeft,"| zei Catalina eerlijk. |"Ik heb een carrière in Dublin en ik ben op dit moment niet bereid om te verhuizen."| Zonder aarzeling antwoordde Remy: |"Geen probleem — ik verhuis wel."',
      'Vanaf dat moment wankelde zijn toewijding nooit. Ze woonden anderhalf jaar samen in Dublin voordat ze besloten naar Nederland te verhuizen om dichter bij zijn familie te zijn. Is Nederland de eindbestemming? Dat weten ze nog niet — maar waar het leven hen ook brengt, ze zitten in elkaars team.',
    ],
  },
  ro: {
    gettingMarried: 'Ne căsătorim',
    tagline: 'Două celebrări, o singură iubire',
    ourStoryTitle: 'Povestea Noastră',
    ourCelebrationsTitle: 'Celebrările Noastre',
    ourCelebrationsSubtitle: 'Vă invităm să ne împărtășiți bucuria în două țări frumoase',
    footer: 'Cu dragoste și recunoștință',
    story: [
      'Era spre sfârșitul pandemiei și, ca mulți alții, ne găsisem refugiul în gaming. Într-o zi, soarta ne-a pus în aceeași partidă de Apex Legends. După câteva runde de teamwork surprinzător de bun, Catalina i-a zis lui Remy: |"Pot să fiu pentru totdeauna în echipa ta?"',
      'Ce a început cu căști și apeluri de ping s-a transformat în mesaje WhatsApp până târziu în noapte, conversații nesfârșite pe Discord și genul de conexiune care face ca distanța dintre România și Olanda să pară nimic.',
      'Apoi a venit saltul de credință — Catalina a zburat în Olanda să-l cunoască pe Remy în persoană. Poate un pic nebunesc privind în urmă, dar din primul moment în care s-au întâlnit, totul a funcționat perfect. La scurt timp, Remy a făcut călătoria în România.',
      '|"Nu știu dacă relația asta are un viitor,"| a spus Catalina sincer. |"Am o carieră în Dublin și nu sunt dispusă să mă mut acum."| Fără ezitare, Remy a răspuns: |"Nicio problemă — mă mut eu."',
      'Din acel moment, devotamentul lui nu a clătinat niciodată. Au locuit împreună în Dublin un an și jumătate, până au decis să se mute în Olanda pentru a fi mai aproape de familia lui. Este Olanda destinația finală? Încă nu știu — dar oriunde îi va duce viața, vor fi în echipa celuilalt.',
    ],
  },
};

export const translations = {
  netherlands: {
    en: {
      title: 'The Netherlands Celebration',
      date: '5 September 2026',
      location: 'Brouwerskolkje, Overveen',
      description: 'Our main wedding celebration will take place in Romania on 11 September 2027.\n\nWe\'re also hosting a smaller celebration in the Netherlands for friends and family who are already here or may not be able to travel.\n\nWe can\'t wait to celebrate with everyone in Romania as well.',
      details: 'See details',
      rsvp: 'RSVP',
    },
    nl: {
      title: 'Feest in Nederland',
      date: '5 september 2026',
      location: 'Brouwerskolkje, Overveen',
      description: 'Onze belangrijkste huwelijksviering vindt plaats in Roemenië op 11 september 2027.\n\nDaarnaast organiseren we een kleinere viering in Nederland voor vrienden en familie die hier wonen of voor wie reizen naar Roemenië lastig is.\n\nWe kijken ernaar uit om ook in Roemenië met iedereen samen te vieren.',
      details: 'Bekijk details',
      rsvp: 'RSVP',
    },
    ro: {
      title: 'Celebrarea din Olanda',
      date: '5 septembrie 2026',
      location: 'Brouwerskolkje, Overveen',
      description: 'Petrecerea noastră principală de nuntă va avea loc în România pe 11 septembrie 2027.\n\nOrganizam o petrecere mai mică în Olanda pentru prietenii și familia care sunt deja aici sau pentru cei care nu pot ajunge in Romania.\n\nAbia așteptăm să sărbătorim împreună cu toată lumea și în România.',
      details: 'Vezi detalii',
      rsvp: 'RSVP',
    },
  },
  romania: {
    en: {
      title: 'The Romania Celebration',
      date: '11 September 2027',
      location: 'Sun Garden Resort, Cluj-Napoca',
      description: 'Celebrate with us in Romania as we honor our roots and share our joy with loved ones.',
      details: 'See details',
      rsvp: 'RSVP',
    },
    nl: {
      title: 'Feest in Roemenië',
      date: '11 september 2027',
      location: 'Sun Garden Resort, Cluj-Napoca',
      description: 'Vier met ons mee in Roemenië terwijl we onze wortels eren en onze vreugde delen met dierbaren.',
      details: 'Bekijk details',
      rsvp: 'RSVP',
    },
    ro: {
      title: 'Celebrarea din România',
      date: '11 septembrie 2027',
      location: 'Sun Garden Resort, Cluj-Napoca',
      description: 'Sărbătoriți alături de noi în România, în timp ce ne onorăm rădăcinile și ne împărtășim bucuria cu cei dragi.',
      details: 'Vezi detalii',
      rsvp: 'RSVP',
    },
  },
} as const;

export const languageLabels: Record<Language, string> = {
  en: 'English',
  nl: 'Nederlands',
  ro: 'Română',
};
