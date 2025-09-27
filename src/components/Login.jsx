import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

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
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4 card shadow-lg">
                    <div className="card-body">
                        <h4 className="text-center mb-4">Login</h4>
                        <form onSubmit={handleSubmit}>
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
                            <div className="alert alert-danger small py-1">Invalid Credentials</div>
                            <small> <a>Forgot Password ?</a></small>
                            <button type="submit" className="mt-2 btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
