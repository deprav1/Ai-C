'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    product: string;
    source: 'form' | 'agent';
    message: string | null;
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
    created_at: string;
}

const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-purple-100 text-purple-800',
    converted: 'bg-green-100 text-green-800',
    lost: 'bg-gray-100 text-gray-800',
};

const statusLabels: Record<string, string> = {
    new: 'Новый',
    contacted: 'Связались',
    qualified: 'Квалифицирован',
    converted: 'Конверсия',
    lost: 'Потерян',
};

const productLabels: Record<string, string> = {
    consultation: 'Консультация',
    proforientation: 'Профориентация',
    exam_prep: 'Подготовка к экзаменам',
    gipotek: 'Гипотек',
};

const sourceLabels: Record<string, string> = {
    form: '📝 Форма',
    agent: '🤖 Агент',
};

export default function LeadsPage() {
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState({ status: '', product: '' });
    const [stats, setStats] = useState({ total: 0, new: 0, converted: 0 });

    const fetchLeads = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            if (filter.status) params.append('status', filter.status);
            if (filter.product) params.append('product', filter.product);

            const response = await fetch(`/api/leads?${params}`, {
                headers: {
                    'Authorization': 'Bearer admin-token',
                },
            });

            if (response.status === 401) {
                router.push('/admin');
                return;
            }

            const data = await response.json();
            setLeads(data.leads || []);

            // Подсчёт статистики
            const allLeads = data.leads || [];
            setStats({
                total: allLeads.length,
                new: allLeads.filter((l: Lead) => l.status === 'new').length,
                converted: allLeads.filter((l: Lead) => l.status === 'converted').length,
            });
        } catch {
            setError('Ошибка загрузки данных');
        } finally {
            setIsLoading(false);
        }
    }, [filter, router]);

    useEffect(() => {
        // Проверка авторизации
        fetch('/api/admin/auth')
            .then(res => res.json())
            .then(data => {
                if (!data.authenticated) {
                    router.push('/admin');
                } else {
                    fetchLeads();
                }
            });
    }, [fetchLeads, router]);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const response = await fetch('/api/leads', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer admin-token',
                },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (response.ok) {
                fetchLeads();
            }
        } catch {
            setError('Ошибка обновления статуса');
        }
    };

    const handleLogout = async () => {
        await fetch('/api/admin/auth', { method: 'DELETE' });
        router.push('/admin');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Ai-C Admin</h1>
                        <p className="text-sm text-gray-500">Управление лидами</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Выйти
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-gray-500">Всего лидов</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="text-3xl font-bold text-blue-600">{stats.new}</div>
                        <div className="text-gray-500">Новых</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="text-3xl font-bold text-green-600">{stats.converted}</div>
                        <div className="text-gray-500">Конверсий</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6 flex gap-4 flex-wrap">
                    <select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        <option value="">Все статусы</option>
                        {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <select
                        value={filter.product}
                        onChange={(e) => setFilter({ ...filter, product: e.target.value })}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        <option value="">Все продукты</option>
                        {Object.entries(productLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <button
                        onClick={fetchLeads}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Обновить
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 mb-6">
                        {error}
                    </div>
                )}

                {/* Leads Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {leads.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <div className="text-4xl mb-4">📭</div>
                            <p>Лидов пока нет</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Имя</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Контакты</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Продукт</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Источник</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{lead.name}</div>
                                                {lead.message && (
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">{lead.message}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <a href={`mailto:${lead.email}`} className="text-purple-600 hover:underline">
                                                        {lead.email}
                                                    </a>
                                                </div>
                                                {lead.phone && (
                                                    <div className="text-sm text-gray-500">
                                                        <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {productLabels[lead.product] || lead.product}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {sourceLabels[lead.source] || lead.source}
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]} border-0 cursor-pointer`}
                                                >
                                                    {Object.entries(statusLabels).map(([value, label]) => (
                                                        <option key={value} value={value}>{label}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(lead.created_at).toLocaleDateString('ru-RU', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
