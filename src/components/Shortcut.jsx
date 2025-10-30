import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

function Shortcut() {

    const token = localStorage.getItem('jwtToken');
    const [categories, setCategories] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [years, setYears] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const items = type === "genre" ? categories : type === "year" ? years : languages;

    useEffect(() => {
        if (!type) return;

        if (type === "genre") {
            fetch('http://localhost:8080/api/tvseries/categories', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
                .then(response => response.json())
                .then(data => { setCategories(data); })
                .catch(error => toast.error(error.message));
        } else if (type === "year") {
            fetch('http://localhost:8080/api/tvseries/years', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
                .then(response => response.json())
                .then(data => { setYears(data); })
                .catch(error => toast.error(error.message));
        } else if (type === "language") {
            fetch('http://localhost:8080/api/tvseries/languages', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
                .then(response => response.json())
                .then(data => { setLanguages(data); })
                .catch(error => toast.error(error.message));
        } else {
            return;
        }
    }, [type]);

    const handleType = (value) => {
        switch (type) {
            case "genre":
                fetch(`http://localhost:8080/api/tvseries/getByCategory/${value}`, { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
                    .then(response => response.json())
                    .then(data => { setYears(data); })
                    .catch(error => toast.error(error.message));
                break;
            case "year":
                fetch(`http://localhost:8080/api/tvseries/getByYear/${value}`, { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
                    .then(response => response.json())
                    .then(data => { setYears(data); })
                    .catch(error => toast.error(error.message));
                break;
            case "language":
                fetch(`http://localhost:8080/api/tvseries/getByLanguage/${value}`, { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
                    .then(response => response.json())
                    .then(data => { setYears(data); })
                    .catch(error => toast.error(error.message));
                break;
            default: throw new Error;
        }
    }

    return (
        <div className='container mt-4 text-center'>
            <h2>{type === "genre" ? "Tv Series By Genre" : type === "year" ? "Tv Series By Year" : "Tv Series By Language"}</h2>
            <div className='d-flex flex-wrap gap-2 mt-3'>
                {items.map((item) => (
                    <button key={item} className='btn  btn-sm btn-outline-danger' onClick={(item) => handleType(item)}>{item}</button>
                ))}
            </div>
        </div>
    )
}

export default Shortcut