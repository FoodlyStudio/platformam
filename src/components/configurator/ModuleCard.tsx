"use client"

import { motion } from "framer-motion"
import { Check, Lock } from "lucide-react"

interface ModuleCardProps {
  icon: string
  title: string
  description: string
  enabled: boolean
  alwaysOn?: boolean
  badge?: string
  badgeColor?: "blue" | "green" | "amber"
  onToggle: () => void
  children?: React.ReactNode
}

const BADGE_STYLES: Record<string, string> = {
  blue: "bg-blue-600/20 text-blue-400 border border-blue-600/30",
  green: "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30",
  amber: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
}

export function ModuleCard({
  icon,
  title,
  description,
  enabled,
  alwaysOn = false,
  badge,
  badgeColor = "blue",
  onToggle,
  children,
}: ModuleCardProps) {
  return (
    <motion.div
      layout
      whileHover={alwaysOn ? {} : { rotateX: -1, rotateY: 1, scale: 1.01 }}
      animate={
        enabled
          ? { borderColor: alwaysOn ? "rgba(37,99,235,0.4)" : "#2563eb" }
          : { borderColor: "#1f1f1f" }
      }
      style={{ transformPerspective: 800 }}
      className={`relative rounded-xl border overflow-hidden transition-shadow ${
        alwaysOn
          ? "bg-blue-600/10 border-blue-600/40 cursor-default"
          : enabled
          ? "bg-[#0d1929] cursor-pointer"
          : "bg-[#111] cursor-pointer hover:border-[#333]"
      } ${enabled && !alwaysOn ? "glow-blue" : ""}`}
      onClick={alwaysOn ? undefined : onToggle}
      whileTap={alwaysOn ? {} : { scale: 0.99 }}
    >
      {badge && (
        <div className="absolute top-3 right-10 z-10">
          <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full font-body ${BADGE_STYLES[badgeColor]}`}>
            {badge}
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <motion.span
            animate={enabled ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl flex-shrink-0 mt-0.5"
          >
            {icon}
          </motion.span>

          <div className="flex-1 min-w-0 pr-8">
            <p className={`text-sm font-semibold leading-snug font-body ${enabled ? "text-white" : "text-[#f5f5f5]"}`}>
              {title}
            </p>
            <p className="text-xs text-[#888] mt-1 leading-relaxed font-body">
              {description}
            </p>
            {children}
          </div>

          <div className="flex-shrink-0 absolute top-4 right-4">
            {alwaysOn ? (
              <div className="w-6 h-6 bg-blue-600/30 rounded-full flex items-center justify-center">
                <Lock size={11} className="text-blue-400" />
              </div>
            ) : (
              <motion.div
                animate={
                  enabled
                    ? { backgroundColor: "#2563eb", borderColor: "#2563eb" }
                    : { backgroundColor: "transparent", borderColor: "#333" }
                }
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
              >
                {enabled && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {enabled && !alwaysOn && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 origin-left"
        />
      )}
    </motion.div>
  )
}
