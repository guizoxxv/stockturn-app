import { Product } from './product.interface';
import { Pagination } from './pagination.interface';

export interface GetProductsResponse extends Pagination {
  data: Product[],
}