'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type BrandTheme = 'default' | 'mediovee'

interface BrandThemeContextValue {
  brandTheme: BrandTheme
  setBrandTheme: (t: BrandTheme) => void
}

const BrandThemeContext = createContext<BrandThemeContextValue>({
  brandTheme: 'default',
  setBrandTheme: () => {},
})

export function BrandThemeProvider({ children }: { children: React.ReactNode }) {
  const [brandTheme, setBrandThemeState] = useState<BrandTheme>('default')

  useEffect(() => {
    const saved = localStorage.getItem('brand-theme') as BrandTheme | null
    if (saved === 'mediovee') {
      setBrandThemeState('mediovee')
      document.documentElement.classList.add('theme-mediovee')
    }
  }, [])

  const setBrandTheme = (t: BrandTheme) => {
    setBrandThemeState(t)
    localStorage.setItem('brand-theme', t)
    if (t === 'mediovee') {
      document.documentElement.classList.add('theme-mediovee')
    } else {
      document.documentElement.classList.remove('theme-mediovee')
    }
  }

  return (
    <BrandThemeContext.Provider value={{ brandTheme, setBrandTheme }}>
      {children}
    </BrandThemeContext.Provider>
  )
}

export function useBrandTheme() {
  return useContext(BrandThemeContext)
}
