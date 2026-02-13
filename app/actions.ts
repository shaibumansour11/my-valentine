'use server'

import db from '@/lib/prisma';
// import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function createValentine(formData: { senderName: string; recipientName: string; email?: string }) {
    try {
        const valentine = await db.valentine.create({
            data: {
                senderName: formData.senderName,
                recipientName: formData.recipientName,
                email: formData.email,
            },
        })
        return { success: true, id: valentine.id }
    } catch (error) {
        console.error('Failed to create valentine:', error)
        return { success: false, error: 'Database error' }
    }
}

export async function sendReplyEmail(valentineId: string, answer: string) {
    try {
        const valentine = await db.valentine.findUnique({
            where: { id: valentineId },
        })

        if (!valentine) throw new Error('Valentine not found')

        // If sender provided an email, send to them. Otherwise send to a default or just log.
        const toEmail = valentine.email || 'developer@example.com' // Fallback or notification address

        await resend.emails.send({
            from: 'Valentine <onboarding@resend.dev>',
            to: toEmail,
            subject: `Valentine Answer from ${valentine.recipientName}!`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #e11d48;">Valentine Reply!</h1>
          <p>Hi <strong>${valentine.senderName}</strong>,</p>
          <p><strong>${valentine.recipientName}</strong> has replied to your valentine wish:</p>
          <div style="padding: 20px; background: #fff1f2; border-radius: 8px; border: 1px solid #fecdd3; margin: 20px 0;">
            <p style="font-size: 1.2rem; margin: 0;">"${answer}"</p>
          </div>
          <p>Happy Valentine's Day!</p>
        </div>
      `,
        })

        return { success: true }
    } catch (error) {
        console.error('Failed to send email:', error)
        return { success: false, error: 'Email service error' }
    }
}
