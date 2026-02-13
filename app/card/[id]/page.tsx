import { notFound } from 'next/navigation'
import db from '@/lib/prisma'
import CardDisplay from '../../components/CardDisplay'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function CardPage({ params }: PageProps) {
    const { id } = await params

    const valentine = await db.valentine.findUnique({
        where: { id },
    })

    if (!valentine) {
        notFound()
    }

    return <CardDisplay valentine={valentine} />
}
