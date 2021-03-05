import { ProductUpsert } from './ProductUpsert.interface';

export interface BulkUpsertProductsData {
  products: ProductUpsert[];
}