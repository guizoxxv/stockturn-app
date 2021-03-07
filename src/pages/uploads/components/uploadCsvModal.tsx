import React, { FormEvent, useContext, useState } from 'react';
import { ValidationErrors } from '../../../utils/validationErrors';
import { UploadContext } from '../../../context/upload';
import $ from 'jquery';
import { UploadCsvData } from '../../../shared/interfaces/uploadCsvData.interface';

interface FormInputs extends UploadCsvData, ValidationErrors { };

export const UploadCsvModal: React.FC = () => {
  const { uploadCsv } = useContext(UploadContext);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [validationErrors, setValidationErrors] = useState<FormInputs | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const data = new FormData();

    data.append('file', file as Blob);

    await uploadCsv(data);

    $('#uploadCsvModal').modal('hide');

    clearInputs();
  }

  function setFileHandler(value: File | undefined) {
    if (validationErrors?.file) {
      setValidationErrors({ ...validationErrors, file: undefined });
    }

    setFile(value);
  }

  function clearInputs(): void {
    setFile(undefined);

    $('#file').val('');
  }

  return (
    <div className="modal fade" id="uploadCsvModal" tabIndex={-1} aria-labelledby="uploadCsvModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="uploadCsvModalLabel">Upload CSV</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="file">File</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="file"
                  onChange={e => setFileHandler(e.target?.files?.[0])}
                />
                <small id="fileHelpBlock" className="form-text text-muted">
                  File must be .csv &lt; 2Mb size
                </small>
              </div>
              <div className="d-flex align-items-center justify-content-around form-group mb-0">
                <button type="button" className="btn btn-danger" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}