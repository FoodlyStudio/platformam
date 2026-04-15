"use client"

import { motion } from "framer-motion"

const STEP_NAMES = [
  "Kim jesteś",
  "Co tracisz",
  "Moduły",
  "Personalizacja",
  "Usługi",
  "Wycena",
  "Booking",
]

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100
  const stepName = STEP_NAMES[currentStep - 1] ?? ""

  return (
    <div className="w-full px-5 pt-5 pb-4 sm:px-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#888] tracking-widest uppercase font-body">
            {currentStep}/{totalSteps}
          </span>
          <span className="hidden sm:block text-xs text-[#444] font-body">—</span>
          <span className="hidden sm:block text-xs text-[#888] font-body">{stepName}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:hidden">
          <span className="text-xs text-[#888] font-body">{stepName}</span>
        </div>
        <span className="text-xs text-blue-400 font-semibold font-body tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-px w-full bg-[#1f1f1f] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
