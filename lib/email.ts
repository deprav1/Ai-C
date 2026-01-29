import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadEmailData {
    name: string;
    email: string;
    phone?: string;
    product: string;
    message?: string;
    source: 'form' | 'agent';
}

export async function sendLeadNotification(lead: LeadEmailData) {
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!notificationEmail || !process.env.RESEND_API_KEY) {
        console.log('Email notification skipped: missing configuration');
        return;
    }

    const productNames: Record<string, string> = {
        consultation: 'Бесплатная консультация',
        proforientation: 'Профориентация',
        exam_prep: 'Подготовка к экзаменам',
        gipotek: 'Гипотек',
    };

    const sourceNames = {
        form: '📝 Форма на сайте',
        agent: '🤖 AI-агент',
    };

    try {
        await resend.emails.send({
            from: 'Ai-C <noreply@ai-c.ru>',
            to: notificationEmail,
            subject: `🎯 Новая заявка: ${lead.name} — ${productNames[lead.product] || lead.product}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8b5cf6, #ec4899); padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">🎯 Новая заявка</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><strong>Имя:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">${lead.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><a href="mailto:${lead.email}">${lead.email}</a></td>
              </tr>
              ${lead.phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><strong>Телефон:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><a href="tel:${lead.phone}">${lead.phone}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><strong>Продукт:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">${productNames[lead.product] || lead.product}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><strong>Источник:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">${sourceNames[lead.source]}</td>
              </tr>
              ${lead.message ? `
              <tr>
                <td style="padding: 10px 0;"><strong>Сообщение:</strong></td>
                <td style="padding: 10px 0;">${lead.message}</td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 8px;">
              <p style="margin: 0; color: #2e7d32;">
                ✅ Заявка сохранена в админке. 
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/leads">Открыть</a>
              </p>
            </div>
          </div>
        </div>
      `,
        });

        console.log('Lead notification email sent successfully');
    } catch (error) {
        console.error('Failed to send lead notification:', error);
    }
}
