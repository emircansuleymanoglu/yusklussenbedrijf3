import {
  Layers, PaintBucket, Hammer, Thermometer,
  Zap, Droplets, UtensilsCrossed, Wrench
} from 'lucide-react';

const GH = 'https://raw.githubusercontent.com/emircansuleymanoglu/yusklussenbedrijf2/main/Resimler/';
const WEB = GH + 'Web_Gorseller/';
const BK = WEB + 'Badkamer_Toilet/';
const SS = WEB + 'Stukwerk_Schilderwerk/';
const WK = WEB + 'Woonkamer/';
const img = (n) => `${GH}image${String(n).padStart(5, '0')}.png`;

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
      'Professioneel stucwerk is de basis van een mooi en duurzaam interieur. Onze ervaren stukadoors zorgen voor perfecte wanden en plafonds, van glad stucwerk tot decoratieve sierpleister. Wij gebruiken uitsluitend hoogwaardige materialen en leveren altijd een strakke, egale afwerking.',
    benefits: [
      'Perfecte, gladde en egale oppervlakken',
      'Duurzame afwerking met kwaliteitsmaterialen',
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
    images: [
      SS + 'stukwerk_schilderwerk-08.webp',
      SS + 'stukwerk_schilderwerk-13.webp',
      SS + 'stukwerk_schilderwerk-15.webp',
      SS + 'stukwerk_schilderwerk-16.webp',
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
      'Of het nu gaat om binnenschilderwerk of het opknappen van de buitenkant van uw woning — onze schilders leveren altijd topkwaliteit. Wij werken met kwalitatieve verf en materialen die lang meegaan. Van muren en plafonds tot kozijnen, deuren en gevels.',
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
    images: [
      SS + 'stukwerk_schilderwerk-17.webp',
      SS + 'stukwerk_schilderwerk-19.webp',
      SS + 'stukwerk_schilderwerk-22.webp',
      SS + 'stukwerk_schilderwerk-25.webp',
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
      'Van het plaatsen van nieuwe kozijnen en deuren tot het realiseren van op maat gemaakte kasten en interieurelementen — onze timmerlieden werken precies en vakkundig. Wij combineren ambacht met moderne technieken voor een perfect eindresultaat dat past bij uw woning.',
    benefits: [
      'Volledig maatwerk naar uw wensen',
      'Hoge precisie en vakkundige afwerking',
      'Gebruik van duurzame en kwalitatieve houtsoorten',
      'Zowel kleine als grote timmerwerkzaamheden',
    ],
    included: [
      'Inmeten en berekening op maat',
      'Levering en plaatsing van kozijnen of deuren',
      'Kast- en meubelbouw op maat',
      'Vloerlegwerk en plinten',
      'Garantie op uitgevoerd timmerwerk',
    ],
    images: [img(1), img(2), img(3), img(4)],
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
      'Vloerverwarming is een duurzame en comfortabele manier om uw woning te verwarmen. Onze specialisten installeren zowel water- als elektrische vloerverwarming, passend bij uw bestaande verwarmingssysteem. Wij zorgen voor een perfecte installatie met minimale overlast.',
    benefits: [
      'Gelijkmatige warmteverdeling door de hele ruimte',
      'Energiezuiniger dan traditionele radiatoren',
      'Geschikt voor alle vloertypes',
      'Stille en onzichtbare verwarmingsoplossing',
    ],
    included: [
      'Advies en opmeting van de ruimte',
      'Levering en installatie van het vloerverwarmingssysteem',
      'Aansluiting op bestaand of nieuw verwarmingssysteem',
      'Inregelen en testen van het systeem',
      'Uitleg en handleiding voor gebruik',
    ],
    images: [img(5), img(6), img(7), img(8)],
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
    images: [img(9), img(10), img(11), img(12)],
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
    images: [
      BK + 'badkamer_toilet-03.webp',
      BK + 'badkamer_toilet-04.webp',
      BK + 'badkamer_toilet-05.webp',
      BK + 'badkamer_toilet-06.webp',
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
    images: [img(13), img(14), img(15), img(16)],
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
    images: [
      WK + 'woonkamer-01.webp',
      WK + 'woonkamer-24.webp',
      SS + 'stukwerk_schilderwerk-26.webp',
      BK + 'badkamer_toilet-07.webp',
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
