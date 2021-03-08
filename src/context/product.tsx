
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react';
import { Product } from '../shared/interfaces/product.interface';
import {
  createProductRequest,
  deleteProductRequest,
  editProductRequest,
  getProductsRequest,
} from '../services/api';
import { PaginationContext } from './pagination';
import { ProductCreate } from '../shared/interfaces/productCreate.interface';
import { ProductUpdate } from '../shared/interfaces/productUpdate.interface';
import { ProductFilter } from '../shared/interfaces/productFilter.interface';
import { toast } from 'react-toastify';

interface ProductContextData {
  products: Product[],
  filters: ProductFilter,
  setFilters: Dispatch<SetStateAction<ProductFilter>>,
  getProducts(): void,
  deleteProduct(productId: number): void,
  createProduct(product: ProductCreate): void,
  editProduct(product: ProductUpdate): void,
}

export const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData
);

export const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilter>({} as ProductFilter);
  const { setPagination } = useContext(PaginationContext);

  const getProducts = useCallback(async (): Promise<void> => {
    try {
      const response = await getProductsRequest(filters);

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
      });
    } catch (err) {
      toast.error('Fail to get products');
    }
  }, [filters, setPagination]);

  const deleteProduct = useCallback(async (productId) => {
    try {
      await deleteProductRequest(productId);

      await getProducts();

      toast.success('Product deleted');
    } catch (err) {
      toast.error('Fail to delete product');
    }
  }, [getProducts]);

  const createProduct = useCallback(async (product: ProductCreate): Promise<void> => {
    try {
      await createProductRequest(product);

      await getProducts();

      toast.success('Product created');
    } catch (err) {
      toast.error('Fail to create product');
    }
  }, [getProducts]);

  const editProduct = useCallback(async (product: ProductUpdate): Promise<void> => {
    try {
      await editProductRequest(product);

      await getProducts();

      toast.success('Product updated');
    } catch (err) {
      toast.error('Fail to update product');
    }
  }, [getProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filters,
        setFilters,
        getProducts,
        deleteProduct,
        createProduct,
        editProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};