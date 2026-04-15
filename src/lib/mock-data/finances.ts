export interface Income {
  id: string
  client: string
  project: string
  amount: number
  type: 'zaliczka' | 'rata' | 'końcowa' | 'abonament'
  status: 'opłacona' | 'oczekująca' | 'zaległa'
  date: string
  dueDate?: string
}

export interface Expense {
  id: string
  name: string
  category: string
  amount: number
  date: string
  recurring: boolean
}

export interface MonthlyStats {
  month: string
  label: string
  revenue: number
  costs: number
  profit: number
}

export const MOCK_INCOMES: Income[] = [
  {
    id: 'i1',
    client: 'MediaHouse Warsaw',
    project: 'Wdrożenie systemu AgencyOS',
    amount: 7296,
    type: 'zaliczka',
    status: 'opłacona',
    date: '2026-04-05',
  },
  {
    id: 'i2',
    client: 'TopLine Agency',
    project: 'CRM + Generator Treści + Portal',
    amount: 3600,
    type: 'zaliczka',
    status: 'opłacona',
    date: '2026-04-02',
  },
  {
    id: 'i3',
    client: 'Kreacja Premium',
    project: 'Pełne wdrożenie AgencyOS',
    amount: 3600,
    type: 'zaliczka',
    status: 'opłacona',
    date: '2026-03-28',
  },
  {
    id: 'i4',
    client: 'Sigma Marketing',
    project: 'Abonament wsparcia – kwiecień',
    amount: 1500,
    type: 'abonament',
    status: 'opłacona',
    date: '2026-04-01',
  },
  {
    id: 'i5',
    client: 'Nova Agency',
    project: 'Abonament – kwiecień',
    amount: 990,
    type: 'abonament',
    status: 'opłacona',
    date: '2026-04-01',
  },
  {
    id: 'i6',
    client: 'TopLine Agency',
    project: 'CRM + Generator – rata 2',
    amount: 4800,
    type: 'rata',
    status: 'oczekująca',
    date: '2026-04-15',
    dueDate: '2026-04-15',
  },
  {
    id: 'i7',
    client: 'Kreacja Premium',
    project: 'Wdrożenie – rata 2',
    amount: 7200,
    type: 'rata',
    status: 'oczekująca',
    date: '2026-04-20',
    dueDate: '2026-04-20',
  },
  {
    id: 'i8',
    client: 'Atom Creative',
    project: 'Enterprise wdrożenie – zaliczka',
    amount: 4800,
    type: 'zaliczka',
    status: 'oczekująca',
    date: '2026-04-25',
    dueDate: '2026-04-25',
  },
  {
    id: 'i9',
    client: 'Moment Agency',
    project: 'Wdrożenie – zaliczka',
    amount: 3840,
    type: 'zaliczka',
    status: 'oczekująca',
    date: '2026-04-18',
    dueDate: '2026-04-18',
  },
  {
    id: 'i10',
    client: 'ContentFactory',
    project: 'Generator treści – jednorazowo',
    amount: 2160,
    type: 'końcowa',
    status: 'zaległa',
    date: '2026-03-28',
    dueDate: '2026-04-04',
  },
  {
    id: 'i11',
    client: 'Sigma Marketing',
    project: 'Wdrożenie CRM – płatność końcowa',
    amount: 9600,
    type: 'końcowa',
    status: 'opłacona',
    date: '2026-03-20',
  },
  {
    id: 'i12',
    client: 'Nova Agency',
    project: 'CRM podstawowy – płatność końcowa',
    amount: 7680,
    type: 'końcowa',
    status: 'opłacona',
    date: '2026-03-10',
  },
  {
    id: 'i13',
    client: 'EduPro Szkolenia',
    project: 'Konsultacja + mapa systemu',
    amount: 1200,
    type: 'końcowa',
    status: 'opłacona',
    date: '2026-04-06',
  },
  {
    id: 'i14',
    client: 'Rise Digital',
    project: 'Abonament wsparcia – kwiecień',
    amount: 1500,
    type: 'abonament',
    status: 'opłacona',
    date: '2026-04-01',
  },
  {
    id: 'i15',
    client: 'Grow Digital',
    project: 'Wdrożenie – pierwsza transza',
    amount: 5600,
    type: 'rata',
    status: 'oczekująca',
    date: '2026-04-30',
    dueDate: '2026-04-30',
  },
]

export const MOCK_EXPENSES: Expense[] = [
  { id: 'e1',  name: 'Make.com (automatyzacja)',         category: 'Narzędzia AI',      amount: 249,  date: '2026-04-01', recurring: true },
  { id: 'e2',  name: 'OpenAI API',                       category: 'Narzędzia AI',      amount: 380,  date: '2026-04-01', recurring: true },
  { id: 'e3',  name: 'Notion (workspace)',               category: 'Software',          amount: 79,   date: '2026-04-01', recurring: true },
  { id: 'e4',  name: 'Figma (design)',                   category: 'Software',          amount: 149,  date: '2026-04-01', recurring: true },
  { id: 'e5',  name: 'Vercel (hosting)',                  category: 'Hosting',           amount: 115,  date: '2026-04-01', recurring: true },
  { id: 'e6',  name: 'Supabase',                         category: 'Hosting',           amount: 89,   date: '2026-04-01', recurring: true },
  { id: 'e7',  name: 'Biuro rachunkowe',                  category: 'Księgowość',        amount: 450,  date: '2026-04-05', recurring: true },
  { id: 'e8',  name: 'LinkedIn Premium',                  category: 'Marketing',         amount: 219,  date: '2026-04-01', recurring: true },
  { id: 'e9',  name: 'Reklamy Facebook (prospecting)',    category: 'Reklamy',           amount: 2400, date: '2026-04-01', recurring: false },
  { id: 'e10', name: 'Canva Pro',                         category: 'Software',          amount: 79,   date: '2026-04-01', recurring: true },
  { id: 'e11', name: 'Zoom (meetings)',                   category: 'Software',          amount: 69,   date: '2026-04-01', recurring: true },
  { id: 'e12', name: 'Mailerlite (email marketing)',      category: 'Marketing',         amount: 129,  date: '2026-04-01', recurring: true },
  { id: 'e13', name: 'Domena + SSL',                      category: 'Hosting',           amount: 35,   date: '2026-04-01', recurring: true },
  { id: 'e14', name: 'Szkolenie: Prompt Engineering',     category: 'Edukacja',          amount: 497,  date: '2026-04-10', recurring: false },
  { id: 'e15', name: 'Sprzęt: mikrofon do podcastu',     category: 'Sprzęt',            amount: 649,  date: '2026-04-08', recurring: false },
  { id: 'e16', name: 'ChatGPT Plus',                      category: 'Narzędzia AI',      amount: 89,   date: '2026-04-01', recurring: true },
  { id: 'e17', name: 'Stripe (prowizje)',                 category: 'Inne',              amount: 320,  date: '2026-04-01', recurring: true },
  { id: 'e18', name: 'Slack (team)',                      category: 'Software',          amount: 59,   date: '2026-04-01', recurring: true },
]

export const MONTHLY_STATS: MonthlyStats[] = [
  { month: '2025-11', label: 'Lis', revenue: 18000, costs: 7200, profit: 10800 },
  { month: '2025-12', label: 'Gru', revenue: 21000, costs: 7800, profit: 13200 },
  { month: '2026-01', label: 'Sty', revenue: 19400, costs: 8100, profit: 11300 },
  { month: '2026-02', label: 'Lut', revenue: 24200, costs: 7900, profit: 16300 },
  { month: '2026-03', label: 'Mar', revenue: 26500, costs: 8400, profit: 18100 },
  { month: '2026-04', label: 'Kwi', revenue: 28500, costs: 8237, profit: 20263 },
]

export const YEARLY_STATS = [
  { month: '2025-05', label: 'Maj', revenue: 11200, costs: 6500, profit: 4700 },
  { month: '2025-06', label: 'Cze', revenue: 13400, costs: 6800, profit: 6600 },
  { month: '2025-07', label: 'Lip', revenue: 12800, costs: 7000, profit: 5800 },
  { month: '2025-08', label: 'Sie', revenue: 15200, costs: 7100, profit: 8100 },
  { month: '2025-09', label: 'Wrz', revenue: 17600, costs: 7300, profit: 10300 },
  { month: '2025-10', label: 'Paź', revenue: 19100, costs: 7400, profit: 11700 },
  { month: '2025-11', label: 'Lis', revenue: 18000, costs: 7200, profit: 10800 },
  { month: '2025-12', label: 'Gru', revenue: 21000, costs: 7800, profit: 13200 },
  { month: '2026-01', label: 'Sty', revenue: 19400, costs: 8100, profit: 11300 },
  { month: '2026-02', label: 'Lut', revenue: 24200, costs: 7900, profit: 16300 },
  { month: '2026-03', label: 'Mar', revenue: 26500, costs: 8400, profit: 18100 },
  { month: '2026-04', label: 'Kwi', revenue: 28500, costs: 8237, profit: 20263 },
]

export const COST_CATEGORIES = [
  { name: 'Narzędzia AI', value: 718, color: '#6366f1' },
  { name: 'Reklamy', value: 2400, color: '#f59e0b' },
  { name: 'Software', value: 435, color: '#06b6d4' },
  { name: 'Hosting', value: 239, color: '#22c55e' },
  { name: 'Księgowość', value: 450, color: '#a78bfa' },
  { name: 'Marketing', value: 348, color: '#f87171' },
  { name: 'Edukacja', value: 497, color: '#fb923c' },
  { name: 'Inne', value: 400, color: '#94a3b8' },
]
