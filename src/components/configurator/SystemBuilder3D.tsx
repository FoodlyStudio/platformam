"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ModulesConfig } from "@/lib/configurator/types"

interface Layer {
  key: string
  label: string
  icon: string
  color: string
  glow: string
}

const ALL_LAYERS: Layer[] = [
  { key: "crm",                label: "CRM + Pipeline",         icon: "🗂️", color: "#1e3a5f", glow: "#2563eb" },
  { key: "aiScoring",          label: "AI Scoring",             icon: "🎯", color: "#1a2d4a", glow: "#3b82f6" },
  { key: "contentGenerator",   label: "Generator Treści",       icon: "✍️", color: "#1e3d2f", glow: "#10b981" },
  { key: "financeTracker",     label: "Tracker Finansowy",      icon: "💰", color: "#2d2a1a", glow: "#f59e0b" },
  { key: "outreachAutomation", label: "Outreach",               icon: "📤", color: "#2d1e1e", glow: "#ef4444" },
  { key: "clientPortal",       label: "Portal Klienta",         icon: "🌐", color: "#1a2d3d", glow: "#06b6d4" },
  { key: "offerGenerator",     label: "Generator Ofert",        icon: "📋", color: "#2a1e3d", glow: "#8b5cf6" },
  { key: "aiAssistant",        label: "AI Asystentka",          icon: "🤖", color: "#3d2a1a", glow: "#f97316" },
]

function isModuleEnabled(modules: ModulesConfig, key: string): boolean {
  if (key === "crm") return modules.crm
  if (key === "aiAssistant") return modules.aiAssistant.enabled
  return modules[key as keyof Omit<ModulesConfig, "crm" | "aiAssistant">] as boolean
}

interface SystemBuilder3DProps {
  modules: ModulesConfig
}

export function SystemBuilder3D({ modules }: SystemBuilder3DProps) {
  const activeLayers = ALL_LAYERS.filter((l) => isModuleEnabled(modules, l.key))
  const count = activeLayers.length

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[11px] font-semibold text-[#888] uppercase tracking-widest font-body">
        Twój system ({count} {count === 1 ? "moduł" : count < 5 ? "moduły" : "modułów"})
      </p>

      {/* 3D stack */}
      <div
        className="relative flex items-end justify-center"
        style={{
          perspective: "600px",
          perspectiveOrigin: "50% 30%",
          height: `${Math.max(120, count * 28 + 60)}px`,
          width: "220px",
        }}
      >
        <AnimatePresence>
          {activeLayers.map((layer, i) => {
            const totalLayers = activeLayers.length
            const fromBottom = totalLayers - 1 - i
            const yOffset = fromBottom * 26
            const zOffset = i * 4
            const xSkew = -1

            return (
              <motion.div
                key={layer.key}
                initial={{ opacity: 0, y: -30, rotateX: 30 }}
                animate={{
                  opacity: 1,
                  y: -yOffset,
                  rotateX: -8,
                  rotateY: xSkew,
                  z: zOffset,
                }}
                exit={{ opacity: 0, y: -30, rotateX: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.03 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "200px",
                  transformStyle: "preserve-3d",
                  transformOrigin: "bottom center",
                }}
              >
                {/* Top face */}
                <div
                  className="relative flex items-center gap-2 px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: layer.color,
                    borderColor: layer.glow + "60",
                    boxShadow: `0 0 12px ${layer.glow}30, inset 0 1px 0 ${layer.glow}20`,
                  }}
                >
                  <span className="text-base leading-none">{layer.icon}</span>
                  <span className="text-xs font-semibold text-white/90 font-body truncate">
                    {layer.label}
                  </span>
                  {/* Glow dot */}
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: layer.glow }}
                  />
                </div>

                {/* Side face (depth illusion) */}
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-b-lg"
                  style={{
                    height: "6px",
                    backgroundColor: layer.glow + "15",
                    borderLeft: `1px solid ${layer.glow}30`,
                    borderRight: `1px solid ${layer.glow}30`,
                    borderBottom: `1px solid ${layer.glow}20`,
                    transform: "translateY(5px) scaleY(0.5)",
                    transformOrigin: "top",
                  }}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Base platform */}
        <motion.div
          animate={{ opacity: count > 0 ? 1 : 0.3 }}
          className="absolute bottom-0 w-[220px] h-2 rounded-lg"
          style={{
            background: "linear-gradient(90deg, #1f1f1f, #2a2a2a, #1f1f1f)",
            boxShadow: count > 0 ? "0 0 20px rgba(37,99,235,0.2)" : "none",
          }}
        />
      </div>

      {/* Empty state */}
      {count === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-[#555] font-body text-center"
        >
          Wybierz moduły żeby zobaczyć system
        </motion.p>
      )}
    </div>
  )
}
