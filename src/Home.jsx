import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import './Home.css';
import { Link } from "react-router-dom";

function Home() {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchPage(0);
    }, [])

    const fetchPage = (page) => {
        const params = new URLSearchParams({ page, size: 8 });
        fetch(`http://localhost:8080/api/tvseries/getAll?${params}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setData(data.content);
                setTotalElements(data.totalElements);
                setTotalPages(data.totalPages);
                setCurrentPage(page);
            })
            .catch(error => toast.error(error.message));
    };

    const first = () => { if (currentPage > 0) fetchPage(0); };

    const previous = () => { if (currentPage > 0) fetchPage(currentPage - 1); };

    const next = () => { if (currentPage < totalPages - 1) fetchPage(currentPage + 1); };

    const last = () => { if (currentPage < totalPages - 1) fetchPage(totalPages - 1); };

    const search = (query) => {
        const params = new URLSearchParams({ keyword: query, page: 0, size: 8 });
        fetch(`http://localhost:8080/api/tvseries/searchPage?${params}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setData(data.content);
                setTotalElements(data.totalElements);
                setTotalPages(data.totalPages);
                setCurrentPage();
            })
            .catch(error => toast.error(error.message));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== null && e.target.value.trim() !== '') search(e.target.value.trim());

    };

    return (
        <div className="container">
            <ToastContainer hideProgressBar stacked theme="colored" closeOnClick autoClose={3000} />
            <h2 className="text-center mb-3 fw-bold">Tv Series Available</h2>
            <div className="search-box"><input type="search" className="search-input form-control mx-auto w-50" maxLength="60" placeholder="Search..........."
                onKeyDown={handleKeyDown} /><i className="fa fa-search search-icon" ></i></div>
            <h6 className="text-end">Total Records : {totalElements}</h6>
            <div className="row g-5">
                {data.map((item, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                        <Link to={`/detail/${item.id}`} className="text-decoration-none text-dark">
                            <div style={{ cursor: 'pointer' }} className="card card-hover h-100 shadow-lg">
                                <img src={item.img || 'https://via.placeholder.com/300x200?text=No+Image'} alt={item.title} className="card-img-top" />
                                <div className="card-body">
                                    <h4 className="card-title">{item.title}</h4>
                                    <h6>{item.releasedDate?.slice(0, 4)}</h6>
                                    <p className="card-text text-muted small mb-0">{item.category}</p>
                                    <p className="card-text text-muted small mb-0">{item.quality}&nbsp;{item.format}</p>
                                    <p className="card-text text-muted small mb-0">{item.language}</p>
                                    <p className="fw-bold mb-0"><span className={`status-circle ${item.status == 'ongoing' ? 'bg-success' : item.status == 'completed' ? 'bg-danger' : ''}`}></span>{item.status}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {data.length > 0 && (<div className="text-center mt-3">
                <button className="btn btn-outline-primary mx-1" onClick={first} disabled={currentPage === 0}>First</button>
                <button className="btn btn-outline-primary mx-1" onClick={previous} disabled={currentPage === 0}>Previous</button>

                <span className="mx-2">Page {currentPage + 1} of {totalPages}</span>

                <button className="btn btn-outline-primary mx-1" onClick={next} disabled={currentPage === totalPages - 1}>Next</button>
                <button className="btn btn-outline-primary mx-1" onClick={last} disabled={currentPage === totalPages - 1}>Last</button>
            </div>)}
        </div>
    );
}

export default Home;