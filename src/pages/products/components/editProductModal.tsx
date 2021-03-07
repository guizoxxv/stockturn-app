import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { getValidationErrors, ValidationErrors } from '../../../utils/validationErrors';
import { EditProductData } from '../../../shared/interfaces/editProductData.interface'
import { ProductContext } from '../../../context/product';
import $ from 'jquery';
import { Product } from '../../../shared/interfaces/product.interface';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

interface FormInputs extends EditProductData, ValidationErrors {};

interface EditProductModalData {
  product: Product,
}

export const EditProductModal: React.FC<EditProductModalData> = ({ product }) => {
  const { editProduct } = useContext(ProductContext);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<FormInputs | null>(null);

  useEffect(() => {
    product.name && setName(product.name);
    product.price && setPrice(product.price.toString());
    product.stock && setStock(product.stock.toString());
  }, [product]);

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

    try {
      const schema = Yup.object().shape({
        name: Yup.string().notRequired(),
        price: Yup.number()
          .transform(v => isNaN(v) ? undefined : v)
          .notRequired()
          .positive(),
        stock: Yup.number()
          .transform(v => isNaN(v) ? undefined : v)
          .notRequired()
          .integer()
          .positive(),
      });

      await schema.validate({
        name,
        price,
        stock,
      }, {
        abortEarly: false,
      });

      await editProduct({
        id: product.id,
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
      });

      $('#editProductModal').modal('hide');

      clearInputs();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(err);

        setValidationErrors(validationErrors as FormInputs);
      } else {
        toast.error('Invalid form data');
      }
    }
  }

  function clearInputs(): void {
    setName('');
    setPrice('');
    setStock('');
  }

  return (
    <div className="modal fade" id="editProductModal" tabIndex={-1} aria-labelledby="editProductModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProductModalLabel">Edit Product</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="mb-0">
                  <small>Name</small>
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
                  <small>Price</small>
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