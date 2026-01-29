'use client';

import { useState } from 'react';
import Image from 'next/image';
import LeadForm from '@/components/LeadForm';
import ChatWidget from '@/components/ChatWidget';

export default function EgePrognozLanding() {
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const questions = [
        { question: 'Какой предмет сдаёшь?', options: ['Математика (профиль)', 'Русский язык', 'Обществознание', 'Физика', 'Информатика'] },
        { question: 'Сколько времени готовишься в неделю?', options: ['Меньше 3 часов', '3-5 часов', '5-10 часов', 'Больше 10 часов'] },
        { question: 'Как оцениваешь свой уровень?', options: ['Только начал(а)', 'Знаю основы', 'Уверенно решаю', 'Почти готов(а)'] },
        { question: 'Какой балл хочешь?', options: ['60-70', '70-80', '80-90', '90+'] },
    ];

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
        const levels: Record<string, number> = { 'Только начал(а)': 55, 'Знаю основы': 65, 'Уверенно решаю': 78, 'Почти готов(а)': 88 };
        const timeBonus: Record<string, number> = { 'Меньше 3 часов': -5, '3-5 часов': 0, '5-10 часов': 5, 'Больше 10 часов': 10 };
        return Math.min(100, Math.max(40, (levels[answers[2]] || 70) + (timeBonus[answers[1]] || 0)));
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <header className="relative py-4">
                    <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                        <a href="/" className="text-white/80 hover:text-white text-sm">← Ai-C</a>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Для школьников</span>
                    </div>
                </header>

                <div className="relative max-w-6xl mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                Узнай свой прогноз баллов на ЕГЭ за 7 минут
                            </h1>
                            <p className="text-xl text-white/80 mb-8">
                                Пройди короткий тест и получи реалистичную оценку своей подготовки с рекомендациями по улучшению
                            </p>
                            <button
                                onClick={() => setShowQuiz(true)}
                                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Пройти тест бесплатно
                            </button>
                        </div>
                        <div className="hidden lg:block">
                            <Image src="/hero-students.png" alt="Ученик готовится к ЕГЭ" width={400} height={400} className="w-full max-w-md mx-auto drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Как это работает */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">1</div>
                            <h3 className="font-bold mb-2">Отвечаешь на вопросы</h3>
                            <p className="text-gray-600">4 простых вопроса о твоей подготовке — займёт 2 минуты</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">2</div>
                            <h3 className="font-bold mb-2">Получаешь прогноз</h3>
                            <p className="text-gray-600">Алгоритм анализирует твои ответы и даёт оценку</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">3</div>
                            <h3 className="font-bold mb-2">Получаешь план</h3>
                            <p className="text-gray-600">Персональные рекомендации по улучшению результата</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Преимущества */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Почему стоит пройти тест</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-4 p-6 bg-blue-50 rounded-2xl">
                            <div className="text-3xl">✅</div>
                            <div>
                                <h3 className="font-bold mb-1">Объективная оценка</h3>
                                <p className="text-gray-600">Узнаешь реальный уровень, а не то, что кажется</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-purple-50 rounded-2xl">
                            <div className="text-3xl">📊</div>
                            <div>
                                <h3 className="font-bold mb-1">Понятные рекомендации</h3>
                                <p className="text-gray-600">Конкретные шаги для повышения балла</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-green-50 rounded-2xl">
                            <div className="text-3xl">⏱️</div>
                            <div>
                                <h3 className="font-bold mb-1">Быстро и бесплатно</h3>
                                <p className="text-gray-600">Всего 7 минут твоего времени</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-yellow-50 rounded-2xl">
                            <div className="text-3xl">🎓</div>
                            <div>
                                <h3 className="font-bold mb-1">От экспертов ЕГЭ</h3>
                                <p className="text-gray-600">Методика проверена на 500+ учениках</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Отзывы */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Отзывы</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: 'Алиса, 11 класс', text: 'Тест показал 72 балла, я думала будет меньше. Получила чёткий план что подтянуть!', avatar: '👩‍🎓' },
                            { name: 'Максим, 11 класс', text: 'Прошёл за 5 минут. Понял что недостаточно занимаюсь — теперь добавил ещё 3 часа в неделю', avatar: '👨‍🎓' },
                            { name: 'Дарья, 10 класс', text: 'Заранее прошла чтобы понять куда двигаться. Очень полезно!', avatar: '👩‍💻' },
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{review.avatar}</span>
                                    <span className="font-medium">{review.name}</span>
                                </div>
                                <p className="text-gray-600">&ldquo;{review.text}&rdquo;</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Готов узнать свой прогноз?</h2>
                    <p className="text-white/80 mb-8">Это бесплатно и займёт всего 7 минут</p>
                    <button
                        onClick={() => setShowQuiz(true)}
                        className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all"
                    >
                        Начать тест
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-900 text-gray-400 text-center text-sm">
                Пример лендинга от <a href="/" className="underline text-white">Ai-C</a>
            </footer>

            {/* Quiz Modal */}
            {showQuiz && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <button onClick={() => { setShowQuiz(false); setCurrentQuestion(0); setAnswers([]); setShowResult(false); setShowForm(false); }} className="text-gray-400 hover:text-gray-600 mb-4">✕ Закрыть</button>

                            {!showResult ? (
                                <>
                                    <div className="h-2 bg-gray-200 rounded-full mb-6">
                                        <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-6">{questions[currentQuestion].question}</h3>
                                    <div className="space-y-3">
                                        {questions[currentQuestion].options.map((opt, i) => (
                                            <button key={i} onClick={() => handleAnswer(opt)} className="w-full p-4 text-left border rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all">
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : !showForm ? (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">📊</div>
                                    <p className="text-gray-500 mb-2">Твой прогноз</p>
                                    <div className="text-6xl font-bold text-purple-600 mb-6">{calculatePrognoz()}</div>
                                    <button onClick={() => setShowForm(true)} className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700">
                                        Получить детальный анализ
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-center">Куда прислать анализ?</h3>
                                    <LeadForm product="ege_prognoz" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ChatWidget />
        </main>
    );
}
