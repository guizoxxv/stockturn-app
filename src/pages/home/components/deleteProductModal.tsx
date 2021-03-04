import React, { useContext } from 'react';
import $ from 'jquery';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductContext } from '../../../context/product';

interface DeleteProductModalData {
  product: Product,
}

export const DeleteProductModal: React.FC<DeleteProductModalData> = ({ product }) => {
  const { deleteProduct } = useContext(ProductContext);
  
  const handleConfirm = async () => {
    await deleteProduct(product.id);

    $('#deleteProductModal').modal('hide');
  }

  return (
    <div className="modal fade" id="deleteProductModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              Confirm product "{product.name}" deletion?
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-danger" data-dismiss="modal">
              No
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}