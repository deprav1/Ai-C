import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { sendLeadNotification } from '@/lib/email';

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

        // Email валидация
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Некорректный email адрес' },
                { status: 400 }
            );
        }

        const leadData = {
            name: body.name.trim(),
            email: body.email.toLowerCase().trim(),
            phone: body.phone?.trim() || null,
            product: body.product,
            source: body.source || 'form',
            message: body.message?.trim() || null,
            status: 'new' as const,
        };

        // Сохранение в Supabase (если настроен)
        let savedLead = null;

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
            const supabase = createServerClient();
            const { data, error } = await supabase
                .from('leads')
                .insert(leadData)
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                // Продолжаем без сохранения в БД, но логируем
            } else {
                savedLead = data;
            }
        } else {
            // Fallback: логируем лид (для разработки без Supabase)
            console.log('New lead (no Supabase):', leadData);
            savedLead = { id: crypto.randomUUID(), ...leadData, created_at: new Date().toISOString() };
        }

        // Отправка email-уведомления
        await sendLeadNotification(leadData);

        return NextResponse.json({
            success: true,
            lead: savedLead,
            message: 'Заявка успешно отправлена!'
        });
    } catch (error) {
        console.error('Lead submission error:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    // Проверка авторизации (простая проверка заголовка)
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
            const supabase = createServerClient();

            // Получаем параметры фильтрации
            const { searchParams } = new URL(request.url);
            const status = searchParams.get('status');
            const product = searchParams.get('product');
            const limit = parseInt(searchParams.get('limit') || '50');
            const offset = parseInt(searchParams.get('offset') || '0');

            let query = supabase
                .from('leads')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);

            if (status) {
                query = query.eq('status', status);
            }
            if (product) {
                query = query.eq('product', product);
            }

            const { data, error, count } = await query;

            if (error) {
                throw error;
            }

            return NextResponse.json({
                leads: data,
                total: count,
                limit,
                offset
            });
        } else {
            // Fallback для разработки
            return NextResponse.json({
                leads: [],
                total: 0,
                message: 'Supabase не настроен'
            });
        }
    } catch (error) {
        console.error('Get leads error:', error);
        return NextResponse.json(
            { error: 'Ошибка получения данных' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json(
                { error: 'ID и статус обязательны' },
                { status: 400 }
            );
        }

        const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Некорректный статус' },
                { status: 400 }
            );
        }

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
            const supabase = createServerClient();

            const { data, error } = await supabase
                .from('leads')
                .update({ status })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw error;
            }

            return NextResponse.json({ success: true, lead: data });
        } else {
            return NextResponse.json({
                success: true,
                message: 'Supabase не настроен'
            });
        }
    } catch (error) {
        console.error('Update lead error:', error);
        return NextResponse.json(
            { error: 'Ошибка обновления' },
            { status: 500 }
        );
    }
}
