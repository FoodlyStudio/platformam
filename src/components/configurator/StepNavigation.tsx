"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"

interface StepNavigationProps {
  onNext: () => void
  onBack?: () => void
  nextLabel?: string
  isFirst?: boolean
  isLoading?: boolean
  disabled?: boolean
}

export function StepNavigation({
  onNext,
  onBack,
  nextLabel = "Dalej",
  isFirst = false,
  isLoading = false,
  disabled = false,
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-2xl mx-auto px-5 sm:px-0 py-4">
      {!isFirst ? (
        <motion.button
          type="button"
          onClick={onBack}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-4 py-3.5 min-h-[52px] text-sm text-[#888] hover:text-[#f5f5f5] transition-colors font-body"
        >
          <ArrowLeft size={15} />
          Wstecz
        </motion.button>
      ) : (
        <div />
      )}

      <motion.button
        type="button"
        onClick={onNext}
        disabled={isLoading || disabled}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.97 } : {}}
        className="flex items-center gap-2 px-8 py-3.5 min-h-[52px] bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/20 font-body"
      >
        {isLoading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Wysyłanie...
          </>
        ) : (
          <>
            {nextLabel}
            <ArrowRight size={15} />
          </>
        )}
      </motion.button>
    </div>
  )
}
