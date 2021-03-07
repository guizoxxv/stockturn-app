import React, { useCallback } from 'react'
import { Header } from '../../shared/components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { UploadsTable } from './components/uploadsTable';
import $ from 'jquery';
import { UploadCsvModal } from './components/uploadCsvModal';

export const UploadsPage: React.FC = () => {
  const handleUploadCsv = useCallback(() => {
    $('#uploadCsvModal').modal('show');
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4 className="mb-0">Uploads List</h4>
          <div className="d-flex align-items-center justify-content-center flex-wrap">
            <button
              className="btn btn-secondary m-1"
              onClick={handleUploadCsv}
            >
              <FontAwesomeIcon icon={faUpload} size="1x" className="mr-1" />
              New
            </button>
          </div>
        </div>
        <UploadsTable />
      </main>
      <UploadCsvModal />
    </>
  );
}