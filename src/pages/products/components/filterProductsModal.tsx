import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../context/product';
import { ProductFilter } from '../../../shared/interfaces/productFilter.interface';
import { getValidationErrors, ValidationErrors } from '../../../utils/validationErrors';
import $ from 'jquery';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

interface FormInputs extends ProductFilter, ValidationErrors { };

export const FilterProductsModal: React.FC = () => {
  const { filters, setFilters } = useContext(ProductContext);
  const [name, setName] = useState<string>(filters.name || '');
  const [sku, setSku] = useState<string>(filters.sku || '');
  const [fromPrice, setFromPrice] = useState<string>(filters.fromPrice || '');
  const [toPrice, setToPrice] = useState<string>(filters.toPrice || '');
  const [fromStock, setFromStock] = useState<string>(filters.fromStock || '');
  const [toStock, setToStock] = useState<string>(filters.toStock || '');
  const [fromDate, setFromDate] = useState<string>(filters.fromDate || '');
  const [toDate, setToDate] = useState<string>(filters.toDate || '');
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

  function setFromPriceHandler(value: string) {
    if (validationErrors?.fromPrice) {
      setValidationErrors({ ...validationErrors, fromPrice: '' });
    }

    setFromPrice(value);
  }

  function setToPriceHandler(value: string) {
    if (validationErrors?.toPrice) {
      setValidationErrors({ ...validationErrors, toPrice: '' });
    }

    setToPrice(value);
  }

  function setFromStockHandler(value: string) {
    if (validationErrors?.fromStock) {
      setValidationErrors({ ...validationErrors, fromStock: '' });
    }

    setFromStock(value);
  }

  function setToStockHandler(value: string) {
    if (validationErrors?.toStock) {
      setValidationErrors({ ...validationErrors, toStock: '' });
    }

    setToStock(value);
  }

  function setFromDateHandler(value: string) {
    if (validationErrors?.fromDate) {
      setValidationErrors({ ...validationErrors, fromDate: '' });
    }

    setFromDate(value);
  }

  function setToDateHandler(value: string) {
    if (validationErrors?.toDate) {
      setValidationErrors({ ...validationErrors, toDate: '' });
    }

    setToDate(value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    try {
      const schema = Yup.object().shape({
        name: Yup.string().notRequired(),
        sku: Yup.string().notRequired(),
        fromPrice: Yup.number()
          .transform(v => isNaN(v) ? undefined : v)
          .notRequired()
          .positive(),
        toPrice: Yup.number()
          .transform(v => isNaN(v) ? undefined : v)
          .notRequired()
          .positive(),
        fromStock: Yup.number()
          .transform(v => isNaN(v) ? undefined : v)
          .notRequired()
          .positive(),
        toStock: Yup.number()
          .transform(v => isNaN(v) ? undefined : v)
          .notRequired()
          .positive(),
        fromDate: Yup.date()
          .transform(v => isNaN(Date.parse(v)) ? undefined : v)
          .notRequired(),
        toDate: Yup.date()
          .transform(v => isNaN(Date.parse(v)) ? undefined : v)
          .notRequired(),
      });

      await schema.validate({
        name,
        sku,
        fromPrice,
        toPrice,
        fromStock,
        toStock,
        fromDate,
        toDate,
      }, {
        abortEarly: false,
      });

      await setFilters({
        ...name && { name },
        ...sku && { sku },
        ...fromPrice && { fromPrice },
        ...toPrice && { toPrice },
        ...fromStock && { fromStock },
        ...toStock && { toStock },
        ...fromDate && { fromDate },
        ...toDate && { toDate },
      });

      $('#filterProductModal').modal('hide');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(err);

        setValidationErrors(validationErrors as FormInputs);
      } else {
        toast.error('Invalid form data');
      }
    }
  }

  async function handleClearInputs(): Promise<void> {
    setFilters({});
    setName('');
    setSku('');
    setFromPrice('');
    setToPrice('');
    setFromStock('');
    setToStock('');
    setFromDate('');
    setToDate('');
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
              <div className="form-row mb-3 is-invalid">
                <div className="col">
                  <label htmlFor="fromPrice" className="mb-0">
                    <small>From price</small>
                  </label>
                  <input
                    id="fromPrice"
                    className="form-control" 
                    type="number"
                    value={fromPrice}
                    onChange={e => setFromPriceHandler(e.target.value)}
                  />
                  {validationErrors?.fromPrice && (
                    <span className="invalid-feedback d-inline-block" role="alert">
                      <strong>{validationErrors.fromPrice}</strong>
                    </span>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="toPrice" className="mb-0">
                    <small>To price</small>
                  </label>
                  <input
                    id="toPrice"
                    className="form-control"
                    type="number"
                    value={toPrice}
                    onChange={e => setToPriceHandler(e.target.value)}
                  />
                  {validationErrors?.toPrice && (
                    <span className="invalid-feedback d-inline-block" role="alert">
                      <strong>{validationErrors.toPrice}</strong>
                    </span>
                  )}
                </div>
              </div>
              <div className="form-row mb-3">
                <div className="col">
                  <label htmlFor="fromStock" className="mb-0">
                    <small>From stock</small>
                  </label>
                  <input
                    id="fromStock"
                    className="form-control" 
                    type="number"
                    value={fromStock}
                    onChange={e => setFromStockHandler(e.target.value)}
                  />
                  {validationErrors?.fromStock && (
                    <span className="invalid-feedback d-inline-block" role="alert">
                      <strong>{validationErrors.fromStock}</strong>
                    </span>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="toStock" className="mb-0">
                    <small>To stock</small>
                  </label>
                  <input
                    id="toStock"
                    className="form-control"
                    type="number"
                    value={toStock}
                    onChange={e => setToStockHandler(e.target.value)}
                  />
                  {validationErrors?.toStock && (
                    <span className="invalid-feedback d-inline-block" role="alert">
                      <strong>{validationErrors.toStock}</strong>
                    </span>
                  )}
                </div>
              </div>
              <div className="form-row mb-3">
                <div className="col">
                  <label htmlFor="fromDate" className="mb-0">
                    <small>From date</small>
                  </label>
                  <input
                    id="fromDate"
                    className="form-control" 
                    type="date"
                    value={fromDate}
                    onChange={e => setFromDateHandler(e.target.value)}
                  />
                  {validationErrors?.fromDate && (
                    <span className="invalid-feedback d-inline-block" role="alert">
                      <strong>{validationErrors.fromDate}</strong>
                    </span>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="toDate" className="mb-0">
                    <small>To date</small>
                  </label>
                  <input
                    id="toDate"
                    className="form-control"
                    type="date"
                    value={toDate}
                    onChange={e => setToDateHandler(e.target.value)}
                  />
                  {validationErrors?.toDate && (
                    <span className="invalid-feedback d-inline-block" role="alert">
                      <strong>{validationErrors.toDate}</strong>
                    </span>
                  )}
                </div>
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