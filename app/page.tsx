import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-300 text-sm mb-6">
              🚀 Лендинги + AI-агенты для квалифицированных лидов
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Превращаем посетителей в{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                горячих лидов
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Создаём конверсионные лендинги с AI-агентами, которые квалифицируют
              посетителей 24/7 и передают только готовых к покупке клиентов.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#demo"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                Смотреть примеры
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                Заказать лендинг
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-gray-400">
              От трафика до квалифицированного лида за 3 шага
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Лендинг-квиз</h3>
              <p className="text-gray-400">
                Создаём вовлекающий лендинг с интерактивными элементами, который захватывает внимание
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-агент</h3>
              <p className="text-gray-400">
                Умный чат-бот задаёт вопросы, выявляет потребности и квалифицирует посетителя
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Горячий лид</h3>
              <p className="text-gray-400">
                Вы получаете только готовых клиентов с полной информацией о потребностях
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Landings */}
      <section id="demo" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Примеры лендингов
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Посмотрите, как работают наши лендинги для образовательной ниши
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Landing 1: For Kids */}
            <Link
              href="/landing/ege-prognoz"
              className="group relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 overflow-hidden hover:scale-[1.02] transition-all shadow-xl hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative">
                <div className="text-sm text-blue-200 mb-2">Для школьников</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Узнай свой прогноз баллов на ЕГЭ за 7 минут
                </h3>
                <p className="text-white/80 mb-6">
                  Интерактивный квиз с AI-анализом подготовки
                </p>
                <div className="flex items-center gap-2 text-white font-medium">
                  Открыть пример
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Landing 2: For Parents */}
            <Link
              href="/landing/parent-check"
              className="group relative bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 overflow-hidden hover:scale-[1.02] transition-all shadow-xl hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative">
                <div className="text-sm text-purple-200 mb-2">Для родителей</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ваш ребёнок готов к экзаменам? Честный отчёт
                </h3>
                <p className="text-white/80 mb-6">
                  Объективная оценка готовности с рекомендациями
                </p>
                <div className="flex items-center gap-2 text-white font-medium">
                  Открыть пример
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">3x</div>
              <div className="text-white/70">рост конверсии</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70">работа агента</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">85%</div>
              <div className="text-white/70">квалификация лидов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">7 дн</div>
              <div className="text-white/70">запуск лендинга</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Готовы увеличить конверсию?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Обсудите ваш проект с нашим AI-агентом или оставьте заявку
          </p>
          <div className="text-gray-400 text-sm">
            👇 Нажмите на чат-виджет справа внизу
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-white">Ai-C</div>
            <div className="text-sm">
              © 2026 Ai-C. Лендинги и AI-агенты для квалифицированных лидов.
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}
