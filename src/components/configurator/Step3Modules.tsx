"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { ModuleCard } from "./ModuleCard"
import { SystemBuilder3D } from "./SystemBuilder3D"
import { StepNavigation } from "./StepNavigation"
import type { ConfiguratorState, ModulesConfig, DeliveryFormat } from "@/lib/configurator/types"

interface Step3ModulesProps {
  state: ConfiguratorState
  onNext: (patch: Partial<ConfiguratorState>) => void
  onBack: () => void
}

const DELIVERY_OPTIONS = [
  { value: "web" as DeliveryFormat,    label: "Aplikacja webowa",             icon: "💻", description: "Działa w przeglądarce na każdym urządzeniu" },
  { value: "mobile" as DeliveryFormat, label: "Aplikacja mobilna iOS + Android", icon: "📱", description: "Natywna aplikacja na telefon" },
  { value: "both" as DeliveryFormat,   label: "Webowa + Mobilna",             icon: "🌐", description: "Pełny dostęp wszędzie" },
]

export function Step3Modules({ state, onNext, onBack }: Step3ModulesProps) {
  const [modules, setModules] = useState<ModulesConfig>(state.modules)
  const [deliveryFormat, setDeliveryFormat] = useState<DeliveryFormat | "">(state.deliveryFormat)
  const [error, setError] = useState("")

  const toggleModule = (key: keyof Omit<ModulesConfig, "crm" | "aiAssistant">) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleAiAssistant = () => {
    setModules((prev) => ({
      ...prev,
      aiAssistant: {
        ...prev.aiAssistant,
        enabled: !prev.aiAssistant.enabled,
        receptionist: !prev.aiAssistant.enabled ? prev.aiAssistant.receptionist : false,
        alerts: !prev.aiAssistant.enabled ? prev.aiAssistant.alerts : false,
      },
    }))
  }

  const toggleAiFeature = (feature: "receptionist" | "alerts", e: React.MouseEvent) => {
    e.stopPropagation()
    if (!modules.aiAssistant.enabled) return
    setModules((prev) => ({
      ...prev,
      aiAssistant: { ...prev.aiAssistant, [feature]: !prev.aiAssistant[feature] },
    }))
  }

  const handleNext = () => {
    if (!deliveryFormat) {
      setError("Wybierz format dostawy systemu")
      return
    }
    onNext({ modules, deliveryFormat })
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-5 sm:px-0 py-6 pb-24">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 font-body">
          Krok 3 — Twój system
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] leading-tight font-heading">
          Zbuduj swój system
        </h1>
        <p className="text-sm text-[#888] mt-2 font-body">
          Wybierz moduły które chcesz mieć. Możesz zawsze dodać więcej później.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* LEFT — module list */}
        <div className="flex-1 flex flex-col gap-2.5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <ModuleCard icon="🗂️" title="CRM + Pipeline" description="Leady, statusy, historia kontaktu, notatki - wszystko w jednym miejscu" enabled={true} alwaysOn={true} onToggle={() => {}} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <ModuleCard icon="🎯" title="AI Scoring Leadów" description="System automatycznie ocenia które leady są gotowe do zakupu. Oszczędzasz ~6h tygodniowo" enabled={modules.aiScoring} badge="Rekomendowany" badgeColor="blue" onToggle={() => toggleModule("aiScoring")} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <ModuleCard icon="✍️" title="Generator Treści AI" description="Instagram, LinkedIn, artykuły dla klientów - tworzysz content 3x szybciej z AI" enabled={modules.contentGenerator} onToggle={() => toggleModule("contentGenerator")} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <ModuleCard icon="💰" title="Tracker Finansowy" description="Projekty, faktury, marże w czasie rzeczywistym - zawsze wiesz ile zarabiasz" enabled={modules.financeTracker} onToggle={() => toggleModule("financeTracker")} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <ModuleCard icon="📤" title="Automatyzacja Outreachu" description="Sekwencje wiadomości, follow-upy, przypomnienia - działają automatycznie bez Ciebie" enabled={modules.outreachAutomation} onToggle={() => toggleModule("outreachAutomation")} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <ModuleCard icon="🌐" title="Portal Klienta" description="Profesjonalne micro-strony z ofertami i raportami dla Twoich klientów" enabled={modules.clientPortal} onToggle={() => toggleModule("clientPortal")} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ModuleCard icon="📋" title="Generator Ofert AI" description="Gotowa, spersonalizowana oferta handlowa w 3 minuty. Automatycznie z danych w CRM" enabled={modules.offerGenerator} badge="Nowość" badgeColor="green" onToggle={() => toggleModule("offerGenerator")} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <ModuleCard icon="🤖" title="AI Asystentka" description="" enabled={modules.aiAssistant.enabled} badge="Killer Feature" badgeColor="amber" onToggle={toggleAiAssistant}>
              <div className="mt-1.5 space-y-0.5">
                <p className="text-xs text-[#888] font-body leading-relaxed">
                  <span className="text-[#aaa]">Receptionist AI:</span> odbiera telefony, kwalifikuje leady głosowo, zapisuje do CRM
                </p>
                <p className="text-xs text-[#888] font-body leading-relaxed">
                  <span className="text-[#aaa]">Alert AI:</span> dzwoni lub wysyła SMS gdy lead otworzył ofertę, nowy lead wpadł, coś wymaga uwagi
                </p>
              </div>
              {modules.aiAssistant.enabled && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                  <button type="button" onClick={(e) => toggleAiFeature("receptionist", e)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all font-body ${modules.aiAssistant.receptionist ? "bg-blue-600/20 border-blue-600/50 text-blue-400" : "bg-[#1a1a1a] border-[#333] text-[#888]"}`}>
                    {modules.aiAssistant.receptionist && <Check size={10} strokeWidth={3} />}
                    Receptionist
                  </button>
                  <button type="button" onClick={(e) => toggleAiFeature("alerts", e)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all font-body ${modules.aiAssistant.alerts ? "bg-blue-600/20 border-blue-600/50 text-blue-400" : "bg-[#1a1a1a] border-[#333] text-[#888]"}`}>
                    {modules.aiAssistant.alerts && <Check size={10} strokeWidth={3} />}
                    Alerty głosowe
                  </button>
                </motion.div>
              )}
            </ModuleCard>
          </motion.div>
        </div>

        {/* RIGHT — 3D system preview (sticky on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:sticky lg:top-6 w-full lg:w-[260px] flex-shrink-0"
        >
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <SystemBuilder3D modules={modules} />

            {/* Delivery format inside the preview panel */}
            <div className="mt-5 pt-4 border-t border-[#1f1f1f]">
              <p className="text-[11px] font-semibold text-[#888] uppercase tracking-widest mb-3 font-body">
                Format
              </p>
              <div className="flex flex-col gap-1.5">
                {DELIVERY_OPTIONS.map((opt) => {
                  const isSelected = deliveryFormat === opt.value
                  return (
                    <motion.button
                      key={opt.value}
                      type="button"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setDeliveryFormat(opt.value); setError("") }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs transition-all flex items-center gap-2 ${
                        isSelected
                          ? "bg-blue-600/15 border-blue-600/60 text-white"
                          : "bg-[#0d0d0d] border-[#1f1f1f] text-[#888] hover:border-[#333]"
                      }`}
                    >
                      <span>{opt.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold font-body truncate ${isSelected ? "text-white" : "text-[#ccc]"}`}>{opt.label}</p>
                        <p className="text-[#666] font-body truncate">{opt.description}</p>
                      </div>
                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={8} className="text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
              {error && <p className="text-xs text-red-400 mt-2 font-body">{error}</p>}
            </div>
          </div>
        </motion.div>
      </div>

      <StepNavigation onNext={handleNext} onBack={onBack} />
    </div>
  )
}
