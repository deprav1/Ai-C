import { NextRequest, NextResponse } from 'next/server';
import { Lead } from '@/types';

// Временное хранилище лидов (в production будет Supabase)
const leads: Lead[] = [];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Валидация
        if (!body.name || !body.email || !body.product) {
            return NextResponse.json(
                { error: 'Имя, email и продукт обязательны' },
                { status: 400 }
            );
        }

        const newLead: Lead = {
            id: crypto.randomUUID(),
            name: body.name,
            email: body.email,
            phone: body.phone || undefined,
            product: body.product,
            source: body.source || 'form',
            message: body.message || undefined,
            createdAt: new Date(),
            status: 'new',
        };

        leads.push(newLead);

        // TODO: Интеграция с Supabase для сохранения
        // TODO: Отправка email-уведомления

        console.log('New lead:', newLead);

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        console.error('Lead submission error:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}

export async function GET() {
    // TODO: Добавить авторизацию для админки
    return NextResponse.json({ leads });
}
