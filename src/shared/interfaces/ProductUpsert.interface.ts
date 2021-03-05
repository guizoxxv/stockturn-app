import { EditProductData } from './editProductData.interface';

export interface ProductUpsert extends EditProductData {
  id?: number;
}