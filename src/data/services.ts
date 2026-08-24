import type { ServiceItem } from '../types/calculator'

// Раздел 2 — основной прайс-лист + раздел 12 — расширение спектра услуг
export const SERVICES: ServiceItem[] = [
  // 2.1 Дизайн
  { id: 'D1', code: 'D1', category: 'design', name: 'Пост для соцсетей', unit: 'шт', price: { RU: 600, US: 25, EU: 18 }, dailyRate: 5 },
  { id: 'D2', code: 'D2', category: 'design', name: 'Баннер', unit: 'шт', price: { RU: 800, US: 35, EU: 25 }, dailyRate: 5 },
  { id: 'D3', code: 'D3', category: 'design', name: 'Обложка', unit: 'шт', price: { RU: 1500, US: 60, EU: 40 }, dailyRate: 5 },
  { id: 'D4', code: 'D4', category: 'design', name: 'Сторис', unit: 'шт', price: { RU: 500, US: 20, EU: 15 }, dailyRate: 5 },
  { id: 'D5', code: 'D5', category: 'design', name: 'Иконка', unit: 'шт', price: { RU: 400, US: 15, EU: 10 }, dailyRate: 5 },
  { id: 'D6', code: 'D6', category: 'design', name: 'Карточка товара', unit: 'шт', price: { RU: 700, US: 30, EU: 22 }, dailyRate: 5 },

  // 2.2 Нейрогенерации
  { id: 'N1', code: 'N1', category: 'neuro', name: 'Статичное изображение', unit: 'шт', price: { RU: 400, US: 12, EU: 9 }, dailyRate: 20 },
  { id: 'N2', code: 'N2', category: 'neuro', name: 'Анимация изображения («оживить» картинку)', unit: 'шт', price: { RU: 2000, US: 80, EU: 60 }, dailyRate: 20 },
  { id: 'N3', code: 'N3', category: 'neuro', name: 'Видео-генерация, клип 5 секунд', unit: 'шт', price: { RU: 3000, US: 125, EU: 90 }, dailyRate: 20 },
  { id: 'N4', code: 'N4', category: 'neuro', name: 'Говорящий аватар', unit: 'мин', price: { RU: 5000, US: 200, EU: 150 }, step: 0.5, dailyRate: 0.5 },
  { id: 'N5', code: 'N5', category: 'neuro', name: 'Озвучка / клон голоса', unit: 'мин', price: { RU: 1500, US: 60, EU: 45 }, step: 0.5, dailyRate: 20 },

  // 2.3 Видео и анимация
  { id: 'V1', code: 'V1', category: 'video', name: 'Стандартная анимация', unit: 'мин', price: { RU: 18000, US: 800, EU: 550 }, step: 0.5, dailyRate: 0.5, description: 'Нейтральный фон, 1 персонаж, графические элементы, 3 круга правок, исходники' },
  { id: 'V2', code: 'V2', category: 'video', name: 'Сложная анимация', unit: 'мин', price: { RU: 23000, US: 1500, EU: 900 }, step: 0.5, dailyRate: 0.5, description: '2–3 персонажа, смены сцен, экшн, переходы, параллакс, 3D и сложный свет' },
  { id: 'V3', code: 'V3', category: 'video', name: 'Сценарий / раскадровка', unit: 'мин', price: { RU: 5000, US: 400, EU: 160 }, step: 0.5, dailyRate: 0.5 },
  { id: 'V4', code: 'V4', category: 'video', name: 'Озвучка к видео', unit: 'мин', price: { RU: 1500, US: 60, EU: 45 }, step: 0.5, dailyRate: 20 },

  // 12 — Расширение спектра услуг
  { id: 'X1', code: 'X1', category: 'video', name: 'Дизайн-подписка (пакет единиц в месяц)', unit: 'мес', price: { RU: 25000, US: 1200, EU: 900 }, dailyRate: 1 },
  { id: 'X2', code: 'X2', category: 'video', name: 'Анимированный корпоративный стиль (лого, переходы, шаблоны)', unit: 'проект', price: { RU: 60000, US: 3000, EU: 2200 }, dailyRate: 0.2 },
  { id: 'X3', code: 'X3', category: 'video', name: 'Анимация логотипа', unit: 'шт', price: { RU: 12000, US: 600, EU: 450 }, dailyRate: 1 },
  { id: 'X4', code: 'X4', category: 'video', name: 'Соцпакет анимаций (5–10 роликов + шаблоны)', unit: 'проект', price: { RU: 45000, US: 2200, EU: 1600 }, dailyRate: 0.2 },
  { id: 'X5', code: 'X5', category: 'presentation', name: 'Фирменный шаблон презентации (PPT/Figma)', unit: 'шт', price: { RU: 25000, US: 1200, EU: 900 }, dailyRate: 1 },
  { id: 'X6', code: 'X6', category: 'presentation', name: 'Концепция дизайна презентации (2–4 слайда)', unit: 'шт', price: { RU: 15000, US: 750, EU: 550 }, dailyRate: 1 },
  { id: 'X7', code: 'X7', category: 'presentation', name: 'Питч-дек под ключ (нарратив + дизайн)', unit: 'проект', price: { RU: 80000, US: 4000, EU: 3000 }, dailyRate: 0.2 },
  { id: 'X8', code: 'X8', category: 'video', name: 'Reels / Shorts под ключ', unit: 'шт', price: { RU: 7000, US: 350, EU: 260 }, dailyRate: 1 },
  { id: 'X9', code: 'X9', category: 'video', name: 'Адаптация ролика под формат (9:16, 1:1, 4:5)', unit: 'формат', price: { RU: 3500, US: 175, EU: 130 }, dailyRate: 2 },
  { id: 'X10', code: 'X10', category: 'video', name: 'Локализация видео (субтитры + озвучка)', unit: 'мин', price: { RU: 2500, US: 120, EU: 90 }, step: 0.5, dailyRate: 5 },
  { id: 'X11', code: 'X11', category: 'video', name: 'Саунд-дизайн и музыкальная подложка', unit: 'мин', price: { RU: 3000, US: 150, EU: 110 }, step: 0.5, dailyRate: 2 },
  { id: 'X12', code: 'X12', category: 'video', name: 'Монтаж материала заказчика', unit: 'мин', price: { RU: 4000, US: 200, EU: 150 }, step: 0.5, dailyRate: 2 },
  { id: 'X13', code: 'X13', category: 'neuro', name: 'Кастомная LoRA / обучение модели на стиле', unit: 'модель', price: { RU: 15000, US: 750, EU: 550 }, dailyRate: 0.3 },
  { id: 'X14', code: 'X14', category: 'neuro', name: 'Консистентный персонаж (10 ракурсов)', unit: 'набор', price: { RU: 6000, US: 300, EU: 220 }, dailyRate: 1 },
  { id: 'X15', code: 'X15', category: 'neuro', name: 'Нейро-ретушь и обработка фото', unit: 'шт', price: { RU: 150, US: 8, EU: 6 }, dailyRate: 30 },
  { id: 'X16', code: 'X16', category: 'neuro', name: 'Апскейл изображения до 4K', unit: 'шт', price: { RU: 300, US: 15, EU: 11 }, dailyRate: 30 },
  { id: 'X17', code: 'X17', category: 'design', name: 'Инфографика для соцсетей', unit: 'шт', price: { RU: 1000, US: 45, EU: 35 }, dailyRate: 5 },
  { id: 'X18', code: 'X18', category: 'design', name: 'Обложка YouTube / превью', unit: 'шт', price: { RU: 900, US: 45, EU: 33 }, dailyRate: 5 },
  { id: 'X19', code: 'X19', category: 'presentation', name: 'Анимированная презентация (видео со слайдов)', unit: 'слайд', price: { RU: 1200, US: 55, EU: 42 }, dailyRate: 10 },
  { id: 'X20', code: 'X20', category: 'video', name: 'Смена исполнителя: «смена/день»', unit: 'день', price: { RU: 20000, US: 1000, EU: 700 }, dailyRate: 1 },
]

export const SERVICES_BY_ID: Record<string, ServiceItem> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s]),
)

// 2.4 Презентации — отдельная модель (база + ставка за слайд)
export interface PresentationType {
  code: 'P1' | 'P2' | 'P3'
  name: string
  price: { RU: number; US: number; EU: number }
}

export const PRESENTATION_TYPES: PresentationType[] = [
  { code: 'P1', name: 'Презентация с нуля', price: { RU: 800, US: 25, EU: 22 } },
  { code: 'P2', name: 'Редизайн готовой презентации', price: { RU: 500, US: 15, EU: 13 } },
  { code: 'P3', name: 'Слайды с инфографикой и схемами', price: { RU: 1500, US: 40, EU: 38 } },
]

export const PRESENTATION_BASE = { RU: 8000, US: 300, EU: 220 }
export const PRESENTATION_DAILY_RATE = 10

export const CATEGORY_LABELS: Record<ServiceItem['category'], string> = {
  design: 'Дизайн',
  neuro: 'Нейрогенерации',
  video: 'Видео и анимация',
  presentation: 'Презентации',
}
