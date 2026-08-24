import { IMG } from './images'
import type { PortfolioProject } from '../types/portfolio'

export const PROJECTS: PortfolioProject[] = [
  {
    id: 'alfa-mascots',
    title: 'Маскоты для «Альфа Страхование — Жизнь»',
    subtitle: 'Персонажи, сценарии, анимация для обучающих материалов',
    category: 'mascots',
    categoryLabel: 'Маскоты',
    year: '2025 — н.в.',
    tags: ['Маскоты', 'Сценарий', 'AI-анимация'],
    cover: IMG.alfa.hero,
    task:
      'Сделать сухое и обязательное корпоративное обучение для менеджеров более интересным и запоминающимся. Необходимо было найти формат, который бы легко объяснял сложные страховые продукты и повышал процент прохождения курсов.',
    role: [
      'Разработка концепции и визуального стиля персонажей-маскотов.',
      'Написание сценариев для коротких обучающих видео.',
      'Создание иллюстраций и раскадровок.',
      'Анимация персонажей и монтаж готовых видео в CapCut.',
      'Работа со звуком и озвучкой персонажей.',
    ],
    nda: 'В связи с подписанным NDA я могу показать только общую часть работы. Все детали, раскрывающие коммерческую тайну, скрыты.',
    gallery: [
      IMG.alfa.catFullBody,
      IMG.alfa.catPaw,
      IMG.alfa.catStanding,
      IMG.alfa.manAndCatFull,
      IMG.alfa.manPortrait,
      IMG.alfa.manFullBody,
      IMG.alfa.manAndCatBack,
    ],
  },
  {
    id: 'domashniy-social',
    title: 'Коммуникационный дизайн «Домашний»',
    subtitle: 'Дизайн для социальных сетей телеканала «Домашний»',
    category: 'social',
    categoryLabel: 'Соц.сети',
    year: '2023 — 2026 г.',
    tags: ['Маскот', 'Соцсети', 'Стикерпак'],
    cover: IMG.domashniy.pinkGifts,
    task:
      'Создать комплексное визуальное оформление для цифровых платформ канала (сайт, социальные сети) в строгом соответствии с гайдбуком и эфирной айдентикой. Ключевой целью была разработка маскота — персонажа, который бы эмоционально связал бренд с аудиторией и транслировал его ценности: сочетание трогательности и иронии.',
    role: [
      'Разработала маскота канала — «Даму-мелодраму».',
      'Заложила в образ ключевые смыслы бренда: пташка как «голос сердца» зрительницы, сочетание трогательности и иронии.',
      'На основе персонажа собрала полный пакет креативов для digital: шаблоны постов, обложки соцсетей, графику для сайта, стикерпак с актёрами канала.',
      'Всё — в рамках гайдбука и эфирной айдентики.',
    ],
    gallery: [
      IMG.domashniy.pinkGifts,
      IMG.domashniy.couchTrophy,
      IMG.domashniy.giftPile,
      IMG.domashniy.couch,
      IMG.domashniy.stripedShirt,
      IMG.domashniy.ctaIncrease,
      IMG.domashniy.mascotLaptop,
    ],
  },
  {
    id: 'ecozavr-brand',
    title: 'Запуск бренда «Ecozavr»',
    subtitle: 'Айдентика и упаковка для бренда экологичной химии',
    category: 'branding',
    categoryLabel: 'Запуск бренда',
    year: '2020 — 2023 г.',
    tags: ['Брендинг', 'Упаковка', 'E-commerce'],
    cover: IMG.ecozavr.productGrid,
    task:
      'Рынок бытовой химии переполнен. Необходимо было разработать яркий и эмоциональный бренд, который бы доносил ценности экологичности и безопасности, но при этом не выглядел скучно. Ключевая задача — привлечь внимание семейной аудитории и владельцев домашних животных.',
    role: [
      'Разработка концепции дизайна упаковки с нуля.',
      'Создание логотипа — Экозавра.',
      'Участие в формировании позиционирования бренда.',
      'Подготовка макетов для всех SKU.',
    ],
    outcome: {
      title: 'Итог: статус бестселлера и лидера категории',
      stats: [
        { value: '51 900+', label: 'отзывов на один флагманский продукт' },
        { value: '4.9 / 5.0', label: 'средний рейтинг и абсолютное доверие аудитории' },
      ],
      footnote: 'Вывод: чистый, понятный и эмоциональный дизайн стал ключевым фактором коммерческого успеха бренда.',
    },
    gallery: [
      IMG.ecozavr.productGrid,
      IMG.ecozavr.adCover,
      IMG.ecozavr.bottleInHand,
      IMG.ecozavr.yellowBottleFlower,
      IMG.ecozavr.greenBottle,
      IMG.ecozavr.dualBottles,
      IMG.ecozavr.dogAndBottle,
      IMG.ecozavr.dogWash,
    ],
  },
  {
    id: 'presentations',
    title: 'Дизайн презентаций',
    subtitle: 'Превращение информации в ясное визуальное повествование',
    category: 'presentations',
    categoryLabel: 'Презентации',
    year: '2026',
    tags: ['Питч-дек', 'Инфографика', 'Сторителлинг'],
    cover: IMG.projects.socialCover,
    task:
      'Собрать несколько прикладных кейсов дизайна презентаций: от аналитического отчёта по логистике до концепции загородного дома в стиле Japandi, темы профессионального выгорания и разбора рынка социальных сетей.',
    role: [
      'Структурирование информации и разработка нарратива слайдов.',
      'Дизайн инфографики, диаграмм и визуализации данных.',
      'Единая система шаблонов для быстрой пересборки контента.',
    ],
    gallery: [
      IMG.projects.logisticsCover,
      IMG.projects.logisticsIntro,
      IMG.projects.cubeCover,
      IMG.projects.cubeJapandi,
      IMG.projects.cubeMasterclasses,
      IMG.projects.burnoutCover,
      IMG.projects.burnoutStatistics,
      IMG.projects.socialCover,
      IMG.projects.socialTimeline,
    ],
  },
]

export const PROJECT_BY_ID: Record<string, PortfolioProject> = Object.fromEntries(PROJECTS.map((p) => [p.id, p]))
