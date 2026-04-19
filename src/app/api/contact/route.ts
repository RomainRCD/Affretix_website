import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Required fields that must be non-empty strings
const REQUIRED = ['nom', 'telephone', 'email', 'description'] as const

interface ContactPayload {
  nom: string
  entreprise?: string
  telephone: string
  email: string
  machine?: string
  duree?: string
  lieu?: string
  description: string
}

function buildEmailHtml(data: ContactPayload): string {
  const row = (label: string, value: string | undefined) =>
    value
      ? `<tr>
           <td style="padding:8px 12px;font-weight:600;color:#353335;background:#f5f5f5;border:1px solid #e0e0e0;white-space:nowrap;">${label}</td>
           <td style="padding:8px 12px;color:#353335;border:1px solid #e0e0e0;">${value}</td>
         </tr>`
      : ''

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Demande de devis Affretix</title></head>
<body style="font-family:'DM Sans',Arial,sans-serif;background:#f9f9f9;margin:0;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e0e0e0;">
    <!-- Header -->
    <div style="background:#353335;padding:24px 32px;">
      <h1 style="margin:0;font-family:Arial,sans-serif;font-size:22px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:2px;">
        Nouvelle demande de devis
      </h1>
      <p style="margin:6px 0 0;color:#F58634;font-size:13px;text-transform:uppercase;letter-spacing:1px;">
        Affretix — Location de matériel BTP avec opérateur
      </p>
    </div>
    <!-- Table -->
    <div style="padding:24px 32px;">
      <table style="border-collapse:collapse;width:100%;">
        <tbody>
          ${row('Nom', data.nom)}
          ${row('Entreprise', data.entreprise)}
          ${row('Téléphone', data.telephone)}
          ${row('Email', data.email)}
          ${row('Type de machine', data.machine)}
          ${row('Durée estimée', data.duree)}
          ${row('Lieu de chantier', data.lieu)}
          ${row('Description des travaux', data.description?.replace(/\n/g, '<br />'))}
        </tbody>
      </table>
    </div>
    <!-- Footer -->
    <div style="padding:16px 32px;background:#f5f5f5;border-top:1px solid #e0e0e0;">
      <p style="margin:0;font-size:12px;color:#999;">
        Ce message a été envoyé depuis le formulaire de devis du site affretix.fr
      </p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  // 1. Parse JSON body
  let body: ContactPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }

  // 2. Validate required fields
  for (const field of REQUIRED) {
    if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
      return NextResponse.json(
        { error: `Le champ "${field}" est requis` },
        { status: 400 }
      )
    }
  }

  // 3. Basic email format check (second layer after client-side)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 })
  }

  // 4. Send via Resend
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: "Erreur de configuration serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    )
  }
  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      // Use onboarding@resend.dev until Affretix domain is verified in Resend dashboard
      from: 'Affretix Devis <onboarding@resend.dev>',
      to: ['contact@affretix.fr'],
      replyTo: body.email,
      subject: `Demande de devis — ${body.nom}${body.entreprise ? ` (${body.entreprise})` : ''}`,
      html: buildEmailHtml(body),
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi. Veuillez réessayer." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    )
  }
}
