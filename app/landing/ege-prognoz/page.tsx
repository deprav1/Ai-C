'use client';

import { useState } from 'react';
import LeadForm from '@/components/LeadForm';

const questions = [
    {
        id: 1,
        question: 'Какой предмет сдаёшь?',
        options: ['Математика (профиль)', 'Русский язык', 'Обществознание', 'Физика', 'Информатика', 'Другой'],
    },
    {
        id: 2,
        question: 'Сколько времени готовишься в неделю?',
        options: ['Меньше 3 часов', '3-5 часов', '5-10 часов', 'Больше 10 часов'],
    },
    {
        id: 3,
        question: 'Как оцениваешь свой текущий уровень?',
        options: ['Только начал(а)', 'Знаю основы', 'Уверенно решаю', 'Почти готов(а)'],
    },
    {
        id: 4,
        question: 'Какой балл хочешь получить?',
        options: ['60-70', '70-80', '80-90', '90+'],
    },
];

export default function EgePrognozLanding() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const calculatePrognoz = () => {
        // Простая логика прогноза для демонстрации
        const levels: Record<string, number> = {
            'Только начал(а)': 55,
            'Знаю основы': 65,
            'Уверенно решаю': 78,
            'Почти готов(а)': 88,
        };
        const timeBonus: Record<string, number> = {
            'Меньше 3 часов': -5,
            '3-5 часов': 0,
            '5-10 часов': 5,
            'Больше 10 часов': 10,
        };

        const base = levels[answers[2]] || 70;
        const bonus = timeBonus[answers[1]] || 0;
        return Math.min(100, Math.max(40, base + bonus));
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            {/* Header */}
            <header className="py-6">
                <div className="max-w-4xl mx-auto px-4">
                    <a href="/" className="text-white/60 hover:text-white text-sm flex items-center gap-2">
                        ← На главную Ai-C
                    </a>
                </div>
            </header>

            {!showResult ? (
                /* Quiz Section */
                <section className="py-12">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <div className="text-6xl mb-6">🎯</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Узнай свой прогноз баллов на ЕГЭ
                            </h1>
                            <p className="text-xl text-gray-300">
                                Ответь на 4 вопроса за 2 минуты
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-white/60 text-sm mt-2 text-center">
                                Вопрос {currentQuestion + 1} из {questions.length}
                            </p>
                        </div>

                        {/* Question Card */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                                {questions[currentQuestion].question}
                            </h2>

                            <div className="space-y-3">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option)}
                                        className="w-full p-4 bg-white/5 hover:bg-white/20 border border-white/10 hover:border-purple-400 rounded-xl text-white text-left transition-all hover:scale-[1.02]"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : !showForm ? (
                /* Result Section */
                <section className="py-12">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
                            <div className="text-6xl mb-6">📊</div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Твой предварительный прогноз
                            </h2>

                            <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent my-8">
                                {calculatePrognoz()}
                            </div>
                            <p className="text-gray-400 mb-8">баллов на ЕГЭ</p>

                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-8">
                                <p className="text-yellow-200 text-sm">
                                    ⚠️ Это приблизительный прогноз. Для точной оценки нужен анализ знаний по темам.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
                            >
                                Получить детальный анализ бесплатно
                            </button>
                        </div>
                    </div>
                </section>
            ) : (
                /* Lead Form Section */
                <section className="py-12">
                    <div className="max-w-md mx-auto px-4">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-4">📋</div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Детальный анализ готовности
                                </h2>
                                <p className="text-gray-400">
                                    Оставь контакты — пришлём персональный разбор
                                </p>
                            </div>

                            <LeadForm product="ege_prognoz" />
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="py-8 mt-auto">
                <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
                    Пример лендинга от Ai-C • <a href="/" className="underline hover:text-white">Заказать такой</a>
                </div>
            </footer>
        </main>
    );
}
