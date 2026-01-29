// Типы для системы лидов
export interface Lead {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    product: string; // какой продукт интересует
    source: 'form' | 'agent'; // откуда пришёл лид
    message?: string;
    createdAt: Date;
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
}

// Типы для продуктов/курсов
export interface Product {
    id: string;
    slug: string; // URL-friendly имя
    name: string;
    description: string;
    price?: number;
    features: string[];
    isActive: boolean;
}

// Типы для конфигурации лендинга
export interface LandingConfig {
    product: Product;
    hero: {
        title: string;
        subtitle: string;
        ctaText: string;
        backgroundImage?: string;
    };
    features: {
        title: string;
        description: string;
        icon?: string;
    }[];
    testimonials: {
        name: string;
        text: string;
        avatar?: string;
        role?: string;
    }[];
    faq: {
        question: string;
        answer: string;
    }[];
}
