import React, { FormEvent, useContext, useState } from 'react';
import { ValidationErrors } from '../../../utils/validationErrors';
import { CreateProductData } from '../../../shared/interfaces/createProductData.interface';
import { ProductContext } from '../../../context/product';
import $ from 'jquery';

interface FormInputs extends CreateProductData, ValidationErrors { };

export const CreateProductModal: React.FC = () => {
  const { createProduct } = useContext(ProductContext);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<FormInputs | null>(null);

  function setNameHandler(value: string) {
    if (validationErrors?.name) {
      setValidationErrors({ ...validationErrors, name: '' });
    }

    setName(value);
  }

  function setPriceHandler(value: string) {
    if (validationErrors?.price) {
      setValidationErrors({ ...validationErrors, price: '' });
    }

    setPrice(value);
  }

  function setStockHandler(value: string) {
    if (validationErrors?.stock) {
      setValidationErrors({ ...validationErrors, stock: '' });
    }

    setStock(value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    await createProduct({
      name,
      price: parseFloat(price),
      stock: parseInt(stock) || undefined,
    });

    $('#createProductModal').modal('hide');

    clearInputs();
  }

  function clearInputs(): void {
    setName('');
    setPrice('');
    setStock('');
  }

  return (
    <div className="modal fade" id="createProductModal" tabIndex={-1} aria-labelledby="createProductModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createProductModalLabel">Create Product</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="mb-0">
                  <small>Name<span className="text-danger">*</span></small>
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-control ${validationErrors?.name ? 'is-invalid' : ''}`}
                  value={name}
                  onChange={e => setNameHandler(e.target.value)}
                />
                {validationErrors?.name && (
                  <span className="invalid-feedback" role="alert">
                    <strong>{validationErrors.name}</strong>
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="price" className="mb-0">
                  <small>Price<span className="text-danger">*</span></small>
                </label>
                <input
                  id="price"
                  type="number"
                  className={`form-control ${validationErrors?.price ? 'is-invalid' : ''}`}
                  value={price}
                  onChange={e => setPriceHandler(e.target.value)}
                />
                {validationErrors?.price && (
                  <span className="invalid-feedback" role="alert">
                    <strong>{validationErrors.price}</strong>
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="stock" className="mb-0">
                  <small>Stock</small>
                </label>
                <input
                  id="stock"
                  type="number"
                  className={`form-control ${validationErrors?.stock ? 'is-invalid' : ''}`}
                  value={stock}
                  onChange={e => setStockHandler(e.target.value)}
                />
                {validationErrors?.stock && (
                  <span className="invalid-feedback" role="alert">
                    <strong>{validationErrors.stock}</strong>
                  </span>
                )}
              </div>
              <div className="d-flex align-items-center justify-content-around form-group mb-0">
                <button type="button" className="btn btn-danger" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}