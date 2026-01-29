'use client';

import { useState } from 'react';
import Image from 'next/image';
import LeadForm from '@/components/LeadForm';
import ChatWidget from '@/components/ChatWidget';

export default function ParentCheckLanding() {
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const questions = [
        { question: 'В каком классе ваш ребёнок?', options: ['9 класс (ОГЭ)', '10 класс', '11 класс (ЕГЭ)'] },
        { question: 'Как ребёнок относится к подготовке?', options: ['Очень мотивирован', 'Занимается без энтузиазма', 'Приходится заставлять', 'Не готовится'] },
        { question: 'Есть ли репетиторы или курсы?', options: ['Да, несколько предметов', 'Да, один предмет', 'Нет, сам готовится', 'Пока думаем'] },
        { question: 'Результаты пробных экзаменов?', options: ['Отлично (80+)', 'Хорошо (60-80)', 'Средне (40-60)', 'Не сдавал'] },
        { question: 'Что беспокоит больше всего?', options: ['Не успеем подготовиться', 'Ребёнок волнуется', 'Не знаем слабые места', 'Нет плана'] },
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

    const getLevel = () => {
        let score = 0;
        if (answers[1] === 'Очень мотивирован') score += 25;
        else if (answers[1] === 'Занимается без энтузиазма') score += 15;
        if (answers[2]?.includes('Да')) score += 20;
        if (answers[3] === 'Отлично (80+)') score += 30;
        else if (answers[3] === 'Хорошо (60-80)') score += 20;
        else if (answers[3] === 'Средне (40-60)') score += 10;

        if (score >= 60) return { level: 'Высокий', color: 'green', emoji: '✅' };
        if (score >= 35) return { level: 'Средний', color: 'yellow', emoji: '⚠️' };
        return { level: 'Требует внимания', color: 'red', emoji: '🚨' };
    };

    const result = getLevel();

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <header className="relative py-4">
                    <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                        <a href="/" className="text-white/80 hover:text-white text-sm">← Ai-C</a>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Для родителей</span>
                    </div>
                </header>

                <div className="relative max-w-6xl mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                Ваш ребёнок готов к экзаменам?
                            </h1>
                            <p className="text-xl text-white/80 mb-8">
                                Получите честный отчёт о готовности и персональные рекомендации от экспертов ЕГЭ
                            </p>
                            <button
                                onClick={() => setShowQuiz(true)}
                                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Проверить готовность
                            </button>
                        </div>
                        <div className="hidden lg:block">
                            <Image src="/hero-parents.png" alt="Родители с ребёнком" width={400} height={400} className="w-full max-w-md mx-auto drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Проблема */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Знакомая ситуация?</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        {[
                            'Ребёнок говорит "всё нормально", но вы не уверены',
                            'Не понятно, хватит ли времени на подготовку',
                            'Репетиторы есть, но результат не ясен',
                            'Не знаете реальный уровень знаний ребёнка',
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3 p-4 bg-red-50 rounded-xl">
                                <span className="text-red-500 text-xl">😟</span>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Решение */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Наша проверка даёт ответы</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="font-bold mb-2">Объективная оценка</h3>
                            <p className="text-gray-600">5 вопросов о реальной ситуации — без розовых очков</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="font-bold mb-2">Уровень готовности</h3>
                            <p className="text-gray-600">Понятная шкала: высокий / средний / требует внимания</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="font-bold mb-2">План действий</h3>
                            <p className="text-gray-600">Конкретные шаги что делать дальше</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Для кого */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Для кого эта проверка</h2>
                    <div className="space-y-4">
                        {[
                            { title: 'Родители 9-классников', desc: 'Понять, нужна ли дополнительная подготовка к ОГЭ' },
                            { title: 'Родители 10-классников', desc: 'Оценить базу для подготовки к ЕГЭ заранее' },
                            { title: 'Родители 11-классников', desc: 'Проверить готовность и скорректировать план' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 bg-purple-50 rounded-2xl">
                                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">{i + 1}</div>
                                <div>
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Отзывы */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Что говорят родители</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: 'Елена, мама 11-классника', text: 'Наконец-то получила объективную картину. Оказалось, что ребёнок переоценивал свой уровень.' },
                            { name: 'Игорь, папа 9-классницы', text: 'Прошли проверку и решили начать готовиться заранее. Спасибо за конкретный план!' },
                            { name: 'Марина, мама 10-классника', text: 'Теперь понимаю на что обратить внимание. Очень полезно!' },
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                                <p className="text-gray-600 mb-4">&ldquo;{review.text}&rdquo;</p>
                                <p className="font-medium text-purple-600">{review.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Узнайте правду о готовности ребёнка</h2>
                    <p className="text-white/80 mb-8">Бесплатно • 3 минуты • Без регистрации</p>
                    <button
                        onClick={() => setShowQuiz(true)}
                        className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all"
                    >
                        Начать проверку
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
                                        <div className="h-full bg-pink-500 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-6">{questions[currentQuestion].question}</h3>
                                    <div className="space-y-3">
                                        {questions[currentQuestion].options.map((opt, i) => (
                                            <button key={i} onClick={() => handleAnswer(opt)} className="w-full p-4 text-left border rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all">
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : !showForm ? (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">{result.emoji}</div>
                                    <p className="text-gray-500 mb-2">Уровень готовности</p>
                                    <div className={`text-3xl font-bold mb-6 ${result.color === 'green' ? 'text-green-600' : result.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {result.level}
                                    </div>
                                    <button onClick={() => setShowForm(true)} className="w-full py-4 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700">
                                        Получить рекомендации
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-center">Куда прислать рекомендации?</h3>
                                    <LeadForm product="parent_check" />
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
