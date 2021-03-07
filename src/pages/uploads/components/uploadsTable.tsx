import React, { useCallback, useContext, useEffect, useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import { UploadContext } from '../../../context/upload';
import { Upload } from '../../../shared/interfaces/upload.interface';
import { ViewUploadModal } from './viewUploadModal';

export const UploadsTable: React.FC = () => {
  const { uploads, getUploads } = useContext(UploadContext);
  const [upload, setUpload] = useState<Upload>({} as Upload);

  useEffect(() => {
    getUploads();
  }, [getUploads]);

  const handleViewUpload = useCallback((upload: Upload) => {
    setUpload(upload);

    $('#viewUploadModal').modal('show');
  }, []);

  return (
    <>
    <table className="table table-bordered table-striped table-hover table-responsive-sm">
      <thead>
        <tr className="text-center">
          <th scope="col">Id</th>
          <th scope="col">Path</th>
          <th scope="col">Size</th>
          <th scope="col">Creation Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {uploads.map(upload => (
          <tr key={upload.id} className="text-center">
            <th scope="row" className="text-center">{upload.id}</th>
            <td>{upload.path}</td>
            <td>{upload.size}</td>
            <td>{new Date(upload.created_at).toLocaleDateString()}</td>
            <td>
              <button
                className="btn btn-sm btn-primary m-1"
                title="View"
                onClick={() => handleViewUpload(upload)}
              >
                <FontAwesomeIcon icon={faEye} size="1x" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <ViewUploadModal upload={upload} />
    </>
  );
}