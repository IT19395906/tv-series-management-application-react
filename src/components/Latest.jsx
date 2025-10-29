import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'

const Latest = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/tvseries/latest`, { method: 'GET' })
            .then(response => response.json())
            .then(data => { console.log(data)
                setData(data);
            })
            .catch(error => toast.error(error.message));
    }, [])

    return (
        <div className="container">
            <ToastContainer hideProgressBar stacked theme="colored" closeOnClick autoClose={3000} />
            <h3 className="text-center mb-3 fw-bold">Latest Tv Series</h3>
            <div className="row g-5">
                {data.map((item, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                        <Link to={`/detail/${item.id}`} state={item} className="text-decoration-none text-dark">
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
        </div>
    )
}

export default Latest