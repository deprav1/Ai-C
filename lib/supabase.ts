import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Клиент для использования на клиенте (ограниченные права)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Клиент для использования на сервере (полные права)
export function createServerClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    return createClient(supabaseUrl, serviceRoleKey);
}

// Типы для базы данных
export interface Database {
    public: {
        Tables: {
            leads: {
                Row: {
                    id: string;
                    name: string;
                    email: string;
                    phone: string | null;
                    product: string;
                    source: 'form' | 'agent';
                    message: string | null;
                    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['leads']['Insert']>;
            };
            admin_users: {
                Row: {
                    id: string;
                    email: string;
                    password_hash: string;
                    name: string;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at'>;
            };
        };
    };
}
