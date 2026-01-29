import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `Ты — виртуальный помощник образовательной платформы Ai-C. Твоя задача — помогать посетителям сайта выбрать подходящую программу обучения.

О платформе Ai-C:
- Профориентация — комплексное тестирование и консультация для определения будущей профессии
- Подготовка к экзаменам (ЕГЭ, ОГЭ) — персональный план с AI-анализом слабых мест
- Гипотек — развитие критического мышления и soft skills
- Бесплатная консультация — первый шаг для всех программ

Правила общения:
1. Будь дружелюбным и профессиональным
2. Отвечай кратко (2-4 предложения)
3. Задавай уточняющие вопросы, чтобы понять потребности
4. Если пользователь заинтересован — предложи оставить контакты для связи
5. Отвечай на русском языке

Когда пользователь готов записаться, ответь в формате:
[LEAD_CAPTURE]
Имя: [спроси имя если не знаешь]
Продукт: [определи подходящий продукт: consultation, proforientation, exam_prep, gipotek]
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
