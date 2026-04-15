export type ContentChannel = 'instagram' | 'linkedin-firma' | 'linkedin-osobisty' | 'facebook' | 'newsletter'
export type ContentStatus = 'opublikowany' | 'zaplanowany' | 'szkic' | 'do-poprawki'
export type ContentType = 'karuzela' | 'post' | 'reel' | 'story' | 'artykuł' | 'newsletter'

export interface ContentPost {
  id: string
  title: string
  channel: ContentChannel
  type: ContentType
  status: ContentStatus
  scheduledDate: string  // ISO date
  scheduledTime: string  // HH:MM
  content: string
  hashtags?: string[]
  likes?: number
  reach?: number
  comments?: number
}

export const CHANNEL_CONFIG: Record<ContentChannel, { label: string; color: string; bg: string; dot: string }> = {
  'instagram':          { label: 'Instagram',         color: '#ec4899', bg: 'rgba(236,72,153,0.15)',  dot: '#ec4899' },
  'linkedin-firma':     { label: 'LinkedIn Firmowy',   color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', dot: '#3b82f6' },
  'linkedin-osobisty':  { label: 'LinkedIn Osobisty',  color: '#60a5fa', bg: 'rgba(96,165,250,0.15)', dot: '#60a5fa' },
  'facebook':           { label: 'Facebook',           color: '#6366f1', bg: 'rgba(99,102,241,0.15)', dot: '#6366f1' },
  'newsletter':         { label: 'Newsletter',         color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', dot: '#f59e0b' },
}

// April 2026 content calendar
export const MOCK_CONTENT: ContentPost[] = [
  // Week 1
  {
    id: 'c1',
    title: '5 błędów agencji w zarządzaniu leadami [Karuzela]',
    channel: 'instagram',
    type: 'karuzela',
    status: 'opublikowany',
    scheduledDate: '2026-04-01',
    scheduledTime: '10:00',
    content: `Slide 1: 5 błędów które kosztują Twoją agencję tysiące złotych miesięcznie 🔴\n\nSlide 2: Błąd #1: Brak systemu śledzenia leadów\nWiększość agencji traci 30-40% leadów bo nie ma gdzie ich zapisać. Excel to nie CRM.\n\nSlide 3: Błąd #2: Brak follow-upów w odpowiednim momencie\nPierwsze 48h to złoty czas. Potem szanse spadają o 60%.\n\nSlide 4: Błąd #3: Zero personalizacji w wiadomościach\n"Hej, chciałem zapytać..." to przepis na ignorowanie. AI scoring mówi Ci CO napisać.\n\nSlide 5: Rozwiązanie: System który robi to za Ciebie ✅\nAgencyOS → więcej dealów, mniej pracy manualnej.`,
    hashtags: ['#agencjamarketingowa', '#CRM', '#sprzedaż', '#leadgeneration', '#automatyzacja'],
    likes: 234,
    reach: 4820,
    comments: 18,
  },
  {
    id: 'c2',
    title: 'Jak zwiększyliśmy reply rate o 40% [Case Study]',
    channel: 'linkedin-firma',
    type: 'post',
    status: 'opublikowany',
    scheduledDate: '2026-04-02',
    scheduledTime: '09:00',
    content: `🚀 Case study: Jak agencja marketingowa zwiększyła reply rate z 19% na 34% w 6 tygodni

Problem: ContentFactory wysyłała te same wiadomości outreach do wszystkich leadów. Efekt? Ignorowanie.

Rozwiązanie: Wdrożyliśmy AI scoring który:
✅ Analizuje aktywność online leadów
✅ Dopasowuje moment kontaktu
✅ Personalizuje icebreaker pod segment

Wynik po 6 tygodniach:
📈 Reply rate: 19% → 34%
📈 Umówionych rozmów: 8 → 14/miesiąc
📈 Zamkniętych dealów: +2 deale = +28 000 PLN

Szczegóły wdrożenia w komentarzach ↓`,
    hashtags: ['#agencja', '#outreach', '#AI', '#sprzedaż'],
    likes: 156,
    reach: 8900,
    comments: 31,
  },
  {
    id: 'c3',
    title: 'Reel: "Dzień z życia agencji z AI"',
    channel: 'instagram',
    type: 'reel',
    status: 'opublikowany',
    scheduledDate: '2026-04-03',
    scheduledTime: '18:00',
    content: `Hook: "Co robi AI w mojej agencji przez cały dzień?" [9:00 - AI generuje 5 postów, 10:30 - scoring leadów, 12:00 - follow-upy wysłane automatycznie, 16:00 - raport sprzedażowy gotowy] CTA: Link w bio`,
    hashtags: ['#AI', '#agencja', '#automatyzacja', '#marketing'],
    likes: 892,
    reach: 21400,
    comments: 67,
  },
  {
    id: 'c4',
    title: 'Post FB: Webinar "AI w agencji marketingowej"',
    channel: 'facebook',
    type: 'post',
    status: 'opublikowany',
    scheduledDate: '2026-04-03',
    scheduledTime: '12:00',
    content: `📅 Bezpłatny webinar: "Jak wdrożyć AI w swojej agencji marketingowej?"\n\nPierwsza edycja odbyła się w marcu – ponad 200 zapisanych agencji!\n\nCzego się dowiesz:\n→ Jak AI scoring podnosi reply rate o 40%\n→ Generator treści który zastąpi 3h pracy dziennie\n→ Pipeline który sam się zarządza\n\n🔗 Zapisz się: link w komentarzu`,
    hashtags: ['#webinar', '#AI', '#agencja', '#marketing'],
    likes: 48,
    reach: 2100,
    comments: 23,
  },

  // Week 2
  {
    id: 'c5',
    title: 'LinkedIn: "Dlaczego agencje tracą leady z Meta Ads"',
    channel: 'linkedin-osobisty',
    type: 'post',
    status: 'opublikowany',
    scheduledDate: '2026-04-07',
    scheduledTime: '08:30',
    content: `Rozmawiałam ostatnio z 12 CEO agencji marketingowych.

Każdy ma ten sam problem.

Wydają 5-20 tys. PLN miesięcznie na reklamy → generują leady → i... tracą 40% z nich.

Dlaczego?

Bo nie ma systemu który:
→ Przypisuje lead do właściwej osoby w ciągu 5 minut
→ Wysyła spersonalizowany follow-up w ciągu 1h
→ Trackuje gdzie lead "utknął" w procesie

To nie jest problem budżetu reklamowego.
To problem operacyjny.

I można go rozwiązać w tydzień.

Jaki macie system na to?`,
    hashtags: ['#agencja', '#leadgeneration', '#CRM', '#metaads'],
    likes: 312,
    reach: 15600,
    comments: 44,
  },
  {
    id: 'c6',
    title: 'IG Karuzela: "3 narzędzia AI które używam codziennie"',
    channel: 'instagram',
    type: 'karuzela',
    status: 'opublikowany',
    scheduledDate: '2026-04-08',
    scheduledTime: '10:00',
    content: `Slide 1: 3 narzędzia AI które oszczędzają mi 4h dziennie w agencji 🤖\n\nSlide 2: #1 ChatGPT + Custom Instructions\nSwoją "osobowość" wpisz raz – generuj posty, maile, oferty w 30 sek.\n\nSlide 3: #2 Make.com + AI scoring\nAutomatycznie ocenia leady 0-100 – wiesz z kim rozmawiać DZIŚ\n\nSlide 4: #3 AgencyOS - własny system\nKalendar, CRM, finanse w jednym – koniec exceli\n\nSlide 5: Czas zaoszczędzony = czas na klientów 🚀`,
    hashtags: ['#AI', '#narzędzia', '#agencja', '#produktywność'],
    likes: 445,
    reach: 9800,
    comments: 29,
  },
  {
    id: 'c7',
    title: 'LinkedIn Firma: Wyniki Q1 agencji',
    channel: 'linkedin-firma',
    type: 'artykuł',
    status: 'opublikowany',
    scheduledDate: '2026-04-09',
    scheduledTime: '09:00',
    content: `📊 Podsumowanie Q1 2026 – Kreativa Marketing

Zdecydowaliśmy się podzielić naszymi wynikami. Transparentność buduje zaufanie.

Q1 2026 vs Q1 2025:
📈 Przychód: +67% (18 200 → 30 400 PLN/mc)
📈 Liczba klientów: 4 → 9 aktywnych
📈 Reply rate outreach: 22% → 34%
📈 Czas wdrożenia klienta: 3 tyg → 8 dni

Co zmieniło się przez rok?
→ Wdrożyliśmy własny system operacyjny
→ Zautomatyzowaliśmy outreach
→ AI generuje 80% contentu (my edytujemy)

Szczegóły w artykule.`,
    hashtags: ['#agencja', '#wyniki', '#Q1', '#transparentność'],
    likes: 201,
    reach: 11200,
    comments: 37,
  },
  {
    id: 'c8',
    title: 'Newsletter #12 – "Jak skalować bez zatrudniania"',
    channel: 'newsletter',
    type: 'newsletter',
    status: 'opublikowany',
    scheduledDate: '2026-04-09',
    scheduledTime: '08:00',
    content: `Temat: Jak prowadzić agencję dla 10 klientów bez zatrudniania nowych osób

W tym numerze:
1. System który zarządza 10 klientami jednocześnie
2. Generator treści który produkuje 30 postów w 2h
3. Case study: Kreativa Marketing Q1 2026
4. Narzędzie tygodnia: Make.com + AI scoring

Liczba subskrybentów: 1 240
Open rate: 41%
CTR: 8.2%`,
    hashtags: [],
    likes: 0,
    reach: 1240,
    comments: 0,
  },

  // Week 3
  {
    id: 'c9',
    title: 'IG Post: "Ile zarabia agencja marketingowa w Polsce"',
    channel: 'instagram',
    type: 'post',
    status: 'opublikowany',
    scheduledDate: '2026-04-10',
    scheduledTime: '12:00',
    content: `Temat tabu w branży – porozmawiajmy o pieniądzach 💰\n\nIle zarabia agencja marketingowa w Polsce?\n\nSmall agency (1-3 os):\n→ Przychód: 15-35k PLN/mc\n→ Marża: 40-65%\n\nMid agency (4-10 os):\n→ Przychód: 60-200k PLN/mc  \n→ Marża: 25-45%\n\nCo wpływa na marżę:\n✅ Automatyzacja procesów\n✅ System do zarządzania klientami\n✅ Właściwy dobór klientów (ICP)\n\nBez systemu – tracisz czas = tracisz marżę.`,
    hashtags: ['#agencjamarketingowa', '#zarobki', '#business', '#marża'],
    likes: 678,
    reach: 18900,
    comments: 82,
  },
  {
    id: 'c10',
    title: 'LinkedIn Osobisty: "3 pytania które zadaję każdemu leadowi"',
    channel: 'linkedin-osobisty',
    type: 'post',
    status: 'opublikowany',
    scheduledDate: '2026-04-14',
    scheduledTime: '08:30',
    content: `Zanim wyślę ofertę – zadaję 3 pytania.

Nie o budżet. Nie o timeline.

#1: "Co próbowaliście wcześniej?"
→ Dowiem się czego NIE kupią

#2: "Co by się musiało wydarzyć żebyście powiedzieli że wdrożenie było sukcesem?"
→ Zrozumiem PRAWDZIWY cel

#3: "Kto jeszcze jest zaangażowany w tę decyzję?"
→ Nie będę zaskoczony przez "muszę się skonsultować"

Te 3 pytania zmieniły mój close rate z 18% na 31%.

Jakie pytania zadajecie?`,
    hashtags: ['#sprzedaż', '#B2B', '#closingdeals', '#agencja'],
    likes: 489,
    reach: 22100,
    comments: 63,
  },
  {
    id: 'c11',
    title: 'FB: "Ogłoszenie: nowe miejsca w programie"',
    channel: 'facebook',
    type: 'post',
    status: 'opublikowany',
    scheduledDate: '2026-04-14',
    scheduledTime: '11:00',
    content: `🎉 Otwieramy 3 nowe miejsca w programie wdrożeniowym AgencyOS!\n\nDla kogo:\n→ Agencje 1-15 osób\n→ Przychód 10k-100k PLN/mc\n→ Gotowe na wdrożenie AI\n\nCo dostajesz:\n✅ Pełny system operacyjny\n✅ 3 tygodnie onboardingu\n✅ Generator treści AI\n✅ Pipeline i CRM\n✅ Portal klienta\n\n📩 Napisz "DEMO" w komentarzu lub na DM`,
    hashtags: ['#agencja', '#AI', '#nabór', '#wdrożenie'],
    likes: 67,
    reach: 3400,
    comments: 34,
  },
  {
    id: 'c12',
    title: 'IG Karuzela: "Harmonogram contentu na cały miesiąc w 2h"',
    channel: 'instagram',
    type: 'karuzela',
    status: 'zaplanowany',
    scheduledDate: '2026-04-15',
    scheduledTime: '10:00',
    content: `Slide 1: Tworzę content na cały miesiąc w 2h – oto jak 📅\n\nSlide 2: Krok 1 – Pilary contentu (15 min)\nWybierz 3-4 tematy które znasz na wylot i które interesują Twoich klientów\n\nSlide 3: Krok 2 – Matryca 5 formatów (20 min)\n1 temat × 5 formatów = 5 postów. Masz 4 tematy? To 20 postów.\n\nSlide 4: Krok 3 – AI generuje treść (60 min)\nWpisz temat w generator → edytuj → gotowe\n\nSlide 5: Krok 4 – Zaplanuj w kalendarzu (25 min)\nRozłóż posty w kalendarzu. System przypomni.\n\nSlide 6: Efekt: 20-25 postów gotowych z wyprzedzeniem 🚀`,
    hashtags: ['#contentmarketing', '#calendario', '#AI', '#agencja'],
  },
  {
    id: 'c13',
    title: 'LinkedIn Firma: Infografika – AI w sprzedaży agencji',
    channel: 'linkedin-firma',
    type: 'post',
    status: 'zaplanowany',
    scheduledDate: '2026-04-16',
    scheduledTime: '09:00',
    content: `Agencje które używają AI w sprzedaży mają:
+40% wyższy reply rate
+28% wyższy close rate
-3h oszczędności dziennie

Poniżej infografika pokazująca jak to wygląda w praktyce.`,
    hashtags: ['#AI', '#sprzedaż', '#agencja'],
  },

  // Week 4
  {
    id: 'c14',
    title: 'Newsletter #13 – Narzędzia tygodnia + update systemu',
    channel: 'newsletter',
    type: 'newsletter',
    status: 'zaplanowany',
    scheduledDate: '2026-04-23',
    scheduledTime: '08:00',
    content: `Temat: Update systemu AgencyOS + 3 nowe funkcje w generatorze treści

W tym numerze:
1. Nowe funkcje: repurposing 1→5, scoring v2
2. Narzędzie: Perplexity AI do research
3. Wyniki klientów tego miesiąca
4. Webinar replay link`,
    hashtags: [],
  },
  {
    id: 'c15',
    title: 'IG: "Moje 3 największe błędy jako founderka agencji"',
    channel: 'instagram',
    type: 'karuzela',
    status: 'zaplanowany',
    scheduledDate: '2026-04-22',
    scheduledTime: '10:00',
    content: `Slide 1: 3 błędy które kosztowały mnie 50 000 PLN w pierwszym roku agencji 😬\n\nSlide 2: Błąd #1: Brałam każdego klienta\nBez ICP, bez filtrów. Efekt: chaos, przepracowanie, małe marże.\n\nSlide 3: Błąd #2: Bez systemu\nExcel, notatniki, WhatsApp. Gubiłam leady, zapominałam o follow-upach.\n\nSlide 4: Błąd #3: Za mało w sprzedaż\nByłam "na głowie" klientów zamiast pozyskiwać nowych.\n\nSlide 5: Co zmieniło wszystko:\n→ Jasne ICP\n→ System CRM\n→ Dedykowany czas na sprzedaż codziennie`,
    hashtags: ['#founder', '#agencja', '#błędy', '#lekcje'],
  },
  {
    id: 'c16',
    title: 'Facebook: Post edukacyjny – "Co to jest ICP"',
    channel: 'facebook',
    type: 'post',
    status: 'zaplanowany',
    scheduledDate: '2026-04-21',
    scheduledTime: '12:00',
    content: `ICP = Ideal Customer Profile. Najważniejsza rzecz w agencji marketingowej.

Bez ICP pracujesz dla każdego → zarabiasz mniej niż gdybyś pracował dla nielicznych.

Jak stworzyć ICP w 30 minut → link w komentarzu.`,
    hashtags: ['#ICP', '#agencja', '#marketing'],
  },
  {
    id: 'c17',
    title: 'LinkedIn: "Reply na komentarz viral + nowe obserwujące"',
    channel: 'linkedin-osobisty',
    type: 'post',
    status: 'zaplanowany',
    scheduledDate: '2026-04-24',
    scheduledTime: '08:30',
    content: `Tydzień temu napisałam o 3 pytaniach które zadaję leadom.

Post przeczytało 22 000 osób. Dostałam 47 DM od nowych potencjalnych klientów.

Jeden post. 47 ciepłych leadów.

Wnioski:
→ Content to najlepszy outreach
→ Szczerość i konkret wygrywa z "contentem promocyjnym"
→ Jedna dobra wiadomość > 100 słabych

Jak wy pozyskujecie klientów?`,
    hashtags: ['#linkedin', '#contentmarketing', '#leadgeneration'],
  },
  {
    id: 'c18',
    title: 'IG Reel: "Speed run: wdrożenie agencyOS live"',
    channel: 'instagram',
    type: 'reel',
    status: 'szkic',
    scheduledDate: '2026-04-25',
    scheduledTime: '18:00',
    content: `[Reel 60s] Timelapse wdrożenia systemu: od pustego dashboardu do pierwszego deala w CRM – live screen recording`,
    hashtags: ['#agencja', '#AI', '#behind-the-scenes'],
  },
  {
    id: 'c19',
    title: 'LinkedIn Firma: "Szukamy partnera – program afiliacyjny"',
    channel: 'linkedin-firma',
    type: 'post',
    status: 'zaplanowany',
    scheduledDate: '2026-04-28',
    scheduledTime: '09:00',
    content: `Uruchamiamy program partnerski dla agencji marketingowych.

Polecasz AgencyOS → dostajesz 15% prowizji przez 12 miesięcy.

Pierwsze 10 agencji-partnerów dostaje dodatkowo:
→ Darmowy dostęp do systemu
→ Materiały szkoleniowe
→ Wsparcie w onboardingu klientów

Zainteresowany? Napisz w DM "PARTNER"`,
    hashtags: ['#partnerstwo', '#afiliacja', '#agencja'],
  },
  {
    id: 'c20',
    title: 'FB: "Opinia klienta – TopLine Agency"',
    channel: 'facebook',
    type: 'post',
    status: 'zaplanowany',
    scheduledDate: '2026-04-28',
    scheduledTime: '11:00',
    content: `⭐⭐⭐⭐⭐ Opinia: TopLine Agency\n\n"Wdrożyliśmy AgencyOS w sierpniu. Od tego czasu:\n→ Reply rate wzrósł z 21% do 38%\n→ Oszczędzamy 15h tygodniowo\n→ Przychód wzrósł o 34% w 3 miesiące\n\nNajbardziej polubiłam generator treści i AI scoring leadów. Nareszcie wiemy NA KOGO CZAS poświęcić."\n\n— Karolina D., Founder TopLine Agency`,
    hashtags: ['#opinia', '#casestudy', '#agencja'],
  },
  {
    id: 'c21',
    title: 'IG: Karuzela "Close rate 31% – moja strategia"',
    channel: 'instagram',
    type: 'karuzela',
    status: 'zaplanowany',
    scheduledDate: '2026-04-29',
    scheduledTime: '10:00',
    content: `Slide 1: Jak osiągnęłam 31% close rate w agencji 🎯\n\nSlide 2: Etap 1 – Wstępna kwalifikacja\nAI score >60 → rozmowa wstępna. Poniżej → newsletter.\n\nSlide 3: Etap 2 – Diagnoza nie sprzedaż\n"Powiedz mi o Twoim największym bólu głowy..." – słucham 70% czasu\n\nSlide 4: Etap 3 – Customowa oferta\nNie szablonowa wycena. Oferta portal z Twoim problemem i moim rozwiązaniem.\n\nSlide 5: Efekt: 3 na 10 rozmów = deal ✅`,
    hashtags: ['#sprzedaż', '#closerate', '#agencja'],
  },
  {
    id: 'c22',
    title: 'LinkedIn: Post na koniec miesiąca – learningi',
    channel: 'linkedin-osobisty',
    type: 'post',
    status: 'zaplanowany',
    scheduledDate: '2026-04-30',
    scheduledTime: '08:30',
    content: `Ostatni dzień kwietnia. Czas na learningi.

Co działało:
✅ AI scoring – przestałam tracić czas na cold leady
✅ Generowanie contentu z AI – 25 postów w 3h
✅ Portal klienta – 2 oferty podpisane bez rozmów

Co nie działało:
❌ Zbyt agresywny follow-up (lost 2 deals)
❌ Za dużo formatów jednocześnie

Na maj:
→ Focus na YouTube
→ Nowy szablon oferty premium
→ Webinar live

Do zobaczenia w maju 👋`,
    hashtags: ['#recap', '#learning', '#agencja'],
  },
  {
    id: 'c23',
    title: 'IG: Post motywacyjny "środa"',
    channel: 'instagram',
    type: 'post',
    status: 'do-poprawki',
    scheduledDate: '2026-04-22',
    scheduledTime: '08:00',
    content: `[SZKIC] Coś motywacyjnego o growth mindset w agencji – do dopracowania`,
    hashtags: [],
  },
]

// Generated content examples (for AI Generator page)
export const GENERATED_CAROUSEL = {
  topic: '5 błędów agencji w zarządzaniu leadami',
  segment: 'Agencje marketingowe',
  slides: [
    {
      slide: 1,
      type: 'hook',
      title: '5 błędów które kosztują Twoją agencję tysiące złotych miesięcznie',
      content: 'Każdy popełnia je na początku. Nieliczni je naprawiają. 🔴',
    },
    {
      slide: 2,
      type: 'content',
      title: 'Błąd #1: Brak systemu śledzenia leadów',
      content: 'Większość agencji traci 30-40% leadów bo nie ma gdzie ich zapisać. Excel to nie CRM. Każdy lead który "zgubiłeś" to potencjalnie 10-20 tys. PLN utraconych.',
    },
    {
      slide: 3,
      type: 'content',
      title: 'Błąd #2: Brak follow-upów w odpowiednim momencie',
      content: 'Pierwsze 48h po pierwszym kontakcie to złoty czas. Potem szanse na odpowiedź spadają o 60%. Bez systemu po prostu zapominamy.',
    },
    {
      slide: 4,
      type: 'content',
      title: 'Błąd #3: Zero personalizacji w wiadomościach',
      content: '"Hej, chciałem zapytać..." to przepis na ignorowanie. AI scoring mówi Ci dokładnie CO napisać i KIEDY, żeby dostać odpowiedź.',
    },
    {
      slide: 5,
      type: 'cta',
      title: 'Rozwiązanie: System który robi to za Ciebie ✅',
      content: 'AgencyOS → AI scoring → personalizowane wiadomości → automatyczne follow-upy → więcej zamkniętych dealów, mniej pracy manualnej.\n\nLink w bio 🔗',
    },
  ],
}

export const GENERATED_LINKEDIN = `🚀 Agencja marketingowa zwiększyła reply rate o 40% w 6 tygodni – oto jak

Pracowałam z agencją która wysyłała te same wiadomości outreach do wszystkich leadów.

Efekt? Ignorowanie.

Reply rate: 19%. Czyli 81% pracy szło do kosza.

Po 6 tygodniach z nowym systemem:

📈 Reply rate: 19% → 34%
📈 Umówionych rozmów: 8 → 14 miesięcznie
📈 Przychód z nowych klientów: +28 000 PLN/mc

Co zmieniliśmy?

→ AI scoring który analizuje aktywność online leadów
→ Automatyczne dopasowanie momentu kontaktu
→ Spersonalizowany icebreaker pod każdy segment

Kluczowy insight: nie musisz wysyłać więcej wiadomości.
Musisz wysyłać mądrzej.

Jeden ciepły lead > dziesięć zimnych.

---

Prowadzisz agencję i masz podobny problem?
Napisz "CASE STUDY" w komentarzu → prześlę szczegóły.

#agencjamarketingowa #sprzedaż #AI #outreach #leadgeneration`

export const GENERATED_REPURPOSE_SOURCE = `W tym miesiącu zrobiłam coś czego się bałam – opublikowałam post o tym ile zarabia moja agencja.

Myślałam że będzie hejt. Zamiast tego: 312 polubień, 82 komentarze i 47 nowych zapytań o współpracę w ciągu tygodnia.

Transparentność działa. Szczególnie w branży gdzie wszyscy udają że wszystko gra, a połowa agencji nie wie czy dożyje do końca roku.

Moja agencja: 3 osoby, przychód 28 500 PLN w tym miesiącu, 9 aktywnych klientów. To nie jest korporacja. To jest dobrze poukładany mały biznes który rośnie dzięki systemom i automatyzacji.`

export const GENERATED_REPURPOSE_VERSIONS = [
  {
    format: 'Karuzela Instagram',
    icon: '📸',
    content: `Slide 1: Powiedziałam w internecie ile zarabia moja agencja. Oto co się stało 😱\n\nSlide 2: Spodziewałam się hejtu. Zamiast tego: 312 polubień + 47 nowych zapytań o współpracę.\n\nSlide 3: Transparentność = zaufanie = leady. To matematyka.\n\nSlide 4: Moje liczby: 3 osoby, 28 500 PLN/mc, 9 klientów, 0 nadgodzin\n\nSlide 5: Jak to osiągnęłam? Systemem + automatyzacją. Szczegóły w bio. 🚀`,
  },
  {
    format: 'Post Facebook',
    icon: '📘',
    content: `Opublikowałam post o tym ile zarabia moja agencja i przestałam się bać hejtu.\n\nWynik: 312 polubień, 82 komentarze, 47 nowych zapytań.\n\nCzego się nauczyłam: ludzie wolą szczerość niż "idealny image". W branży gdzie wszyscy udają – bądź sobą. To wyróżnia.\n\nMoje liczby tego miesiąca: 28 500 PLN przychodu, 3 osoby w teamie, 9 klientów.\n\nSzukasz agencji która mówi prosto z mostu? Napisz w DM 👇`,
  },
  {
    format: 'Script do Reela',
    icon: '🎬',
    content: `[0-3s] "Powiedziałam w internecie ile zarabia moja agencja."\n[3-8s] "Spodziewałam się hejtu..." [wyraz twarzy zaskoczenia]\n[8-15s] "Dostałam 47 nowych zapytań o współpracę w tydzień."\n[15-25s] Screen z postem, animacja liczb: 312 ❤️, 82 💬\n[25-35s] "Transparentność buduje zaufanie. Zaufanie buduje biznes."\n[35-40s] "Chcesz wiedzieć jak wygląda moja agencja od środka? Link w bio."`,
  },
  {
    format: 'Script do Story',
    icon: '⭕',
    content: `[Slajd 1] Zrobiłam coś odważnego... 👀\n[Slajd 2] Powiedziałam publicznie ile zarabia moja agencja 💸\n[Slajd 3] Wynik? 47 nowych zapytań w tydzień 🤯\n[Slajd 4] Wniosek: transparentność = leady ✅\n[Slajd 5] SWIPE UP → dowiedz się jak [link]`,
  },
  {
    format: 'Newsletter',
    icon: '📧',
    content: `Temat: Powiedziałam ile zarabiamy – i żałuję że nie zrobiłam tego wcześniej\n\nCześć [imię],\n\nW tym tygodniu zrobiłam coś odważnego. Opublikowałam post z dokładnymi liczbami mojej agencji.\n\nSpodziewałam się hejtu. Dostałam 47 nowych zapytań.\n\nCzego się nauczyłam: transparentność to jedna z najlepszych strategii marketingowych dla małych agencji.\n\nW tym numerze piszę o tym dlaczego i jak to wdrożyć.\n\nDo zobaczenia w środku,\nAnna`,
  },
]
