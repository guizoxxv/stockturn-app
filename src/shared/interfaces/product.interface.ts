import { StockTimeline } from './stockTimeline.interface';

export interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  stock: number;
  stockTimeline?: StockTimeline[]
  created_at: string;
  updated_at: string;
}