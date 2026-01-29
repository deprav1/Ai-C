'use client';

import { useState } from 'react';

interface LeadFormProps {
    product: string;
    onSuccess?: () => void;
}

export default function LeadForm({ product, onSuccess }: LeadFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    product,
                    source: 'form',
                }),
            });

            if (!response.ok) throw new Error('Ошибка отправки');

            setIsSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            onSuccess?.();
        } catch {
            setError('Не удалось отправить заявку. Попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Заявка отправлена!
                </h3>
                <p className="text-green-600">
                    Мы свяжемся с вами в ближайшее время
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя *
                </label>
                <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Как вас зовут?"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="example@mail.ru"
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="+7 (___) ___-__-__"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение
                </label>
                <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                    placeholder="Расскажите о ваших целях..."
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
                {isSubmitting ? 'Отправка...' : 'Записаться на консультацию'}
            </button>

            <p className="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
        </form>
    );
}
