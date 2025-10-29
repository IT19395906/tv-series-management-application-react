import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../Sidebar.css'
import Swal from 'sweetalert2';

function Sidebar() {
    const [theme, setTheme] = useState('light');

    const navigate = useNavigate();

    function toggleTheme() {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    }, [theme]);


    function logout() {
        Swal.fire({
            title: "Are you sure want to logout ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(result => {
            if (result.isConfirmed) {
                localStorage.removeItem('jwtToken');
                navigate('/login');
            }
        })
    }

    return (
        <div>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <button className="btn btn-dark" onClick={toggleTheme}>{theme === 'light' ? '🌙 Dark' : '☀️ Light'}</button>
                        {localStorage.getItem('jwtToken') && (<button className='btn btn-outline-danger ms-2' onClick={logout}>🔒 Logout</button>)}
                    </div>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ maxWidth: '9rem' }}>
                        <div className="offcanvas-header" style={{ paddingBottom: '0px' }}>
                            <h3 className="offcanvas-title" id="offcanvasNavbarLabel"><Link className="text-dark" to="/home"><i className='fa fa-home'></i></Link></h3>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to="/add" className="nav-link">Add</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/latest" className="nav-link">Latest</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/shortcut?type=genre" className="nav-link">Genre</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/shortcut?type=year" className="nav-link">Year</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/shortcut?type=language" className="nav-link">Language</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/view" className="nav-link">View All</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/upcoming" className="nav-link">Upcoming</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar