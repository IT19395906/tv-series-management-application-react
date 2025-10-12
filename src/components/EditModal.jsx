import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Select from 'react-select';
import '../EditModal.css'

const EditModal = ({ data, onClose }) => {

    const token = localStorage.getItem('jwtToken');
    const [categories, setCategories] = useState([]);
    const [languages, setLanguages] = useState([]);

    const [touched, setTouched] = useState({
        category: false,
        title: false,
        language: false,
        description: false,
        releasedDate: false,
    });
    const [formData, setFormData] = useState({
        category: data.category || "",
        status: data.status || 'ongoing',
        title: data.title || "",
        quality: data.quality || "",
        format: data.format || "",
        imdb: data.imdb || "",
        ro: data.ro || "",
        language: data.language || "",
        description: data.description || "",
        releasedDate: data.releasedDate || "",
        seasons: data.seasons || "",
        episodes: data.episodes || "",
        trailer: data.trailer || "",
        tags: data.tags || []
    });

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    fetch('http://localhost:8080/api/tvseries/categories', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch('http://localhost:8080/api/tvseries/languages', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } })
                ]);

                const result1 = await res1.json();
                const result2 = await res2.json();

                setCategories(result1);
                setLanguages(result2);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchInitial();
    }, []);

    //reduce unneccessary rerenders
    const optionsLang = useMemo(() => {
        return languages.map(item => ({ value: item, label: item }));
    }, [languages]);

    const optionsTag = useMemo(() => {
        return categories.map(item => ({ value: item, label: item }));
    }, [categories]);

    const dateRef = useRef();
    const handleDate = () => {
        dateRef.current.showPicker?.();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'seasons' && (value > 50 || (value !== '' && value < 1))) {
            toast.warning('Enter Number Between 1 To 50', { toastId: "season-validate" });
            return;
        }

        if (name === 'episodes' && (value > 1000 || (value !== '' && value < 1))) {
            toast.warning('Enter Number Between 1 To 1000', { toastId: "season-validate" });
            return;
        }

        if (name === 'imdb' && (value > 10 || (value !== '' && value < 1))) {
            toast.warning('Enter Number Between 1 To 10', { toastId: "season-validate" });
            return;
        }

        if (name === 'ro' && (value > 100 || (value !== '' && value < 1))) {
            toast.warning('Enter Number Between 1 To 100', { toastId: "season-validate" });
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const id = e.target.id;
        setTouched(prev => ({ ...prev, [id]: true }));
    };

    const handleLanguageChange = (selected) => {
        setFormData(prev => ({ ...prev, language: selected?.value || '' }));
    };

    const handleTagChange = (selected) => {
        const value = selected?.map(o => o.value);
        setFormData(prev => ({ ...prev, tags: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category || !formData.description || !formData.releasedDate || !formData.status) {
            toast.warning('Invalid Form', { toastId: "invalid-form-warning" })
            return;
        }

        const updateDto = {
            ...formData, title: formData.title.trim(), description: formData.description.trim(), trailer: formData.trailer.trim()
        }

        Swal.fire({
            title: "Are you sure to update the tv series ?",
            text: `Update  ${formData.title.trim()}`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        }).then(result => {
            if (result.isConfirmed) {
                fetch('http://localhost:8080/api/tvseries/patch' + data.id, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(updateDto)
                })
                    .then(response => {
                        if (!response.ok) throw new Error('Http error');
                        return response.json();
                    })
                    .then(result => {
                        if (result.message == 'Tv Series Updated Successfully') {
                            toast.success('Tv Series Updated Successfully', { toastId: "form-success" })
                            onClose(true);
                        } else {
                            toast.error('Tv Series Update Failed')
                        }
                    })
                    .catch(error => toast.error(error.message, { toastId: "form-error" }));
            }
        })

    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="text-center bg-primary text-white">
                <h4>Update {formData.title?.trim()} TV Series</h4>
            </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label"><b>Category*</b></label>
                            <select id="category" name="category" className={`form-select ${touched.category && !formData.category ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} value={formData.category} required>
                                <option value="" disabled>Select a category</option>
                                {categories.sort().map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label"><b>Title*</b></label>
                            <input type="text" id="title" name="title" className={`form-control ${touched.title && formData.title?.trim() === '' ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} required maxLength="50" value={formData.title}
                                placeholder="Enter TV Series title" />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
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

                        <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor="format" className="form-label"><b>Format</b></label>
                            <select id="format" name="format" className="form-select" onChange={handleChange} value={formData.format}>
                                <option value="" disabled>Select a format</option>
                                <option value="WEB-DL">WEB-DL</option>
                                <option value="WEBRip">WEBRip</option>
                                <option value="HDTV">HDTV</option>
                                <option value="DVDRip">DVDRip</option>
                                <option value="BDRip">BDRip</option>
                                <option value="BRRip">BRRip</option>
                                <option value="HDRip">HDRip</option>
                                <option value="CAM">CAM</option>
                                <option value="SDTV">SDTV</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="language" className="form-label"><b>Language*</b></label>
                            <Select id="language" name="language" onChange={handleLanguageChange} onBlur={handleBlur} value={optionsLang.find(option => option.value === formData.language || null)}
                                options={optionsLang} isSearchable className={`${touched.language && !formData.language ? 'is-invalid' : ''}`} placeholder="Select a language">
                            </Select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"><b>Description*</b></label>
                            <textarea id="description" name="description" className={`form-control ${touched.description && formData.description?.trim() === '' ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} value={formData.description} required
                                style={{ resize: 'none' }} rows="4" placeholder="Enter a brief description of the TV Series"></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="releasedDate" className="form-label"><b>Release Date*</b></label>
                            <input type="date" id="releasedDate" name="releasedDate" ref={dateRef} onClick={handleDate} value={formData.releasedDate} className={`form-control ${touched.releasedDate && !formData.releasedDate ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label"><b>Tags</b></label>
                            <Select id="tags" name="tags" onChange={handleTagChange} value={optionsTag.find(option => option.value === formData.tags || null)}
                                options={optionsTag} isMulti isSearchable={false} isOptionDisabled={() => formData.tags.length >= 3} placeholder="Select a tag">
                            </Select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="seasons" className="form-label"><b>Total Number of Seasons</b></label>
                            <input type="number" id="seasons" name="seasons" value={formData.seasons} className="form-control" onChange={handleChange} min="1"
                                max="50" placeholder="Enter Total Number of Seasons" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="episodes" className="form-label"><b>Total Number of Episodes</b></label>
                            <input type="number" id="episodes" name="episodes" value={formData.episodes} className="form-control" onChange={handleChange} min="1"
                                max="10000" placeholder="Enter Total Number of Episodes" />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor="imdb" className="form-label"><b>IMDB Rate</b></label>
                            <div className="input-group">
                                <input type="number" id="imdb" name="imdb" value={formData.imdb} className="form-control" onChange={handleChange} min="1"
                                  step="0.1" max="10" placeholder="Enter IMDB Rate" />
                                <span className="input-group-text">/10</span>
                            </div>
                        </div>

                        <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor="ro" className="form-label"><b>Rotten Tomatoes</b></label>
                            <div className="input-group">
                                <input type="number" id="ro" name="ro" value={formData.ro} className="form-control" onChange={handleChange} min="1"
                                    max="100" placeholder="Enter Rotten Tomatoes" />
                                <span className="input-group-text">%</span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="trailer" className="form-label"><b>Youtube Trailer</b></label>
                            <input type="text" id="trailer" name="trailer" className="form-control" onChange={handleChange} onBlur={handleBlur} maxLength="200" value={formData.trailer}
                                placeholder="Enter URL" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="status" className="form-label d-block"><b>Status*</b></label>
                            <div className="form-check form-check-inline">
                                <input type="radio" id="ongoing" name="status" className="form-check-input" onChange={handleChange}
                                    value="ongoing" required checked={formData.status === 'ongoing'} />
                                <label htmlFor="ongoing" className="form-check-label">Ongoing</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" id="completed" name="status" className="form-check-input" onChange={handleChange}
                                    value="completed" checked={formData.status === 'completed'} />
                                <label htmlFor="completed" className="form-check-label">Completed</label>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-primary" type="submit">Update</button>
                            <button className="btn btn-danger" type="button" onClick={() => onClose(false)}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

EditModal.propTypes = {}

export default EditModal;