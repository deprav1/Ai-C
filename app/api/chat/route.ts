import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `Ты — AI-консультант сервиса Ai-C. Мы создаём конверсионные лендинги с AI-агентами для квалификации лидов.

Наши услуги:
- Лендинг-квизы — интерактивные страницы с вовлекающими вопросами
- AI-агенты — чат-боты для квалификации посетителей 24/7
- Интеграции — CRM, email-уведомления, аналитика

Примеры работ (образовательная ниша):
- Прогноз баллов ЕГЭ за 7 минут (для школьников)
- Проверка готовности к экзаменам (для родителей)

Стоимость: от 50 000₽ за лендинг с AI-агентом
Срок: 5-7 рабочих дней

Правила общения:
1. Будь дружелюбным и профессиональным
2. Отвечай кратко (2-4 предложения)
3. Узнай нишу клиента и его задачи
4. Предложи созвон для обсуждения деталей
5. Отвечай на русском языке

Когда клиент готов обсудить проект, ответь в формате:
[LEAD_CAPTURE]
Продукт: landing_order
[/LEAD_CAPTURE]`;

export async function POST(request: NextRequest) {
    try {
        const { messages, sessionId } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Сообщения обязательны' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            // Fallback ответы если нет API ключа
            const fallbackResponses = [
                'Привет! Я виртуальный помощник Ai-C. Чем могу помочь?',
                'Расскажите подробнее о ваших целях в обучении.',
                'У нас есть программы профориентации, подготовки к экзаменам и развития soft skills. Что вас интересует?',
            ];

            return NextResponse.json({
                message: fallbackResponses[Math.min(messages.length, fallbackResponses.length - 1)],
                sessionId: sessionId || crypto.randomUUID(),
                leadCapture: null,
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Формируем историю чата
        const chatHistory = messages.map((msg: { role: string; content: string }) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history: chatHistory.slice(0, -1), // Все кроме последнего
            systemInstruction: SYSTEM_PROMPT,
        });

        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        const responseText = result.response.text();

        // Проверяем, есть ли захват лида
        let leadCapture = null;
        const leadMatch = responseText.match(/\[LEAD_CAPTURE\]([\s\S]*?)\[\/LEAD_CAPTURE\]/);

        if (leadMatch) {
            const leadData = leadMatch[1];
            const productMatch = leadData.match(/Продукт:\s*(\w+)/);
            leadCapture = {
                product: productMatch ? productMatch[1] : 'consultation',
                triggered: true,
            };
        }

        // Убираем технические теги из ответа
        const cleanResponse = responseText
            .replace(/\[LEAD_CAPTURE\][\s\S]*?\[\/LEAD_CAPTURE\]/g, '')
            .trim();

        return NextResponse.json({
            message: cleanResponse || 'Отлично! Давайте запишем вас на консультацию.',
            sessionId: sessionId || crypto.randomUUID(),
            leadCapture,
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Ошибка обработки сообщения' },
            { status: 500 }
        );
    }
}
