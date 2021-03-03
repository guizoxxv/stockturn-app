import React, { useContext, useEffect, useState } from 'react'
import { LoginCredentials } from '../../interfaces/loginCredentials.interface';
import { getValidationErrors, ValidationErrors } from '../../utils/validationErrors';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/auth';
import { flashToast } from '../../utils/flash';

interface FormInputs extends LoginCredentials, ValidationErrors {};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<FormInputs | null>(null);
  const { login } = useContext(AuthContext);
  
  useEffect(() => {
    flashToast();
  }, []);

  async function handleLogin(): Promise<void> {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      await schema.validate({
        email,
        password,
      }, {
        abortEarly: false,
      });

      await login({
        email,
        password,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(err);

        setValidationErrors(validationErrors as FormInputs);
      } else {
        toast.error('Login failed');
      }
    }
  }

  function setEmailHandler(value: string) {
    if (validationErrors?.email) {
      setValidationErrors({ ...validationErrors, email: '' });
    }

    setEmail(value);
  }

  function setPasswordHandler(value: string) {
    if (validationErrors?.password) {
      setValidationErrors({ ...validationErrors, password: '' });
    }

    setPassword(value);
  }
  
  return (
    <>
    <h2 className="text-center p-2 mb-0">Products App</h2>
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="card">
        <div className="card-body">
          <div className="form-group mb-3">
            <label htmlFor="email" className="mb-0">
              <small>Email<span className="text-danger">*</span></small>
            </label>
            <input
              id="username"
              type="text"
              className={`form-control ${validationErrors?.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={e => setEmailHandler(e.target.value)}
            />
              {validationErrors?.email && (
              <span className="invalid-feedback" role="alert">
                <strong>{validationErrors.email}</strong>
              </span>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="mb-0">
              <small>Password<span className="text-danger">*</span></small>
            </label>
            <input
              id="password"
              type="password"
              className={`form-control ${validationErrors?.password ? 'is-invalid' : ''}`}
              value={password}
              onChange={e => setPasswordHandler(e.target.value)}
            />
            {validationErrors?.password && (
              <span className="invalid-feedback" role="alert">
                <strong>{validationErrors.password}</strong>
              </span>
            )}
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;