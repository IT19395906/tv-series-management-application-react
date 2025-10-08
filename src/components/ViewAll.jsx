import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';

function ViewAll() {
    const token = localStorage.getItem('jwtToken');
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        quality: '',
        releasedFrom: '',
        releasedTo: '',
        addedFrom: null,
        addedTo: null
    });


    useEffect(() => {
        fetch('http://localhost:8080/api/tvseries/categories', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
            .then(response => response.json()) //response.json() also returns a Promise we handle it using another then
            .then(data => { setCategories(data); })
            .catch(error => toast.error(error.message));
    }, [token])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { category, title, quality, releasedFrom, releasedTo, addedFrom, addedTo } = formData;

        if (!category && !title && !quality && !releasedFrom && !releasedTo && !addedFrom && !addedTo) {
            toast.warn('Please fill in at least one field', { toastId: "form-validation" });
            return;
        }

        if ((!addedFrom && addedTo) || (addedFrom && !addedTo)) {
            toast.warn('Please select a both dates', { toastId: "form-validation" });
            return;
        }

        if (addedFrom > addedTo) {
            toast.warn('Start date must be before end date', { toastId: "form-validation" });
            return;
        }

        fetch('http://localhost:8080/api/tvseries/getBySearch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(result => {
                if (result.message == 'Successfully Found Data') {
                    setFormData({
                        category: '',
                        title: '',
                        quality: '',
                        releasedFrom: '',
                        releasedTo: '',
                        addedFrom: null,
                        addedTo: null
                    });
                } else {
                    result.message === 'Tv Series Not Found' ? toast.error(result.message) : toast.error('Tv Series Search Failed')
                }
            })
            .catch(error => toast.error(error.message, { toastId: "form-error" }));
    }

    return (
        <div className="container mt-3">
            <form onSubmit={handleSubmit}>
                <ToastContainer hideProgressBar stacked theme="colored" closeOnClick autoClose={3000} />
                <div className="row">
                    <div className="col-lg-2 col-md-6 col-sm-12 mb-3">
                        <label htmlFor="category" className="form-label"><b>Category</b></label>
                        <select id="category" name="category" className="form-select" onChange={handleChange} value={formData.category}>
                            <option value="" disabled>Select a category</option>
                            {categories.sort().map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-12 mb-3">
                        <label htmlFor="title" className="form-label"><b>Title</b></label>
                        <input type="text" id="title" name="title" className="form-control" maxLength="50" onChange={handleChange} value={formData.title}
                            placeholder="Enter TV Series title" />
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-12 mb-3">
                        <label htmlFor="releasedFrom" className="form-label"><b>Release From</b></label>
                        <input type="date" id="releasedFrom" name="releasedFrom" className="form-control" value={formData.releasedFrom} onChange={handleChange} />
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-12 mb-3">
                        <label htmlFor="releasedTo" className="form-label"><b>Release To</b></label>
                        <input type="date" id="releasedTo" name="releasedTo" className="form-control" value={formData.releasedTo} onChange={handleChange} />
                    </div>

                    <div className="d-flex flex-column col-lg-3 col-md-6 col-sm-12 mb-3">
                        <label htmlFor="addedDate" className="form-label"><b>Added Date</b></label>
                        <DatePicker id="addedDate" selectsRange startDate={formData.addedFrom} endDate={formData.addedTo}
                            onChange={([start, end]) => { setFormData(prev => ({ ...prev, addedFrom: start, addedTo: end })); }} className="form-control"
                            placeholderText="select range" maxDate={new Date()} isClearable></DatePicker>
                    </div>

                    <div className="mb-3 col-lg-2 col-md-6 col-sm-12">
                        <label htmlFor="quality" className="form-label"><b>Quality</b></label>
                        <select id="quality" name="quality" className="form-select" onChange={handleChange} value={formData.quality}>
                            <option value="" disabled>Select a quality</option>
                            <option value="480p">480p (SD)</option>
                            <option value="720p">720p (HD)</option>
                            <option value="1080p">1080p (Full HD)</option>
                            <option value="2k">2k</option>
                            <option value="4k">4k</option>
                        </select>
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12">
                        <button style={{ borderRadius: '4rem' }} className="btn btn-secondary" type="search">Search <i
                            className="fa fa-search"></i></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ViewAll;