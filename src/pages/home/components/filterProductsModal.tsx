import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../context/product';
import { ProductFilter } from '../../../shared/interfaces/productFilter.interface';
import { ValidationErrors } from '../../../utils/validationErrors';
import $ from 'jquery';

interface FormInputs extends ProductFilter, ValidationErrors { };

export const FilterProductsModal: React.FC = () => {
  const { filters, setFilters } = useContext(ProductContext);
  const [name, setName] = useState<string>(filters.name || '');
  const [sku, setSku] = useState<string>(filters.sku || '');
  const [validationErrors, setValidationErrors] = useState<FormInputs | null>(null);

  useEffect(() => {
    filters.name && setName(filters.name);
  }, [filters]);

  function setNameHandler(value: string) {
    if (validationErrors?.name) {
      setValidationErrors({ ...validationErrors, name: '' });
    }

    setName(value);
  }

  function setSkuHandler(value: string) {
    if (validationErrors?.sku) {
      setValidationErrors({ ...validationErrors, sku: '' });
    }

    setSku(value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    await setFilters({
      name: name || undefined,
      sku: sku || undefined,
    });

    $('#filterProductModal').modal('hide');
  }

  async function handleClearInputs(): Promise<void> {
    setFilters({});
    setName('');
    setSku('');
  }

  return (
    <div className="modal fade" id="filterProductModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="filterProductModalLabel">Filter Products</h5>
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
                <label htmlFor="sku" className="mb-0">
                  <small>SKU</small>
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-control ${validationErrors?.sku ? 'is-invalid' : ''}`}
                  value={sku}
                  onChange={e => setSkuHandler(e.target.value)}
                />
                {validationErrors?.sku && (
                  <span className="invalid-feedback" role="alert">
                    <strong>{validationErrors.sku}</strong>
                  </span>
                )}
              </div>
              <div className="d-flex align-items-center justify-content-around form-group mb-0">
                <button type="button" className="btn btn-danger" data-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleClearInputs}>
                  Clear
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Filter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}