
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Product } from '../shared/interfaces/product.interface';
import { getProductsRequest } from '../services/api';
import { PaginationContext } from './pagination';

interface ProductContextData {
  products: Product[],
  getProducts(link: string | null): void,
}

export const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData
);

export const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { setPagination } = useContext(PaginationContext);

  const getProducts = useCallback(async (link: string | null): Promise<void> => {
    try {
      const response = await getProductsRequest(link);

      const {
        data,
        current_page,
        first_page_url,
        from,
        last_page,
        last_page_url,
        links,
        next_page_url,
        path,
        per_page,
        prev_page_url,
        to,
        total,
      } = response;

      setProducts(data);
      setPagination({
        current_page,
        first_page_url,
        from,
        last_page,
        last_page_url,
        links,
        next_page_url,
        path,
        per_page,
        prev_page_url,
        to,
        total,
      })
    } catch (err) {
      console.log('Fail to get products');
    }
  }, [setPagination]);

  useEffect(() => {
    getProducts(null);
  }, [getProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};