import React from 'react'

function Sidebar() {
    return (
        <div>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{maxWidth:'9rem'}}>
                        <div className="offcanvas-header" style={{paddingBottom:'0px'}}>
                            <h3 className="offcanvas-title" id="offcanvasNavbarLabel"><i className='fa fa-home'></i></h3>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/add">Add</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">View All</a>
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