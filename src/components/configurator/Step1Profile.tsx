"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/Input"
import { StepNavigation } from "./StepNavigation"
import type { ConfiguratorState, TeamSize } from "@/lib/configurator/types"

const TEAM_SIZES: { value: TeamSize; label: string }[] = [
  { value: "solo", label: "Tylko ja" },
  { value: "2-5", label: "2–5 osób" },
  { value: "6-15", label: "6–15 osób" },
  { value: "15+", label: "15+ osób" },
]

interface Step1ProfileProps {
  state: ConfiguratorState
  onNext: (patch: Partial<ConfiguratorState>) => void
}

export function Step1Profile({ state, onNext }: Step1ProfileProps) {
  const [firstName, setFirstName] = useState(state.firstName)
  const [lastName, setLastName] = useState(state.lastName)
  const [agencyName, setAgencyName] = useState(state.agencyName)
  const [email, setEmail] = useState(state.email)
  const [phone, setPhone] = useState(state.phone)
  const [teamSize, setTeamSize] = useState<TeamSize | "">(state.teamSize)

  const handleNext = () => {
    onNext({ firstName, lastName, agencyName, email, phone, teamSize })
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto px-5 sm:px-0 py-6 pb-24">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 font-body">
          Krok 1 — Twoja agencja
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] leading-tight font-heading">
          Zacznijmy od Twojej agencji
        </h1>
        <p className="text-sm text-[#888] mt-2 font-body">
          Kilka podstawowych informacji żebyśmy mogli spersonalizować system
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-[#888] uppercase tracking-wider font-body">
              Imię
            </label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jan"
              className="bg-[#111] border-[#1f1f1f] text-[#f5f5f5] placeholder:text-[#444] focus:border-blue-600 focus:ring-0 min-h-[52px] text-sm rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-[#888] uppercase tracking-wider font-body">
              Nazwisko
            </label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Kowalski"
              className="bg-[#111] border-[#1f1f1f] text-[#f5f5f5] placeholder:text-[#444] focus:border-blue-600 focus:ring-0 min-h-[52px] text-sm rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-[#888] uppercase tracking-wider font-body">
            Nazwa agencji
          </label>
          <Input
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            placeholder="Agencja XYZ"
            className="bg-[#111] border-[#1f1f1f] text-[#f5f5f5] placeholder:text-[#444] focus:border-blue-600 focus:ring-0 min-h-[52px] text-sm rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-[#888] uppercase tracking-wider font-body">
            Email służbowy
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="jan@agencja.pl"
            className="bg-[#111] border-[#1f1f1f] text-[#f5f5f5] placeholder:text-[#444] focus:border-blue-600 focus:ring-0 min-h-[52px] text-sm rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-[#888] uppercase tracking-wider font-body">
            Numer telefonu{" "}
            <span className="text-[#555] normal-case font-normal">(opcjonalny)</span>
          </label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="+48 500 000 000"
            className="bg-[#111] border-[#1f1f1f] text-[#f5f5f5] placeholder:text-[#444] focus:border-blue-600 focus:ring-0 min-h-[52px] text-sm rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold text-[#888] uppercase tracking-wider font-body">
            Wielkość zespołu
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TEAM_SIZES.map((size) => (
              <motion.button
                key={size.value}
                type="button"
                onClick={() => setTeamSize(size.value)}
                whileTap={{ scale: 0.97 }}
                className={`py-3.5 px-4 rounded-xl border text-sm font-medium transition-all min-h-[52px] font-body ${
                  teamSize === size.value
                    ? "bg-blue-600/15 border-blue-600 text-white glow-blue"
                    : "bg-[#111] border-[#1f1f1f] text-[#888] hover:border-[#333] hover:text-[#f5f5f5]"
                }`}
              >
                {size.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <StepNavigation onNext={handleNext} isFirst />
    </div>
  )
}
