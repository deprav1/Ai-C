import LeadForm from '@/components/LeadForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-300 text-sm mb-6">
                🎓 Образовательная платформа нового поколения
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Раскрой свой потенциал с{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ai-C
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                Персонализированное обучение с элементами искусственного интеллекта.
                Профориентация, подготовка к экзаменам и развитие навыков для будущего.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#signup"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                >
                  Записаться бесплатно
                </a>
                <a
                  href="#programs"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  Наши программы
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-400">учеников</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">95%</div>
                  <div className="text-sm text-gray-400">результат</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5★</div>
                  <div className="text-sm text-gray-400">отзывы</div>
                </div>
              </div>
            </div>

            {/* Right: Lead Form */}
            <div id="signup" className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2 text-center">
                Бесплатная консультация
              </h2>
              <p className="text-gray-300 text-center mb-6">
                Узнайте, какая программа подойдёт именно вам
              </p>
              <LeadForm product="consultation" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Наши программы
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Выберите направление, которое поможет достичь ваших целей
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl mb-6">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Профориентация</h3>
              <p className="text-gray-600 mb-4">
                Тестирование и консультация для определения будущей профессии и пути развития
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Комплексное тестирование
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Индивидуальная консультация
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Рекомендации по развитию
                </li>
              </ul>
              <a href="#signup" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                Записаться →
              </a>
            </div>

            {/* Program 2 */}
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl mb-6">
                📚
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Подготовка к экзаменам</h3>
              <p className="text-gray-600 mb-4">
                ЕГЭ, ОГЭ и другие экзамены с персональным подходом и AI-помощником
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Персональный план обучения
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> AI-анализ слабых мест
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Пробные экзамены
                </li>
              </ul>
              <a href="#signup" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Записаться →
              </a>
            </div>

            {/* Program 3 */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl mb-6">
                💡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Гипотек</h3>
              <p className="text-gray-600 mb-4">
                Развитие критического мышления и soft skills для успеха в любой сфере
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Критическое мышление
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Коммуникация
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Проектная деятельность
                </li>
              </ul>
              <a href="#signup" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                Записаться →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Начните свой путь к успеху сегодня
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Первая консультация — бесплатно. Узнайте, какая программа подойдёт вам или вашему ребёнку.
          </p>
          <a
            href="#signup"
            className="inline-block px-10 py-5 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Записаться на бесплатную консультацию
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-white">Ai-C</div>
            <div className="text-sm">
              © 2026 Ai-C. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
