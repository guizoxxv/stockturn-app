import React from 'react';
import { Product } from '../../../shared/interfaces/product.interface';

interface ViewProductModalData {
  product: Product,
}

export const ViewProductModal: React.FC<ViewProductModalData> = ({ product }) => (
  <div className="modal fade" id="viewProductModal" tabIndex={-1} aria-labelledby="viewProductModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="viewProductModalLabel">View Product</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div>
            <span className="font-weight-bold">Id:</span> <span>{product.id}</span>
          </div>
          <div>
            <span className="font-weight-bold">Name:</span> <span>{product.name}</span>
          </div>
          <div>
            <span className="font-weight-bold">SKU:</span> <span>{product.sku}</span>
          </div>
          <div>
            <span className="font-weight-bold">Price:</span> <span>{product.price}</span>
          </div>
          <div>
            <span className="font-weight-bold">Stock:</span> <span>{product.stock}</span>
          </div>
          <div>
            <span className="font-weight-bold">Creation date:</span> <span>{product.created_at}</span>
          </div>
          <div>
            <span className="font-weight-bold">Last update date:</span> <span>{product.updated_at}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);