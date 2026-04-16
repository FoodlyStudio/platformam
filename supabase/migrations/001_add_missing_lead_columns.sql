-- Migration 001: Add missing columns to leads table
-- Fixes: lead insert was failing due to missing columns, causing silent data loss

-- Dodatkowe kolumny kontaktowe
ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS instagram_url TEXT;

-- Data ostatniego kontaktu
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_contact DATE DEFAULT CURRENT_DATE;

-- Dane skanowania / notatki dodatkowe
ALTER TABLE leads ADD COLUMN IF NOT EXISTS scan_data TEXT;

-- Historia outreachu (tablica JSON)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS outreach_history JSONB DEFAULT '[]';

-- AI score jako liczba 1-100 (zamiast 1-10) i etykieta tekstowa
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ai_score_num INTEGER DEFAULT 50;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ai_score_label TEXT DEFAULT 'warm' CHECK (ai_score_label IN ('hot', 'warm', 'cold'));

-- Status aplikacyjny (polskie wartości używane w UI)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS app_status TEXT DEFAULT 'nowy' CHECK (app_status IN (
  'nowy', 'kontakt', 'zainteresowany', 'pipeline', 'nieaktywny'
));
