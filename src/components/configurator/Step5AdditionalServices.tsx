"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { StepNavigation } from "./StepNavigation"
import type { ConfiguratorState } from "@/lib/configurator/types"

interface Step5AdditionalServicesProps {
  state: ConfiguratorState
  onNext: (patch: Partial<ConfiguratorState>) => void
  onBack: () => void
}

const SERVICES = [
  {
    id: "website",
    icon: "🌐",
    title: "Strona internetowa która generuje leady",
    description:
      "Zaprojektowana pod konwersję. Zintegrowana natywnie z Twoim systemem AM Platform. Leady ze strony trafiają automatycznie do CRM.",
  },
  {
    id: "automations",
    icon: "⚙️",
    title: "Automatyzacje Make.com",
    description:
      "Połączymy Twój system z narzędziami których już używasz - Facebook Ads, Google, email, booking, faktury",
  },
  {
    id: "chatbot",
    icon: "💬",
    title: "AI Chatbot na stronę",
    description:
      "Bot który kwalifikuje odwiedzających 24/7 i wrzuca leady prosto do Twojego CRM",
  },
  {
    id: "migration",
    icon: "📦",
    title: "Wdrożenie i migracja danych",
    description:
      "Przeniesiemy Twoje dane z Excela, starego CRM lub arkuszy. Wdrożymy i przeszkoli cały zespół",
  },
]

export function Step5AdditionalServices({ state, onNext, onBack }: Step5AdditionalServicesProps) {
  const [selected, setSelected] = useState<string[]>(state.additionalServices)

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const handleNext = () => {
    onNext({ additionalServices: selected })
  }

  const handleSkip = () => {
    onNext({ additionalServices: [] })
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto px-5 sm:px-0 py-6 pb-24">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 font-body">
          Krok 5 — Usługi dodatkowe
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] leading-tight font-heading">
          Czy chcesz żebyśmy zadbali też o:
        </h1>
        <p className="text-sm text-[#888] mt-2 font-body">
          Możesz pominąć ten krok — wrócimy do tego na rozmowie
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {SERVICES.map((service, i) => {
          const isSelected = selected.includes(service.id)
          return (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => toggle(service.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.99 }}
              className={`relative w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#0d1929] border-blue-600 glow-blue"
                  : "bg-[#111] border-[#1f1f1f] hover:border-[#333]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 mt-0.5">{service.icon}</span>
                <div className="flex-1 min-w-0 pr-8">
                  <p
                    className={`text-sm font-semibold leading-snug font-body ${
                      isSelected ? "text-white" : "text-[#f5f5f5]"
                    }`}
                  >
                    {service.title}
                  </p>
                  <p className="text-xs text-[#888] mt-1 leading-relaxed font-body">
                    {service.description}
                  </p>
                </div>
                <motion.div
                  animate={
                    isSelected
                      ? { backgroundColor: "#2563eb", borderColor: "#2563eb" }
                      : { backgroundColor: "transparent", borderColor: "#333" }
                  }
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <Check size={11} className="text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="flex items-center gap-1.5 text-sm text-[#888] hover:text-[#f5f5f5] transition-colors self-center py-2 font-body"
      >
        Pomiń ten krok
        <ArrowRight size={14} />
      </button>

      <StepNavigation
        onNext={handleNext}
        onBack={onBack}
        nextLabel={selected.length > 0 ? `Dalej (${selected.length} wybrane)` : "Dalej"}
      />
    </div>
  )
}
