"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { StepNavigation } from "./StepNavigation"
import { COLOR_THEMES } from "@/lib/configurator/types"
import type { ConfiguratorState, DashboardLayout } from "@/lib/configurator/types"

interface Step4PersonalizationProps {
  state: ConfiguratorState
  onNext: (patch: Partial<ConfiguratorState>) => void
  onBack: () => void
}

type LayoutOption = {
  value: DashboardLayout
  label: string
  description: string
}

const LAYOUT_OPTIONS: LayoutOption[] = [
  {
    value: "classic",
    label: "Klasyczny",
    description: "Sidebar po lewej, główna treść po prawej",
  },
  {
    value: "compact",
    label: "Kompaktowy",
    description: "Top navigation, dense layout",
  },
  {
    value: "analytics",
    label: "Analityczny",
    description: "Duże wykresy na górze, tabele na dole",
  },
]

function ClassicLayoutSVG({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 80 56" fill="none" className="w-full h-full">
      <rect width="80" height="56" rx="4" fill={active ? "#0d1929" : "#111"} />
      <rect x="2" y="2" width="18" height="52" rx="2" fill={active ? "#1e3a5f" : "#1a1a1a"} />
      <rect x="24" y="2" width="54" height="8" rx="2" fill={active ? "#1e3a5f" : "#1a1a1a"} />
      <rect x="24" y="14" width="25" height="18" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
      <rect x="53" y="14" width="25" height="18" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
      <rect x="24" y="36" width="54" height="18" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
    </svg>
  )
}

function CompactLayoutSVG({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 80 56" fill="none" className="w-full h-full">
      <rect width="80" height="56" rx="4" fill={active ? "#0d1929" : "#111"} />
      <rect x="2" y="2" width="76" height="8" rx="2" fill={active ? "#1e3a5f" : "#1a1a1a"} />
      <rect x="2" y="14" width="36" height="10" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
      <rect x="42" y="14" width="36" height="10" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
      <rect x="2" y="28" width="24" height="8" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
      <rect x="30" y="28" width="24" height="8" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
      <rect x="58" y="28" width="20" height="8" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
      <rect x="2" y="40" width="76" height="14" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
    </svg>
  )
}

function AnalyticsLayoutSVG({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 80 56" fill="none" className="w-full h-full">
      <rect width="80" height="56" rx="4" fill={active ? "#0d1929" : "#111"} />
      <rect x="2" y="2" width="76" height="22" rx="2" fill={active ? "#1e3a5f" : "#1a1a1a"} />
      <rect x="5" y="10" width="4" height="10" rx="1" fill={active ? "#2563eb" : "#333"} />
      <rect x="12" y="7" width="4" height="13" rx="1" fill={active ? "#2563eb" : "#333"} />
      <rect x="19" y="13" width="4" height="7" rx="1" fill={active ? "#2563eb" : "#333"} />
      <rect x="26" y="8" width="4" height="12" rx="1" fill={active ? "#2563eb" : "#333"} />
      <rect x="33" y="5" width="4" height="15" rx="1" fill={active ? "#2563eb" : "#333"} />
      <rect x="2" y="28" width="37" height="10" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
      <rect x="43" y="28" width="35" height="10" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
      <rect x="2" y="42" width="76" height="12" rx="2" fill={active ? "#1a2d4a" : "#161616"} />
    </svg>
  )
}

const LAYOUT_PREVIEWS = {
  classic: ClassicLayoutSVG,
  compact: CompactLayoutSVG,
  analytics: AnalyticsLayoutSVG,
}

export function Step4Personalization({ state, onNext, onBack }: Step4PersonalizationProps) {
  const [colorTheme, setColorTheme] = useState(state.colorTheme)
  const [customHex, setCustomHex] = useState(state.customHex || "#2563eb")
  const [dashboardLayout, setDashboardLayout] = useState<DashboardLayout | "">(state.dashboardLayout)
  const [errors, setErrors] = useState<{ color?: string; layout?: string }>({})

  const handleNext = () => {
    const newErrors: typeof errors = {}
    if (!colorTheme) newErrors.color = "Wybierz motyw kolorystyczny"
    if (!dashboardLayout) newErrors.layout = "Wybierz układ dashboardu"
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onNext({
      colorTheme,
      customHex: colorTheme === "custom" ? customHex : "",
      dashboardLayout: dashboardLayout as DashboardLayout,
    })
  }

  return (
    <div className="flex flex-col gap-7 w-full max-w-2xl mx-auto px-5 sm:px-0 py-6 pb-24">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 font-body">
          Krok 4 — Personalizacja
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] leading-tight font-heading">
          Jak ma wyglądać Twój system?
        </h1>
        <p className="text-sm text-[#888] mt-2 font-body">
          Twój system będzie miał Twoje logo, nazwę i kolory
        </p>
      </div>

      {/* Color themes */}
      <div>
        <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3 font-body">
          Motyw kolorystyczny
        </p>
        <div className="grid grid-cols-4 gap-2">
          {COLOR_THEMES.map((theme, i) => {
            const isSelected = colorTheme === theme.id
            return (
              <motion.button
                key={theme.id}
                type="button"
                onClick={() => { setColorTheme(theme.id); setErrors((e) => ({ ...e, color: undefined })) }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all min-h-[80px] ${
                  isSelected
                    ? "bg-[#0d1929] border-blue-600 glow-blue"
                    : "bg-[#111] border-[#1f1f1f] hover:border-[#333]"
                }`}
              >
                {theme.id === "custom" ? (
                  <div
                    className="w-9 h-9 rounded-full border-2 border-dashed border-[#444] flex items-center justify-center text-base"
                    style={{ backgroundColor: customHex + "20" }}
                  >
                    ✏️
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-9 rounded-full"
                      style={{ backgroundColor: theme.colors[0] }}
                    />
                    <div
                      className="w-4 h-9 rounded-full"
                      style={{ backgroundColor: theme.colors[1] }}
                    />
                  </div>
                )}
                <p className={`text-[10px] font-semibold text-center leading-tight font-body ${isSelected ? "text-blue-300" : "text-[#888]"}`}>
                  {theme.subtitle}
                </p>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center"
                  >
                    <Check size={8} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>

        {colorTheme === "custom" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 flex items-center gap-3"
          >
            <input
              type="color"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              className="w-12 h-10 rounded-lg border border-[#1f1f1f] bg-[#111] cursor-pointer"
            />
            <input
              type="text"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              placeholder="#2563EB"
              maxLength={7}
              className="flex-1 bg-[#111] border border-[#1f1f1f] text-[#f5f5f5] text-sm rounded-xl px-3 py-2.5 font-mono focus:outline-none focus:border-blue-600"
            />
          </motion.div>
        )}

        {errors.color && (
          <p className="text-xs text-red-400 mt-2 font-body">{errors.color}</p>
        )}
      </div>

      {/* Dashboard layout */}
      <div>
        <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3 font-body">
          Układ dashboardu
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {LAYOUT_OPTIONS.map((opt, i) => {
            const isSelected = dashboardLayout === opt.value
            const SVGPreview = LAYOUT_PREVIEWS[opt.value]
            return (
              <motion.button
                key={opt.value}
                type="button"
                onClick={() => { setDashboardLayout(opt.value); setErrors((e) => ({ ...e, layout: undefined })) }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col gap-2 p-3 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-[#0d1929] border-blue-600 glow-blue"
                    : "bg-[#111] border-[#1f1f1f] hover:border-[#333]"
                }`}
              >
                <div className="w-full aspect-[80/56] rounded-lg overflow-hidden">
                  <SVGPreview active={isSelected} />
                </div>
                <div>
                  <p className={`text-xs font-semibold font-body ${isSelected ? "text-white" : "text-[#f5f5f5]"}`}>
                    {opt.label}
                  </p>
                  <p className="text-[10px] text-[#888] mt-0.5 font-body leading-tight">
                    {opt.description}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
        {errors.layout && (
          <p className="text-xs text-red-400 mt-2 font-body">{errors.layout}</p>
        )}
      </div>

      <StepNavigation onNext={handleNext} onBack={onBack} />
    </div>
  )
}
