import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

function Shortcut() {

    const token = localStorage.getItem('jwtToken');
    const [categories, setCategories] = useState([]);
    const [years, setYears] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const items = type === "genre" ? categories : years;

    useEffect(() => {
        fetch('http://localhost:8080/api/tvseries/categories', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
            .then(response => response.json())
            .then(data => { setCategories(data); })
            .catch(error => toast.error(error.message));

            fetch('http://localhost:8080/api/tvseries/years', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
            .then(response => response.json())
            .then(data => { setYears(data); })
            .catch(error => toast.error(error.message));
    }, []);

    return (
        <div className='container mt-4 text-center'>
            <h2>{type === "genre" ? "Tv Series By Genre" : "Tv Series By Year"}</h2>
            <div className='d-flex flex-wrap gap-2 mt-3'>
                {items.map((item) => (
                    <button key={item} className='btn  btn-sm btn-outline-danger'>{item}</button>
                ))}
            </div>
        </div>
    )
}

export default Shortcut