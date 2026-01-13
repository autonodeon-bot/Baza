
export type Category = 'няня' | 'уборка' | 'грузчик' | 'сантехник' | 'передержка' | 'репетитор' | 'мастер на час' | 'другое';

export interface Specialist {
  id: string;
  name: string;
  category: Category;
  avatar: string;
  rating: number;
  reviewsCount: number;
  pricePerHour: number;
  description: string;
  location: [number, number];
  tsjName: string;
  district: string;
  phone: string;
  isOnline: boolean;
}

export interface Filters {
  category: Category | 'all';
  district: string;
  maxPrice: number;
  searchQuery: string;
}
