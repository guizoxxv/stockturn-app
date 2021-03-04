import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import $ from 'jquery';

export const ConfirmLogoutModal: React.FC = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();

    $('#confirmLogoutModal').modal('hide');
  }

  return (
    <div className="modal fade" id="confirmLogoutModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog">
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
              onClick={handleLogout}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}