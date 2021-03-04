export interface GetProductsQuery {
  page?: number;
  limit?: number;
  sort?: string;
  name?: string;
  sku?: string;
  fromPrice?: number;
  toPrice?: number;
  fromDate? :string;
  toDate? :string;
}