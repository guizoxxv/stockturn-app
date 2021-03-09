import React, { useCallback, useContext, useEffect, useState } from 'react';
import { faCheckCircle, faCloudUploadAlt, faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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

  const getUploadStatus = (status: string): JSX.Element => {
    if (status === 'CREATED') {
      return <FontAwesomeIcon icon={faCloudUploadAlt} size="2x" title="Created" className="text-info" />;
    }

    if (status === 'PROCESSED') {
      return <FontAwesomeIcon icon={faCheckCircle} size="2x" title="Processed" className="text-success" />;
    }

    if (status === 'ERROR') {
      return <FontAwesomeIcon icon={faTimesCircle} size="2x" title="Error" className="text-danger" />;
    }

    return <span>'-'</span>;
  }

  return (
    <>
    <table className="table table-bordered table-striped table-hover table-responsive-sm">
      <thead>
        <tr className="text-center">
          <th scope="col">Id</th>
          <th scope="col">Path</th>
          <th scope="col">Creation Date</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {uploads.map(upload => (
          <tr key={upload.id} className="text-center">
            <th scope="row" className="text-center">{upload.id}</th>
            <td>{upload.path}</td>
            <td>{new Date(upload.created_at).toLocaleDateString()}</td>
            <td>{getUploadStatus(upload.status)}</td>
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