import React, { FormEvent, useContext, useState } from 'react';
import { ValidationErrors } from '../../../utils/validationErrors';
import { ProductContext } from '../../../context/product';
import $ from 'jquery';
import { BulkUpsertProductsData } from '../../../shared/interfaces/bulkUpsertProductData.interface';
import { ProductUpsert } from '../../../shared/interfaces/ProductUpsert.interface';

interface FormInputs extends BulkUpsertProductsData, ValidationErrors { };

export const BulkUpsertProductsModal: React.FC = () => {
  const { bulkUpsertProducts } = useContext(ProductContext);
  const [products, SetProducts] = useState<ProductUpsert[]>([]);
  const [validationErrors, setValidationErrors] = useState<FormInputs | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    await bulkUpsertProducts(products);

    $('#bulkUpsertProductsModal').modal('hide');

    clearInputs();
  }

  function clearInputs(): void {
    //
  }

  return (
    <div className="modal fade" id="bulkUpsertProductsModal" tabIndex={-1} aria-labelledby="bulkUpsertProductsModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="bulkUpsertProductsModalLabel">Edit Product</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="d-flex align-items-center justify-content-around form-group mb-0">
                <button type="button" className="btn btn-danger" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}