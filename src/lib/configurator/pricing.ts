import type { ConfiguratorState, ModulesConfig } from "./types"

export const BASE_SETUP = 4500

export const MODULES_PRICE: Record<string, number> = {
  aiScoring: 800,
  contentGenerator: 700,
  financeTracker: 500,
  outreachAutomation: 1000,
  clientPortal: 800,
  offerGenerator: 1000,
  aiAssistant: 2000,
}

export const DELIVERY_FORMAT_PRICE: Record<string, number> = {
  web: 0,
  mobile: 7000,
  both: 8500,
}

export const ADDITIONAL_SERVICES_PRICE: Record<string, { min: number; max: number }> = {
  website: { min: 3000, max: 8000 },
  automations: { min: 2000, max: 5000 },
  chatbot: { min: 1500, max: 3000 },
  migration: { min: 1000, max: 2500 },
}

export const MONTHLY_BASE = 800
export const MONTHLY_PER_MODULE = 100
export const MONTHLY_MAX = 2000

export function countActiveModules(modules: ModulesConfig): number {
  let count = 0
  if (modules.crm) count++
  if (modules.aiScoring) count++
  if (modules.contentGenerator) count++
  if (modules.financeTracker) count++
  if (modules.outreachAutomation) count++
  if (modules.clientPortal) count++
  if (modules.offerGenerator) count++
  if (modules.aiAssistant.enabled) count++
  return count
}

export function calculatePricing(state: ConfiguratorState): {
  setupMin: number
  setupMax: number
  monthlyMin: number
  monthlyMax: number
} {
  let modulesTotal = 0
  if (state.modules.aiScoring) modulesTotal += MODULES_PRICE.aiScoring
  if (state.modules.contentGenerator) modulesTotal += MODULES_PRICE.contentGenerator
  if (state.modules.financeTracker) modulesTotal += MODULES_PRICE.financeTracker
  if (state.modules.outreachAutomation) modulesTotal += MODULES_PRICE.outreachAutomation
  if (state.modules.clientPortal) modulesTotal += MODULES_PRICE.clientPortal
  if (state.modules.offerGenerator) modulesTotal += MODULES_PRICE.offerGenerator
  if (state.modules.aiAssistant.enabled) modulesTotal += MODULES_PRICE.aiAssistant

  const deliveryExtra = DELIVERY_FORMAT_PRICE[state.deliveryFormat] ?? 0

  let additionalServicesMin = 0
  let additionalServicesMax = 0
  for (const svc of state.additionalServices) {
    const price = ADDITIONAL_SERVICES_PRICE[svc]
    if (price) {
      additionalServicesMin += price.min
      additionalServicesMax += price.max
    }
  }

  const setupMin = BASE_SETUP + modulesTotal + deliveryExtra + additionalServicesMin
  const setupMax = Math.round((BASE_SETUP + modulesTotal + deliveryExtra) * 1.6) + additionalServicesMax

  const activeModules = countActiveModules(state.modules)
  const monthlyMin = MONTHLY_BASE + (activeModules - 1) * MONTHLY_PER_MODULE
  const monthlyMax = Math.min(MONTHLY_MAX, monthlyMin + 400)

  return { setupMin, setupMax, monthlyMin, monthlyMax }
}

export function formatPrice(price: number): string {
  return price.toLocaleString("pl-PL")
}
