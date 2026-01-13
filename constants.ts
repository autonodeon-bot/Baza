
import { Specialist, Category } from './types';

export const CATEGORIES: Category[] = [
  'няня', 'уборка', 'грузчик', 'сантехник', 'передержка', 'репетитор', 'мастер на час', 'другое'
];

export const DISTRICTS = ['Центральный', 'Приморский', 'Выборгский', 'Московский', 'Калининский'];

export const MOCK_SPECIALISTS: Specialist[] = [
  {
    id: '1',
    name: 'Анна Сергеевна',
    category: 'няня',
    avatar: 'https://picsum.photos/seed/anna/200',
    rating: 4.9,
    reviewsCount: 124,
    pricePerHour: 500,
    description: 'Опытная няня, педагогическое образование. Живу в ЖК "Светлый Мир". Могу посидеть с ребенком от 2-х лет.',
    location: [59.9386, 30.3141],
    tsjName: 'ТСЖ Светлый Мир',
    district: 'Центральный',
    phone: '+7 (999) 123-45-67',
    isOnline: true
  },
  {
    id: '2',
    name: 'Иван Петров',
    category: 'сантехник',
    avatar: 'https://picsum.photos/seed/ivan/200',
    rating: 4.7,
    reviewsCount: 89,
    pricePerHour: 1200,
    description: 'Мастер на все руки. Установка смесителей, ремонт труб, чистка засоров. Быстро и качественно.',
    location: [59.9420, 30.3250],
    tsjName: 'ТСЖ Парус',
    district: 'Центральный',
    phone: '+7 (999) 765-43-21',
    isOnline: false
  },
  {
    id: '3',
    name: 'Мария Волкова',
    category: 'передержка',
    avatar: 'https://picsum.photos/seed/maria/200',
    rating: 5.0,
    reviewsCount: 45,
    pricePerHour: 400,
    description: 'Люблю собак и кошек! Возьму вашего питомца на время отпуска. У меня большая квартира и много игрушек.',
    location: [59.9500, 30.3000],
    tsjName: 'ЖК Адмирал',
    district: 'Приморский',
    phone: '+7 (900) 111-22-33',
    isOnline: true
  },
  {
    id: '4',
    name: 'Сергей Николаев',
    category: 'грузчик',
    avatar: 'https://picsum.photos/seed/sergey/200',
    rating: 4.5,
    reviewsCount: 210,
    pricePerHour: 600,
    description: 'Крепкий и аккуратный. Помогу с переездом, выносом мусора или сборкой мебели.',
    location: [59.9300, 30.3500],
    tsjName: 'ТСЖ Озерки',
    district: 'Выборгский',
    phone: '+7 (911) 222-33-44',
    isOnline: true
  }
];
