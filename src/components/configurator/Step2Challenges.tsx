"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { StepNavigation } from "./StepNavigation"
import { CHALLENGES } from "@/lib/configurator/types"
import type { ConfiguratorState } from "@/lib/configurator/types"

interface Step2ChallengesProps {
  state: ConfiguratorState
  onNext: (patch: Partial<ConfiguratorState>) => void
  onBack: () => void
}

export function Step2Challenges({ state, onNext, onBack }: Step2ChallengesProps) {
  const [selected, setSelected] = useState<string[]>(state.challenges)
  const [error, setError] = useState("")

  const toggle = (id: string) => {
    setError("")
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const handleNext = () => {
    if (selected.length === 0) {
      setError("Zaznacz przynajmniej jedno wyzwanie")
      return
    }
    onNext({ challenges: selected })
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto px-5 sm:px-0 py-6 pb-24">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 font-body">
          Krok 2 — Twoje wyzwania
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] leading-tight font-heading">
          Co najbardziej boli w codziennej pracy?
        </h1>
        <p className="text-sm text-[#888] mt-2 font-body">
          Zaznacz wszystko co dotyczy Twojej agencji (min. 1)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {CHALLENGES.map((challenge, i) => {
          const isSelected = selected.includes(challenge.id)
          return (
            <motion.button
              key={challenge.id}
              type="button"
              onClick={() => toggle(challenge.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileTap={{ scale: 0.98 }}
              className={`relative w-full text-left p-4 rounded-xl border transition-all cursor-pointer min-h-[80px] ${
                isSelected
                  ? "bg-blue-600/10 border-blue-600 glow-blue"
                  : "bg-[#111] border-[#1f1f1f] hover:border-[#333]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{challenge.icon}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold leading-snug font-body ${
                      isSelected ? "text-white" : "text-[#f5f5f5]"
                    }`}
                  >
                    {challenge.title}
                  </p>
                  <p className="text-xs text-[#888] mt-0.5 leading-relaxed font-body">
                    {challenge.description}
                  </p>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-0.5"
                  >
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {error && (
        <p className="text-xs text-red-400 font-body">{error}</p>
      )}

      <StepNavigation onNext={handleNext} onBack={onBack} />
    </div>
  )
}
