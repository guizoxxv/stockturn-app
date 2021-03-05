export interface ProductFilter {
  page?: number;
  limit?: number;
  sort?: string;
  name?: string;
  sku?: string;
  fromPrice?: number;
  toPrice?: number;
  fromStock?: number;
  toStock?: number;
  fromDate?: string;
  toDate?: string;
}