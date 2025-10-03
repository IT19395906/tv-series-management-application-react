import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 0
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const show = () => {
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.trim() === '' || formData.password.trim() === '') {
      toast.warn('Please enter username and password', { toastId: "form-error" });
      return;
    }

    fetch('http://localhost:8080/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: formData.username.trim(), password: formData.password, role: formData.role }) })
      .then(response => {
        if (!response.ok) throw new Error('Http error');
        return response.json();
      })
      .then(result => {
        if (result.message == "User Register Successfully") {
          localStorage.setItem('userType', formData.role);
          navigate('/login');
        } else {
          toast.error('Register User Failed');
        }
      })
      .catch(error => {
        toast.error('Register User Failed', { toastId: "form-error" })
      });

  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <ToastContainer hideProgressBar stacked theme="colored" closeOnClick autoClose={3000} />
        <div className="col-lg-4 card shadow-lg">
          <div className="card-body">
            <h4 className="text-center mb-4">Register</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">User Type</label>
                <select id="role" className="form-select" name="role" value={formData.role} onChange={handleChange} required>
                  <option value="0">Normal User</option>
                  <option value="1">Admin</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" id="username" className="form-control" name="username" onChange={handleChange} value={formData.username} maxLength="50" required />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Password</label>
                <input type={showPassword ? 'text' : 'password'} id="password" className="form-control" name="password" onChange={handleChange} value={formData.password} required />
                <i className={showPassword ? 'fa fa-solid fa fa-eye-slash' : 'fa fa-solid fa fa-eye'} onClick={show}
                  style={{ position: 'absolute', cursor: 'pointer', right: ' 1rem', top: '2.7rem' }}></i>
              </div>
              <button type="submit" className="mt-2 btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;