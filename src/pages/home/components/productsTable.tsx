import React, { useCallback, useContext, useState } from 'react';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductContext } from '../../../context/product';
import $ from 'jquery';
import { ViewProductModal } from './viewProductModal';
import { DeleteProductModal } from './deleteProductModal';

export const ProductsTable: React.FC = () => {
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState<Product>({} as Product);

  const handleViewProduct = useCallback((product: Product) => {
    setProduct(product);

    $('#viewProductModal').modal('show');
  }, []);

  const handleDeleteProduct = useCallback((product: Product) => {
    setProduct(product);

    $('#deleteProductModal').modal('show');
  }, []);

  return (
    <>
    <table className="table table-bordered table-striped table-hover">
      <thead>
        <tr className="text-center">
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id} className="text-center">
            <th scope="row" className="text-center">{product.id}</th>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
              <button
                className="btn btn-sm btn-primary m-1"
                title="View"
                onClick={() => handleViewProduct(product)}
              >
                <FontAwesomeIcon icon={faEye} size="1x" />
              </button>
              <button className="btn btn-sm btn-secondary m-1" title="Edit">
                <FontAwesomeIcon icon={faPencilAlt} size="1x" />
              </button>
              <button
                className="btn btn-sm btn-danger m-1"
                title="Delete"
                onClick={() => handleDeleteProduct(product)}
              >
                <FontAwesomeIcon icon={faTrash} size="1x" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <ViewProductModal product={product} />
    <DeleteProductModal product={product} />
    </>
  );
}