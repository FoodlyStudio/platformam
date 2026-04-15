import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { message: 'Demo mode – AI generation disabled. All content is pre-generated.' },
    { status: 200 }
  )
}

export async function GET() {
  return NextResponse.json(
    { message: 'Demo mode – AI generation disabled.' },
    { status: 200 }
  )
}
