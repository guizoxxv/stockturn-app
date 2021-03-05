export interface ProductFilter {
  page?: number;
  limit?: number;
  sort?: string;
  name?: string;
  sku?: string;
  fromPrice?: string;
  toPrice?: string;
  fromStock?: string;
  toStock?: string;
  fromDate?: string;
  toDate?: string;
}