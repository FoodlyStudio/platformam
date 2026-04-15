"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Check, Calendar, Lock } from "lucide-react"
import { formatPrice } from "@/lib/configurator/pricing"
import { COLOR_THEMES } from "@/lib/configurator/types"
import type { ConfiguratorState } from "@/lib/configurator/types"

interface Step6PricingProps {
  state: ConfiguratorState
  onNext: () => void
  onBack: () => void
}

function useCountUp(target: number, duration = 1200, enabled = false) {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled) return
    setValue(0)
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, enabled])

  return value
}

const TIMELINE_STEPS = [
  {
    num: "1",
    title: "Zaliczka 20%",
    desc: "Podpisujemy umowę, startujemy następnego dnia",
  },
  {
    num: "2",
    title: "Prototyp w 3 dni",
    desc: "Dostajesz działający system z Twoimi danymi do testów",
  },
  {
    num: "3",
    title: "Pełne wdrożenie",
    desc: "Budujemy wszystko, szkolimy zespół, wdrażamy",
  },
  {
    num: "4",
    title: "Płatność 80%",
    desc: "Płacisz resztę gdy system działa i jesteś zadowolony",
  },
]

function getActiveModulesList(state: ConfiguratorState) {
  const items: string[] = []
  items.push("CRM + Pipeline")
  if (state.modules.aiScoring) items.push("AI Scoring Leadów")
  if (state.modules.contentGenerator) items.push("Generator Treści AI")
  if (state.modules.financeTracker) items.push("Tracker Finansowy")
  if (state.modules.outreachAutomation) items.push("Automatyzacja Outreachu")
  if (state.modules.clientPortal) items.push("Portal Klienta")
  if (state.modules.offerGenerator) items.push("Generator Ofert AI")
  if (state.modules.aiAssistant.enabled) items.push("AI Asystentka")
  return items
}

const DELIVERY_LABELS: Record<string, string> = {
  web: "Aplikacja webowa",
  mobile: "Aplikacja mobilna iOS + Android",
  both: "Webowa + Mobilna",
}

const SERVICE_LABELS: Record<string, string> = {
  website: "Strona internetowa",
  automations: "Automatyzacje Make.com",
  chatbot: "AI Chatbot",
  migration: "Wdrożenie i migracja danych",
}

export function Step6Pricing({ state, onNext, onBack }: Step6PricingProps) {
  const [started, setStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200)
    return () => clearTimeout(t)
  }, [])

  const setupMin = useCountUp(state.setupPriceMin, 1200, started)
  const monthlyMin = useCountUp(state.monthlyPriceMin, 900, started)
  const monthlyMax = useCountUp(state.monthlyPriceMax, 900, started)

  const activeModules = getActiveModulesList(state)
  const colorTheme = COLOR_THEMES.find((t) => t.id === state.colorTheme)

  const handleNext = async () => {
    setIsLoading(true)
    await onNext()
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-0 w-full max-w-4xl mx-auto px-5 sm:px-0 py-6 pb-24">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 font-body">
          Krok 6 — Twoja inwestycja
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] leading-tight font-heading">
          Twój spersonalizowany system{" "}
          {state.agencyName && (
            <span className="text-blue-400">{state.agencyName}</span>
          )}
        </h1>
        <p className="text-sm text-[#888] mt-2 font-body">
          {activeModules.length} modułów · {DELIVERY_LABELS[state.deliveryFormat] ?? ""}
          {state.additionalServices.length > 0 && ` · ${state.additionalServices.length} usługi dodatkowe`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT - config summary */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-3 font-body">
              Wybrane moduły
            </p>
            <div className="flex flex-col gap-2">
              {activeModules.map((module) => (
                <div key={module} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={8} className="text-blue-400" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-[#f5f5f5] font-body">{module}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4 flex items-center gap-3">
            <span className="text-lg">📱</span>
            <div>
              <p className="text-[11px] font-semibold text-[#888] uppercase tracking-wider font-body">
                Format dostawy
              </p>
              <p className="text-sm text-[#f5f5f5] font-body mt-0.5">
                {DELIVERY_LABELS[state.deliveryFormat] ?? "—"}
              </p>
            </div>
          </div>

          {colorTheme && (
            <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4 flex items-center gap-3">
              <div className="flex gap-1 flex-shrink-0">
                {colorTheme.id === "custom" ? (
                  <div
                    className="w-5 h-5 rounded-full border border-[#333]"
                    style={{ backgroundColor: state.customHex || "#2563eb" }}
                  />
                ) : (
                  <>
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: colorTheme.colors[0] }}
                    />
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: colorTheme.colors[1] }}
                    />
                  </>
                )}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#888] uppercase tracking-wider font-body">
                  Kolorystyka
                </p>
                <p className="text-sm text-[#f5f5f5] font-body mt-0.5">
                  {colorTheme.label}
                  {colorTheme.subtitle && (
                    <span className="text-[#888] ml-1">— {colorTheme.subtitle}</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {state.additionalServices.length > 0 && (
            <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4">
              <p className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-3 font-body">
                Usługi dodatkowe
              </p>
              <div className="flex flex-col gap-2">
                {state.additionalServices.map((svc) => (
                  <div key={svc} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 bg-emerald-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-emerald-400" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-[#f5f5f5] font-body">
                      {SERVICE_LABELS[svc] ?? svc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT - pricing + CTA */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5">
            <p className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2 font-body">
              Twoja inwestycja
            </p>
            <motion.p
              className="text-4xl font-bold text-white font-heading tabular-nums"
              animate={{ opacity: started ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              od {formatPrice(setupMin)}{" "}
              <span className="text-xl text-[#888] font-body font-normal">PLN</span>
            </motion.p>
            <p className="text-sm text-[#888] mt-1 font-body">
              setup jednorazowy
            </p>

            <div className="h-px bg-[#1f1f1f] my-4" />

            <div className="flex items-center justify-between">
              <p className="text-sm text-[#888] font-body">Abonament miesięczny</p>
              <p className="text-base font-semibold text-[#f5f5f5] font-body tabular-nums">
                {formatPrice(monthlyMin)}–{formatPrice(monthlyMax)}{" "}
                <span className="text-[#888] font-normal text-sm">PLN</span>
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-4 font-body">
              Jak wygląda współpraca
            </p>
            <div className="flex flex-col gap-0">
              {TIMELINE_STEPS.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-600/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-blue-400 font-body">{item.num}</span>
                    </div>
                    {i < TIMELINE_STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-[#1f1f1f] my-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-semibold text-[#f5f5f5] font-body">{item.title}</p>
                    <p className="text-xs text-[#888] mt-0.5 font-body">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-1 flex items-center gap-2 bg-emerald-600/10 border border-emerald-600/25 rounded-lg px-3 py-2.5">
              <Lock size={13} className="text-emerald-400 flex-shrink-0" />
              <p className="text-xs font-semibold text-emerald-400 font-body">
                Płacisz 80% dopiero gdy system działa
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2">
            <motion.button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(37, 99, 235, 0.4)",
                  "0 0 0 10px rgba(37, 99, 235, 0)",
                ],
              }}
              transition={{
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeOut" },
              }}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl transition-colors shadow-lg shadow-blue-600/25 min-h-[56px] font-body"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Wysyłanie...
                </span>
              ) : (
                <>
                  <Calendar size={18} />
                  Umów bezpłatną rozmowę konsultacyjną
                </>
              )}
            </motion.button>

            <p className="text-xs text-center text-[#888] font-body">
              Dokładną wycenę omówimy na 30-minutowej rozmowie. Bez zobowiązań.
            </p>

            <div className="flex items-center justify-center">
              <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/25 rounded-full px-3 py-1 font-body">
                Oferta pilotażowa — pierwsze 3 agencje w tym miesiącu
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-[#888] hover:text-[#f5f5f5] transition-colors py-2 font-body"
        >
          ← Wróć
        </button>
      </div>
    </div>
  )
}
