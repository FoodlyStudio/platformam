export type TeamSize = "solo" | "2-5" | "6-15" | "15+"

export type DeliveryFormat = "web" | "mobile" | "both"

export type DashboardLayout = "classic" | "compact" | "analytics"

export interface AIAssistantConfig {
  enabled: boolean
  receptionist: boolean
  alerts: boolean
}

export interface ModulesConfig {
  crm: boolean
  aiScoring: boolean
  contentGenerator: boolean
  financeTracker: boolean
  outreachAutomation: boolean
  clientPortal: boolean
  offerGenerator: boolean
  aiAssistant: AIAssistantConfig
}

export interface ConfiguratorState {
  // Step 1
  firstName: string
  lastName: string
  agencyName: string
  email: string
  phone: string
  teamSize: TeamSize | ""

  // Step 2
  challenges: string[]

  // Step 3
  modules: ModulesConfig
  deliveryFormat: DeliveryFormat | ""

  // Step 4
  colorTheme: string
  customHex: string
  dashboardLayout: DashboardLayout | ""

  // Step 5
  additionalServices: string[]

  // Computed pricing (updated reactively)
  setupPriceMin: number
  setupPriceMax: number
  monthlyPriceMin: number
  monthlyPriceMax: number
}

export const INITIAL_STATE: ConfiguratorState = {
  firstName: "",
  lastName: "",
  agencyName: "",
  email: "",
  phone: "",
  teamSize: "",

  challenges: [],

  modules: {
    crm: true,
    aiScoring: false,
    contentGenerator: false,
    financeTracker: false,
    outreachAutomation: false,
    clientPortal: false,
    offerGenerator: false,
    aiAssistant: {
      enabled: false,
      receptionist: false,
      alerts: false,
    },
  },
  deliveryFormat: "",

  colorTheme: "",
  customHex: "",
  dashboardLayout: "",

  additionalServices: [],

  setupPriceMin: 0,
  setupPriceMax: 0,
  monthlyPriceMin: 0,
  monthlyPriceMax: 0,
}

export interface ChallengeOption {
  id: string
  icon: string
  title: string
  description: string
}

export const CHALLENGES: ChallengeOption[] = [
  {
    id: "leads-chaos",
    icon: "📊",
    title: "Chaos z leadami",
    description: "Nie wiem gdzie są leady, co ustaliliśmy, jaki jest status",
  },
  {
    id: "manual-work",
    icon: "⚙️",
    title: "Ręczna robota zabija czas",
    description: "Raporty, follow-upy, oferty - wszystko ręcznie",
  },
  {
    id: "no-finance",
    icon: "💸",
    title: "Nie wiem ile zarabiam",
    description: "Brak kontroli nad finansami projektów w czasie rzeczywistym",
  },
  {
    id: "leads-escape",
    icon: "🔥",
    title: "Leady mi uciekają",
    description: "Brak scoringu, nie wiem które kontakty są gorące",
  },
  {
    id: "weak-image",
    icon: "🎨",
    title: "Słaby wizerunek wobec klientów",
    description: "Brak profesjonalnego portalu i ofert dla klientów",
  },
  {
    id: "content-time",
    icon: "✍️",
    title: "Tworzenie contentu zajmuje za dużo czasu",
    description: "Posty, artykuły, opisy dla klientów",
  },
  {
    id: "missed-moments",
    icon: "🔔",
    title: "Przegapiam ważne momenty",
    description: "Nie wiem kiedy klient otworzył ofertę, wszedł na stronę",
  },
  {
    id: "no-offers",
    icon: "📄",
    title: "Brak systemu ofertowania",
    description: "Tworzenie ofert trwa za długo i wygląda nieprofesjonalnie",
  },
]

export interface ColorThemeOption {
  id: string
  label: string
  subtitle: string
  colors: string[]
}

export const COLOR_THEMES: ColorThemeOption[] = [
  {
    id: "navy-gold",
    label: "Granat + Złoty",
    subtitle: "Enterprise",
    colors: ["#1a237e", "#ffd700"],
  },
  {
    id: "black-blue",
    label: "Czerń + Niebieski",
    subtitle: "Tech",
    colors: ["#0a0a0a", "#2563eb"],
  },
  {
    id: "white-green",
    label: "Biel + Zielony",
    subtitle: "Fresh",
    colors: ["#ffffff", "#10b981"],
  },
  {
    id: "dark-purple",
    label: "Ciemny + Fioletowy",
    subtitle: "Premium",
    colors: ["#1a1a2e", "#8b5cf6"],
  },
  {
    id: "graphite-orange",
    label: "Grafit + Pomarańczowy",
    subtitle: "Bold",
    colors: ["#374151", "#f97316"],
  },
  {
    id: "black-red",
    label: "Czerń + Czerwony",
    subtitle: "Power",
    colors: ["#0a0a0a", "#ef4444"],
  },
  {
    id: "light-teal",
    label: "Jasny + Turkus",
    subtitle: "Clean",
    colors: ["#f8fafc", "#06b6d4"],
  },
  {
    id: "custom",
    label: "Custom",
    subtitle: "Twój kolor",
    colors: [],
  },
]
