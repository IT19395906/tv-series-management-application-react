import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='container text-center mt-5'>
            <h1 className="display-4 text-danger">404 - Page Not Found</h1>
            <p className="lead">Oops! The page you're looking for doesn't exist.</p>
            <Link to='/login' className='btn btn-primary mt-3'>Go to Login</Link>
        </div>
    )
}

export default NotFound;