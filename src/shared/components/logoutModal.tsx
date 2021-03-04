import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import $ from 'jquery';

export const LogoutModal: React.FC = () => {
  const { logout } = useContext(AuthContext);

  const handleConfirm = () => {
    logout();

    $('#logoutModal').modal('hide');
  }

  return (
    <div className="modal fade" id="logoutModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              Confirm logout?
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-danger" data-dismiss="modal">
              No
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}