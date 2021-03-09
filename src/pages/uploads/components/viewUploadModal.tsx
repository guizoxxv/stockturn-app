import React from 'react';
import { Upload } from '../../../shared/interfaces/upload.interface';

interface ViewUploadModalData {
  upload: Upload,
}

export const ViewUploadModal: React.FC<ViewUploadModalData> = ({ upload }) => (
  <div className="modal fade" id="viewUploadModal" tabIndex={-1} aria-labelledby="viewUploadModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="viewUploadModalLabel">View Upload</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div>
            <span className="font-weight-bold">Id:</span> <span>{upload.id}</span>
          </div>
          <div>
            <span className="font-weight-bold">Path:</span> <span>{upload.path}</span>
          </div>
          <div>
            <span className="font-weight-bold">Size:</span> <span>{upload.size}</span>
          </div>
          <div>
            <span className="font-weight-bold">Type:</span> <span>{upload.type}</span>
          </div>
          <div>
            <span className="font-weight-bold">Status:</span> <span>{upload.status}</span>
          </div>
          <div>
            <span className="font-weight-bold">Creation date:</span> <span>{new Date(upload.created_at).toLocaleString()}</span>
          </div>
          <div>
            <span className="font-weight-bold">Last update date:</span> <span>{new Date(upload.updated_at).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);