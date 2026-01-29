'use client';

import { useState } from 'react';
import LeadForm from '@/components/LeadForm';

const questions = [
    {
        id: 1,
        question: 'В каком классе ваш ребёнок?',
        options: ['9 класс (ОГЭ)', '10 класс', '11 класс (ЕГЭ)'],
    },
    {
        id: 2,
        question: 'Как ребёнок относится к подготовке?',
        options: ['Очень мотивирован', 'Занимается, но без энтузиазма', 'Приходится заставлять', 'Вообще не готовится'],
    },
    {
        id: 3,
        question: 'Есть ли репетиторы или курсы?',
        options: ['Да, по нескольким предметам', 'Да, по одному предмету', 'Нет, готовится сам', 'Пока думаем'],
    },
    {
        id: 4,
        question: 'Какие результаты пробных экзаменов?',
        options: ['Отлично (80+)', 'Хорошо (60-80)', 'Средне (40-60)', 'Не сдавал пробники'],
    },
    {
        id: 5,
        question: 'Что беспокоит больше всего?',
        options: ['Не успеем подготовиться', 'Ребёнок волнуется', 'Не знаем слабые места', 'Нет чёткого плана'],
    },
];

const getReadinessLevel = (answers: string[]) => {
    let score = 0;

    // Мотивация
    if (answers[1] === 'Очень мотивирован') score += 25;
    else if (answers[1] === 'Занимается, но без энтузиазма') score += 15;
    else if (answers[1] === 'Приходится заставлять') score += 5;

    // Подготовка
    if (answers[2] === 'Да, по нескольким предметам') score += 25;
    else if (answers[2] === 'Да, по одному предмету') score += 15;
    else if (answers[2] === 'Нет, готовится сам') score += 10;

    // Пробники
    if (answers[3] === 'Отлично (80+)') score += 30;
    else if (answers[3] === 'Хорошо (60-80)') score += 20;
    else if (answers[3] === 'Средне (40-60)') score += 10;

    return score;
};

const getRecommendation = (score: number) => {
    if (score >= 70) return { level: 'Высокий', color: 'green', text: 'Ваш ребёнок на верном пути! Рекомендуем не снижать темп.' };
    if (score >= 45) return { level: 'Средний', color: 'yellow', text: 'Есть хорошая база, но нужно усилить подготовку по слабым местам.' };
    return { level: 'Требует внимания', color: 'red', text: 'Рекомендуем срочно составить план подготовки с репетитором.' };
};

export default function ParentCheckLanding() {
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

    const score = getReadinessLevel(answers);
    const recommendation = getRecommendation(score);
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const colorClasses: Record<string, string> = {
        green: 'from-green-500 to-emerald-500',
        yellow: 'from-yellow-500 to-orange-500',
        red: 'from-red-500 to-pink-500',
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
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
                            <div className="text-6xl mb-6">👨‍👩‍👧</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ваш ребёнок готов к экзаменам?
                            </h1>
                            <p className="text-xl text-gray-300">
                                Честный отчёт за 3 минуты
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-500"
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
                                        className="w-full p-4 bg-white/5 hover:bg-white/20 border border-white/10 hover:border-pink-400 rounded-xl text-white text-left transition-all hover:scale-[1.02]"
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
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                            <div className="text-center mb-8">
                                <div className="text-6xl mb-4">📋</div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Результат проверки
                                </h2>
                            </div>

                            {/* Score Display */}
                            <div className={`bg-gradient-to-r ${colorClasses[recommendation.color]} rounded-2xl p-6 mb-6`}>
                                <div className="text-center">
                                    <div className="text-lg text-white/80 mb-2">Уровень готовности:</div>
                                    <div className="text-3xl font-bold text-white mb-2">{recommendation.level}</div>
                                    <div className="text-white/90">{recommendation.text}</div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="space-y-4 mb-8">
                                <h3 className="text-lg font-semibold text-white">Ваши ответы:</h3>
                                {answers.map((answer, index) => (
                                    <div key={index} className="flex justify-between text-sm border-b border-white/10 pb-2">
                                        <span className="text-gray-400">{questions[index].question}</span>
                                        <span className="text-white font-medium">{answer}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all"
                            >
                                Получить персональные рекомендации
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
                                <div className="text-4xl mb-4">📧</div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Персональный план подготовки
                                </h2>
                                <p className="text-gray-400">
                                    Оставьте контакты — пришлём детальные рекомендации
                                </p>
                            </div>

                            <LeadForm product="parent_check" />
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
