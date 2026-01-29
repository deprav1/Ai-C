import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-change-in-production';

// Простая авторизация для MVP (в production использовать Supabase Auth)
const ADMIN_CREDENTIALS = {
    email: 'admin@ai-c.ru',
    // В production хранить в env и хешировать
    password: 'admin123',
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email и пароль обязательны' },
                { status: 400 }
            );
        }

        // Проверка credentials
        if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
            return NextResponse.json(
                { error: 'Неверный email или пароль' },
                { status: 401 }
            );
        }

        // Создание JWT токена
        const token = jwt.sign(
            {
                email,
                role: 'admin',
                iat: Math.floor(Date.now() / 1000)
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Установка cookie
        const response = NextResponse.json({
            success: true,
            message: 'Авторизация успешна'
        });

        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 дней
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            { error: 'Ошибка авторизации' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        return NextResponse.json({
            authenticated: true,
            user: decoded
        });
    } catch {
        return NextResponse.json({ authenticated: false });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_token');
    return response;
}
