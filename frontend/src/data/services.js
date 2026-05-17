import {
  Layers, PaintBucket, Hammer, Thermometer,
  Zap, Droplets, UtensilsCrossed, Wrench
} from 'lucide-react';

// GitHub raw image base URLs
const GH = 'https://raw.githubusercontent.com/emircansuleymanoglu/yusklussenbedrijf2/main/Resimler/';
const WEB = GH + 'Web_Gorseller/';
const BK = WEB + 'Badkamer_Toilet/';
const SS = WEB + 'Stukwerk_Schilderwerk/';
const WK = WEB + 'Woonkamer/';
const img = (n) => `${GH}image${String(n).padStart(5, '0')}.png`;

// Royalty-free Unsplash images (copyright-safe)
const U = {
  // Schilderwerk
  paintRoom: 'https://images.unsplash.com/photo-1655665151765-98a95126ba41?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  painter1: 'https://images.unsplash.com/photo-1688372199140-cade7ae820fe?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  painter2: 'https://images.unsplash.com/photo-1688372198189-de6a51777a81?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  // Timmerwerk
  carpenter1: 'https://images.unsplash.com/photo-1659930087003-2d64e33181f7?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  carpenter2: 'https://images.unsplash.com/photo-1547609434-b732edfee020?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  carpenter3: 'https://images.unsplash.com/photo-1544164560-adac3045edb2?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  // Vloerverwarming
  floor1: 'https://images.unsplash.com/photo-1649083048770-82e8ffd80431?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  floor2: 'https://images.unsplash.com/photo-1614255976202-8ce52bfcb655?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  // Elektriciteit
  electric1: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  electric2: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  electric3: 'https://images.unsplash.com/photo-1660330589693-99889d60181e?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  // Badkamer
  bath1: 'https://images.unsplash.com/photo-1661107259637-4e1c55462428?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  bath2: 'https://images.unsplash.com/photo-1696987007764-7f8b85dd3033?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  bath3: 'https://images.unsplash.com/photo-1521783593447-5702b9bfd267?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  // Keuken
  kitchen1: 'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  kitchen2: 'https://images.unsplash.com/photo-1682888813913-e13f18692019?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  kitchen3: 'https://images.unsplash.com/photo-1592506119503-c0b18879bd5a?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
  kitchen4: 'https://images.unsplash.com/photo-1609347744403-2306e8a9ae27?crop=entropy&cs=srgb&fm=jpg&w=900&q=85',
};

export const SERVICES = [
  {
    slug: 'stucwerk',
    title: 'Stucwerk & Pleisterwerk',
    shortTitle: 'Stucwerk',
    formValue: 'Stucwerk & Pleisterwerk',
    icon: Layers,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    tagline: 'Strakke muren en plafonds met vakkundig stucwerk',
    description:
      'Professioneel stucwerk is de basis van een mooi en duurzaam interieur. Onze ervaren stukadoors zorgen voor perfecte wanden en plafonds, van glad stucwerk tot decoratieve sierpleister en moderne wandpanelen. Wij gebruiken uitsluitend hoogwaardige materialen zoals KNAUF en leveren altijd een strakke, egale afwerking.',
    benefits: [
      'Perfecte, gladde en egale oppervlakken',
      'Duurzame afwerking met kwaliteitsmaterialen (KNAUF)',
      'Vakkundige uitvoering door ervaren stukadoors',
      'Snel en netjes uitgevoerd, minimale overlast',
    ],
    included: [
      'Inspectie en voorbereiding van de ondergrond',
      'Glad of sierpleister op wanden en/of plafond',
      'Schuren en egaliseren waar nodig',
      'Schoonmaken en nette oplevering',
      'Garantie op uitgevoerd werk',
    ],
    // Authentic project photos: stucwerk installatie
    images: [
      '/images/stucwerk/stuc-1.jpg',
      '/images/stucwerk/stuc-2.jpg',
      '/images/stucwerk/stuc-3.jpg',
      '/images/stucwerk/stuc-4.jpg',
    ],
  },
  {
    slug: 'schilderwerk',
    title: 'Schilderwerk Binnen & Buiten',
    shortTitle: 'Schilderwerk',
    formValue: 'Schilderwerk Binnen & Buiten',
    icon: PaintBucket,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    tagline: 'Professioneel schilderwerk voor een frisse en duurzame uitstraling',
    description:
      'Of het nu gaat om binnenschilderwerk of het opknappen van de buitenkant van uw woning — onze schilders leveren altijd topkwaliteit. Wij werken met kwalitatieve verf en materialen die lang meegaan. Van muren en plafonds tot kozijnen, deuren en gevels. Elke klus, hoe groot of klein, wordt vakkundig afgewerkt.',
    benefits: [
      'Lange levensduur door hoogwaardige verfproducten',
      'Nauwkeurige voorbereiding voor optimaal resultaat',
      'Zowel interieur als exterieur schilderwerk',
      'Strakke afwerking, ook bij complexe details',
    ],
    included: [
      'Schoonmaken en schuren van oppervlakken',
      'Kitwerk en reparaties waar nodig',
      'Grondlaag en deklagen kwalitatieve verf',
      'Afplakken en beschermen van niet te schilderen delen',
      'Netjes opruimen na afronding',
    ],
    // Mix: authentic GitHub schilderwerk photos + professional Unsplash
    images: [
      U.paintRoom,       // premium: beautifully painted living room result
      img(15),           // authentic: schilderwerk bezig in woning
      img(25),           // authentic: vers geschilderde muren
      U.painter1,        // professional: schilder aan het werk
    ],
  },
  {
    slug: 'timmerwerk',
    title: 'Timmerwerk op Maat',
    shortTitle: 'Timmerwerk',
    formValue: 'Timmerwerk op Maat',
    icon: Hammer,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    tagline: 'Maatwerk timmerwerk voor elke woning en elk project',
    description:
      'Van het plaatsen van nieuwe kozijnen en deuren tot het realiseren van op maat gemaakte kasten, wandpanelen en interieurelementen — onze timmerlieden werken precies en vakkundig. Wij combineren ambacht met moderne technieken voor een perfect eindresultaat dat past bij uw woning en leefstijl.',
    benefits: [
      'Volledig maatwerk naar uw wensen en indeling',
      'Hoge precisie en vakkundige afwerking',
      'Gebruik van duurzame en kwalitatieve houtsoorten',
      'Zowel kleine als grote timmerwerkzaamheden',
    ],
    included: [
      'Inmeten en berekening op maat',
      'Levering en plaatsing van kozijnen of deuren',
      'Kast- en meubelbouw op maat',
      'Wandpanelen en decoratieve elementen',
      'Garantie op uitgevoerd timmerwerk',
    ],
    // Mix: authentic GitHub doorway photo + professional Unsplash carpentry
    images: [
      U.carpenter1,   // professional: carpenter hands working with wood
      img(10),        // authentic: nieuwe kozijnen en deur geplaatst
      img(1),         // authentic: decoratief wandpaneel als eindresultaat
      U.carpenter2,   // professional: craftsman at work
    ],
  },
  {
    slug: 'vloerverwarming',
    title: 'Vloerverwarming Installatie',
    shortTitle: 'Vloerverwarming',
    formValue: 'Vloerverwarming Installatie',
    icon: Thermometer,
    color: 'text-red-600',
    bg: 'bg-red-50',
    tagline: 'Comfortabel en energiezuinig verwarmen met vloerverwarming',
    description:
      'Vloerverwarming is een duurzame en comfortabele manier om uw woning te verwarmen. Onze specialisten installeren zowel water- als elektrische vloerverwarming, passend bij uw bestaande verwarmingssysteem. Van parket en laminaat tot tegels — wij zorgen voor een perfecte installatie.',
    benefits: [
      'Gelijkmatige warmteverdeling door de hele ruimte',
      'Energiezuiniger dan traditionele radiatoren',
      'Geschikt voor alle vloertypes',
      'Stille en onzichtbare verwarmingsoplossing',
    ],
    included: [
      'Advies en opmeting van de ruimte',
      'Levering en installatie van het systeem',
      'Aansluiting op bestaand verwarmingssysteem',
      'Leggen van de vloer (laminaat, parket of tegels)',
      'Inregelen en testen — uitleg en handleiding',
    ],
    // Authentic project photos: vloerverwarming installatie
    images: [
      '/images/vloerverwarming/vloer-3.jpeg',
      '/images/vloerverwarming/vloer-1.jpeg',
      '/images/vloerverwarming/vloer-4.jpeg',
      '/images/vloerverwarming/vloer-2.jpeg',
      '/images/vloerverwarming/vloer-6.jpeg',
      '/images/vloerverwarming/vloer-5.jpeg',
    ],
  },
  {
    slug: 'elektriciteit',
    title: 'Elektrotechniek',
    shortTitle: 'Elektriciteit',
    formValue: 'Elektrotechniek',
    icon: Zap,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    tagline: 'Veilige en betrouwbare elektrotechnische installaties',
    description:
      'Veiligheid en betrouwbaarheid staan centraal bij onze elektrotechnische werkzaamheden. Of het nu gaat om het aanleggen van nieuwe groepen, installeren van stopcontacten en schakelmateriaal, of het vervangen van de meterkast — onze elektriciens werken altijd conform de NEN-normen.',
    benefits: [
      'Gecertificeerde elektriciens met NEN-certificering',
      'Veilige en normconforme installaties',
      'Snel en efficiënt uitgevoerd',
      'Inspectierapport beschikbaar op aanvraag',
    ],
    included: [
      'Inspectie van bestaande installatie',
      'Aanleg van nieuwe groepen en leidingen',
      'Plaatsing van stopcontacten en schakelmateriaal',
      'Vervanging of uitbreiding van de meterkast',
      'Eindkeuring en veiligheidsinspectie',
    ],
    // Authentic project photos: elektriciteit installatie
    images: [
      '/images/elektriciteit/elek-4.jpg',
      '/images/elektriciteit/elek-2.jpg',
      '/images/elektriciteit/elek-1.jpg',
      '/images/elektriciteit/elek-5.jpg',
      '/images/elektriciteit/elek-3.jpg',
    ],
  },
  {
    slug: 'badkamer-renovatie',
    title: 'Badkamer Renovatie',
    shortTitle: 'Badkamer',
    formValue: 'Badkamer Renovatie',
    icon: Droplets,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    tagline: 'Complete badkamerrenovaties van A tot Z',
    description:
      'Een nieuwe badkamer is een investering die u dagelijks plezier geeft. Wij verzorgen complete badkamerrenovaties: van ontwerp en tegelwerk tot installatie van sanitair, douche, ligbad en vloerverwarming. Alles wordt vakkundig en strak afgewerkt naar uw smaak en budget.',
    benefits: [
      'Volledige badkamerrenovatie door één aannemer',
      'Ruim assortiment tegels en sanitair naar keuze',
      'Waterproof afwerking en correcte afvoer',
      'Heldere planning en transparante prijsafspraak',
    ],
    included: [
      'Slopen en afvoeren van bestaande badkamer',
      'Waterdicht maken van wanden en vloer',
      'Tegelwerk en voegwerk',
      'Installatie van sanitair, douche en/of bad',
      'Plaatsing van spiegels, kranen en accessoires',
    ],
    // Mix: authentic GitHub bathroom photos + premium Unsplash bathrooms
    images: [
      U.bath1,                               // premium: luxe badkamer eindresultaat
      BK + 'badkamer_toilet-03.webp',        // authentic client photo
      U.bath2,                               // premium: moderne badkamer met douche
      BK + 'badkamer_toilet-05.webp',        // authentic client photo
    ],
  },
  {
    slug: 'keuken-renovatie',
    title: 'Keuken Renovatie',
    shortTitle: 'Keuken',
    formValue: 'Keuken Renovatie',
    icon: UtensilsCrossed,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    tagline: 'Droomkeukens die perfect aansluiten op uw leefstijl',
    description:
      'De keuken is het hart van het huis. Wij realiseren keukens op maat of renoveren uw bestaande keuken. Van het plaatsen van nieuwe fronten en werkbladen tot een complete keukenvervanging inclusief electra, loodgieterswerk en tegelwerk. Modern, functioneel en op maat.',
    benefits: [
      'Op maat gemaakt naar uw wensen en indeling',
      'Één aannemer voor het volledige project',
      'Elektrische en loodgietersaanpassingen inbegrepen',
      'Breed scala aan keukenstijlen en materialen',
    ],
    included: [
      'Slopen en verwijderen van oude keuken',
      'Aanpassen van elektrische aansluitingen',
      'Loodgieterswerk en afvoer aanpassen',
      'Plaatsing van nieuwe keuken en apparatuur',
      'Tegelwerk achterwand en afwerking',
    ],
    // High-quality Unsplash kitchen images (royalty-free)
    images: [
      U.kitchen1,   // premium: modern white kitchen with island
      U.kitchen2,   // premium: marble kitchen island
      U.kitchen3,   // premium: white cabinet kitchen detail
      U.kitchen4,   // premium: bright kitchen interior
    ],
  },
  {
    slug: 'algemene-verbouwing',
    title: 'Algemene Verbouwing',
    shortTitle: 'Verbouwing',
    formValue: 'Algemene Verbouwing',
    icon: Wrench,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    tagline: 'Van kleine klus tot grote renovatie — wij regelen het',
    description:
      'Naast onze gespecialiseerde diensten zijn wij ook uw partner voor algemene verbouwingen. Of het nu gaat om het slopen van een muur, het uitbouwen van een dakkapel of een volledige woningrenovatie — wij pakken elk project professioneel en gestructureerd aan.',
    benefits: [
      'Totaaloplossing voor elke verbouwing',
      'Coördinatie van alle betrokken vaklieden',
      'Transparante communicatie en planning',
      'Netjes en op tijd opgeleverd',
    ],
    included: [
      'Advies en omschrijving van het project',
      'Coördinatie van alle werkzaamheden',
      'Sloopwerk en bouwkundige aanpassingen',
      'Afwerking: stucwerk, schilderwerk, tegels',
      'Oplevering en nazorg',
    ],
    // Diverse renovation images - each unique and different type
    images: [
      WK + 'woonkamer-01.webp',              // authentic: finished living room renovation result
      img(10),                                // authentic: new doorway & renovation in progress
      SS + 'stukwerk_schilderwerk-26.webp',   // authentic: wall finishing detail
      BK + 'badkamer_toilet-07.webp',         // authentic: bathroom as part of complete verbouwing
    ],
  },
];

export const LOGO_URL =
  'https://customer-assets.emergentagent.com/job_klus-preview/artifacts/mj7uc5ko_yus-logo-cropped.png';

export const PHONE = '+31 6 12345678';
export const PHONE_RAW = '31612345678';
export const EMAIL = 'info@yusklussenbedrijf.nl';
export const REGIO = 'Rotterdam en omgeving';
export const WA_MSG = encodeURIComponent(
  'Hallo Yus Klussenbedrijf, ik heb interesse in uw diensten. Kunt u mij meer informatie geven?'
);
