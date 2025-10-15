import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import EditModal from './EditModal';
import Swal from 'sweetalert2';

function ViewAll() {
    const token = localStorage.getItem('jwtToken');
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        quality: '',
        releasedDateFrom: '',
        releasedDateTo: '',
        addedDateFrom: null,
        addedDateTo: null
    });
    const [previousData, setPreviousData] = useState(null);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/tvseries/categories', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }) //fetch() returns a Promise that resolves to a Response object we handle it using then
            .then(response => response.json()) //response.json() also returns a Promise we handle it using another then
            .then(data => { setCategories(data); })
            .catch(error => toast.error(error.message));
    }, [token])


    const getBySearch = async (searchDto) => {
        try {
            const response = await fetch('http://localhost:8080/api/tvseries/getBySearch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(searchDto)
            });

            const result = await response.json();

            if (result.message == 'Successfully Found Data') {
                setPreviousData(formData);
                setData(result.data);
                setFormData({
                    category: '',
                    title: '',
                    quality: '',
                    releasedDateFrom: '',
                    releasedDateTo: '',
                    addedDateFrom: null,
                    addedDateTo: null
                });
            } else {
                result.message === 'Tv Series Not Found' ? toast.error(result.message) : toast.error('Tv Series Search Failed')
            }
        } catch (error) {
            toast.error(error.message, { toastId: "form-error" });
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { category, title, quality, releasedDateFrom, releasedDateTo, addedDateFrom, addedDateTo } = formData;

        if (!category && !title && !quality && !releasedDateFrom && !releasedDateTo && !addedDateFrom && !addedDateTo) {
            toast.warn('Please fill in at least one field', { toastId: "form-validation" });
            return;
        }

        if ((!releasedDateFrom && releasedDateTo) || (releasedDateFrom && !releasedDateTo)) {
            toast.warn('Please select a both dates', { toastId: "form-validation" });
            return;
        }

        if ((!addedDateFrom && addedDateTo) || (addedDateFrom && !addedDateTo)) {
            toast.warn('Please select a both dates', { toastId: "form-validation" });
            return;
        }

        if (addedDateFrom > addedDateTo) {
            toast.warn('Start date must be before end date', { toastId: "form-validation" });
            return;
        }

        if (releasedDateFrom > releasedDateTo) {
            toast.warn('Start date must be before end date', { toastId: "form-validation" });
            return;
        }

        getBySearch(formData);
    }

    const downloadCsv = () => { download('csv', 'Tv Series List.csv'); }
    const downloadPdf = () => { download('pdf', 'Tv Series List.pdf'); }
    const downloadZip = () => { download('zip', 'Tv Series List.zip'); }


    async function download(fileType, fileName) {
        try {
            const response = await fetch(`http://localhost:8080/api/tvseries/export/${fileType}`, { headers: { 'Authorization': `Bearer ${token}` } });

            if (!response.ok) {
                toast.error("Download File Failed");
                return;
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error(error.message);
        }
    }


    const edit = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    const remove = (item) => { console.log(item)
        Swal.fire({
            title: "Are you sure want to delete ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch('http://localhost:8080/api/tvseries/delete/' + item.id, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    });

                    const result = await response.json();

                    if (result.message == 'Successfully Deleted Tv series') {
                        toast.success(`Tv Series successfully deleted Id ${item.id}`, { toastId: "form-success" })
                    } else {
                        toast.error('Delete tv series failed')
                    }
                } catch (error) {
                    toast.error(error.message, { toastId: "form-error" });
                }
            }
        })
    };

    const closeModal = (isUpdated = false) => {
        setIsModalOpen(false);
        setSelectedItem(null);
        if (isUpdated) {
            getBySearch(previousData);
        }
    };
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
                        <label htmlFor="releasedDateFrom" className="form-label"><b>Release From</b></label>
                        <input type="date" id="releasedDateFrom" name="releasedDateFrom" className="form-control" max={new Date().toISOString().split('T')[0]} value={formData.releasedDateFrom} onChange={handleChange} />
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-12 mb-3">
                        <label htmlFor="releasedDateTo" className="form-label"><b>Release To</b></label>
                        <input type="date" id="releasedDateTo" name="releasedDateTo" className="form-control" max={new Date().toISOString().split('T')[0]} value={formData.releasedDateTo} onChange={handleChange} />
                    </div>

                    <div className="d-flex flex-column col-lg-3 col-md-6 col-sm-12 mb-3">
                        <label htmlFor="addedDate" className="form-label"><b>Added Date</b></label>
                        <DatePicker id="addedDate" selectsRange startDate={formData.addedDateFrom} endDate={formData.addedDateTo}
                            onChange={([start, end]) => { setFormData(prev => ({ ...prev, addedDateFrom: start, addedDateTo: end })); }} className="form-control"
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

                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex flex-wrap align-self-center gap-2">
                        <button style={{ borderRadius: '4rem' }} className="btn btn-secondary" type="search">Search <i className="fa fa-search"></i></button>
                        <button className="btn btn-outline-success" type="button" onClick={downloadCsv}><i className="fa fa-download"></i> CSV</button>
                        <button className="btn btn-outline-success" type="button" onClick={downloadPdf}><i className="fa fa-download"></i> PDF</button>
                        <button className="btn btn-outline-success" type="button" onClick={downloadZip}><i className="fa fa-download"></i> ZIP</button>
                    </div>
                </div>
            </form>

            {data.length > 0 && (
                <table className="table table-responsive table-light table-hover mt-4">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Tv Series Id</th>
                            <th scope="col">Category</th>
                            <th scope="col">Title</th>
                            <th scope="col">Added Date</th>
                            <th scope="col">Added By</th>
                            <th scope="col">Released Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">No of Seasons</th>
                            <th scope="col">No of Episodes</th>
                            <th scope="col">Language</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((series, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{series.id}</td>
                                <td>{series.category}</td>
                                <td>{series.title}</td>
                                <td>{series.addedDate}</td>
                                <td>{series.addedBy}</td>
                                <td>{series.releasedDate}</td>
                                <td>{series.status}</td>
                                <td>{series.seasons}</td>
                                <td>{series.episodes}</td>
                                <td>{series.language}</td>
                                <td>
                                    <div className='d-flex gap-2'>
                                        <button className='btn btn-primary btn-sm' onClick={() => edit(series)}><i className="fa fa-edit"></i></button>
                                        <button className='btn btn-danger btn-sm' onClick={() => remove(series)}><i className="fa fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isModalOpen && (
                <EditModal data={selectedItem} onClose={closeModal} />
            )}
        </div>
    )
}

export default ViewAll;