
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Product } from '../shared/interfaces/product.interface';
import { createProductRequest, deleteProductRequest, getProductsRequest } from '../services/api';
import { PaginationContext } from './pagination';
import { ProductCreate } from '../shared/interfaces/productCreate.interface';

interface ProductContextData {
  products: Product[],
  getProducts(link: string | null): void,
  deleteProduct(productId: number): void,
  createProduct(product: ProductCreate): void,
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

  const deleteProduct = useCallback(async (productId) => {
    try {
      await deleteProductRequest(productId);

      await getProducts(null);
    } catch (err) {
      console.log('Fail to delete product');
    }
  }, [getProducts]);

  const createProduct = useCallback(async (product: ProductCreate) => {
    try {
      await createProductRequest(product);

      await getProducts(null);
    } catch (err) {
      console.log('Fail to create product');
    }
  }, [getProducts]);

  useEffect(() => {
    getProducts(null);
  }, [getProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        deleteProduct,
        createProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};