import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import './Home.css';

function Home() {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    useEffect(() => {
        const params = new URLSearchParams({ page: 0, size: 8 });
        fetch(`http://localhost:8080/api/tvseries/getAll?${params}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { setData(data.content); setTotalElements(data.totalElements);})
            .catch(error => toast.error(error.message));
    }, [])

    return (
        <div className="container">
            <h2 className="text-center mb-3 fw-bold">Tv Series Available</h2>
            <h6 className="text-end">Total Records : {totalElements}</h6>
            <div className="row g-5">
                {data.map((item, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                        <div style={{ cursor: 'pointer' }} className="card h-100 shadow-lg">
                            <img src={item.img || 'https://via.placeholder.com/300x200?text=No+Image'} alt={item.title} className="card-img-top" />
                            <div className="card-body">
                                <h4 className="card-title">{item.title}</h4>
                                <h6>{item.releasedDate?.slice(0,4)}</h6>
                                <p className="card-text text-muted small mb-0">{item.category }</p>
                                <p className="card-text text-muted small mb-0">{item.quality }&nbsp;{item.format}</p>
                                <p className="card-text text-muted small mb-0">{item.language }</p>
                                <p className="fw-bold mb-0"><span className={`status-circle ${item.status == 'ongoing' ? 'bg-success': item.status == 'completed' ? 'bg-danger' : ''}`}></span>{item.status }</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button className="btn btn-outline-primary mx-1">First</button>
                <button className="btn btn-outline-primary mx-1">Previous</button>

                <span className="mx-2">Page</span>

                <button className="btn btn-outline-primary mx-1">Next</button>
                <button className="btn btn-outline-primary mx-1">Last</button>
            </div>
        </div>
    );
}

export default Home;