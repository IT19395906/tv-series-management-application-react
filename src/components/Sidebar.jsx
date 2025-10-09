import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import '../Sidebar.css'

function Sidebar() {
    const [theme, setTheme] = useState('light');

    function toggleTheme() {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <div>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <button className="btn btn-dark" onClick={toggleTheme}>{theme === 'light' ? '🌙 Dark' : '☀️ Light'}</button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ maxWidth: '9rem' }}>
                        <div className="offcanvas-header" style={{ paddingBottom: '0px' }}>
                            <h3 className="offcanvas-title" id="offcanvasNavbarLabel"><Link className="text-dark" to="/home"><i className='fa fa-home'></i></Link></h3>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/add">Add</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="/view">View All</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Upcoming</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact Us</a>
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