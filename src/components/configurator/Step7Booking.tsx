"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, CheckCircle, ArrowDown } from "lucide-react"
import type { ConfiguratorState } from "@/lib/configurator/types"

const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/your-link/30min"
const LOOM_URL = process.env.NEXT_PUBLIC_LOOM_URL || "LOOM_VIDEO_URL"

interface Step7BookingProps {
  state: ConfiguratorState
}

export function Step7Booking({ state }: Step7BookingProps) {
  const [videoOpen, setVideoOpen] = useState(false)

  const firstName = state.firstName || "Hej"

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto px-5 sm:px-0 py-6 pb-16">
      {/* Confirmation badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="flex items-center gap-3 bg-emerald-600/10 border border-emerald-600/25 rounded-xl p-4"
      >
        <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-400 font-body">
            Konfiguracja zapisana, {firstName}!
          </p>
          <p className="text-xs text-[#888] mt-0.5 font-body">
            Wyślemy podsumowanie na {state.email}
          </p>
        </div>
      </motion.div>

      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 font-body">
          Krok 7 — Demo + Booking
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] leading-tight font-heading">
          Ostatni krok — wybierz termin rozmowy
        </h1>
      </div>

      {/* Video section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden"
      >
        <div className="p-5">
          <p className="text-sm text-[#888] mb-1 font-body">
            Zanim wybierzesz termin — obejrzyj 15-minutowe demo systemu
          </p>
          <p className="text-xs text-[#555] font-body">
            Zobaczysz dokładnie jak działa to co wybrałeś. Rozmowa będzie wtedy konkretna i wartościowa.
          </p>
        </div>

        {videoOpen ? (
          <div className="aspect-video w-full bg-[#0a0a0a]">
            <iframe
              src={LOOM_URL}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              title="Demo AM Platform"
            />
          </div>
        ) : (
          <div className="relative aspect-video bg-gradient-to-br from-[#0d1929] to-[#080808] flex items-center justify-center cursor-pointer group" onClick={() => setVideoOpen(true)}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-full bg-[#1f1f1f] opacity-30 absolute left-1/4" />
              <div className="w-px h-full bg-[#1f1f1f] opacity-30 absolute left-1/2" />
              <div className="w-px h-full bg-[#1f1f1f] opacity-30 absolute left-3/4" />
            </div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 group-hover:bg-blue-500 transition-colors">
                <Play size={24} className="text-white ml-1" fill="white" />
              </div>
              <span className="text-sm font-semibold text-[#f5f5f5] font-body">
                Obejrzyj demo (15 min)
              </span>
            </motion.button>
          </div>
        )}

        <div className="px-5 py-3 border-t border-[#1f1f1f]">
          <button
            type="button"
            onClick={() => document.getElementById("cal-booking")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-1.5 text-xs text-[#888] hover:text-[#f5f5f5] transition-colors font-body"
          >
            Pomiń, chcę od razu wybrać termin
            <ArrowDown size={12} />
          </button>
        </div>
      </motion.div>

      {/* Booking section */}
      <motion.div
        id="cal-booking"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="rounded-xl overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a]">
          <iframe
            src={CAL_URL}
            width="100%"
            height="600"
            frameBorder="0"
            title="Umów rozmowę z AM Automations"
            className="block"
            style={{ colorScheme: "dark" }}
          />
        </div>

        <p className="text-xs text-center text-[#888] mt-3 font-body">
          Rozmowa trwa 30 minut. Odpiszę potwierdzenie w ciągu godziny.
        </p>
      </motion.div>
    </div>
  )
}
