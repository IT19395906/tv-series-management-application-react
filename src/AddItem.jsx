import { useState } from "react";
import Select from "react-select/base";

function AddItem() {

    const [touched, setTouched] = useState({
        category: false,
        title: false,
        language: false,
        description: false,
        releasedDate: false,
        img: false,
    });
    const [formData, setFormData] = useState({
        category: '',
        status: 'Ongoing',
        title: '',
        quality: '',
        format: '',
        imdb: '',
        ro: '',
        language: '',
        description: '',
        releasedDate: '',
        seasons: '',
        episodes: '',
        img: '',
        trailer: '',
        tag: '',
    });

    const handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleBlur = (e) => {
        const id = e.target.id;
        setTouched(prev => ({ ...prev, [id]: true }));
    };
    
    return (
        <div className="container mt-3">
            <div className="card mx-auto rounded shadow">
                <div className="card-header text-center bg-primary text-white"><h4>Upload Tv Series</h4></div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label"><b>Category*</b></label>
                                <select id="category" className={`form-select ${touched.category && !formData.category ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} value={formData.category} required>
                                    <option value="" disabled>Select a category</option>
                                    <option value="Action">Action</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Horror">Horror</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label"><b>Title*</b></label>
                                <input type="text" id="title" className={`form-control ${touched.title && formData.title?.trim() === '' ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} required maxLength="50" value={formData.title}
                                    placeholder="Enter TV Series title" />
                            </div>

                            <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
                                <label htmlFor="quality" className="form-label"><b>Quality</b></label>
                                <select id="quality" className="form-select" onChange={handleChange} value={formData.quality}>
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
                                <select id="format" className="form-select" onChange={handleChange} value={formData.format}>
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
                                <Select id="language" onChange={handleChange} onBlur={handleBlur} value={formData.language} required options="" isSearchable className={`${touched.language && !formData.language ? 'is-invalid' : ''}`}
                                    placeholder="Select a language">
                                </Select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label"><b>Description*</b></label>
                                <textarea id="description" className={`form-control ${touched.description && formData.description?.trim() === '' ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} value={formData.description} required
                                    style={{ resize: 'none' }} rows="4" placeholder="Enter a brief description of the TV Series"></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="releasedDate" className="form-label"><b>Release Date*</b></label>
                                <input type="date" id="releasedDate" value={formData.releasedDate} className={`form-control ${touched.releasedDate && !formData.releasedDate ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="img" className="form-label"><b>Image*</b></label>
                                <input type="file" id="img" className={`form-control ${touched.img && !formData.img ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} required value={formData.img}
                                    accept="image/*" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="status" className="form-label d-block"><b>Status*</b></label>
                                <div className="form-check form-check-inline">
                                    <input type="radio" id="ongoing" name="status" className="form-check-input" onChange={handleChange}
                                        value="Ongoing" required checked={formData.status === 'Ongoing'}/>
                                    <label htmlFor="ongoing" className="form-check-label">Ongoing</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="radio" id="complete" name="status" className="form-check-input" onChange={handleChange} 
                                    value="Complete" checked={formData.status === 'Completed'}/>
                                    <label htmlFor="complete" className="form-check-label">Complete</label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="seasons" className="form-label"><b>Total Number of Seasons</b></label>
                                <input type="number" id="seasons" value={formData.seasons} className="form-control" onChange={handleChange} min="1"
                                    max="50" placeholder="Enter Total Number of Seasons" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="episodes" className="form-label"><b>Total Number of Episodes</b></label>
                                <input type="number" id="episodes" value={formData.episodes} className="form-control" onChange={handleChange} min="1"
                                    max="10000" placeholder="Enter Total Number of Episodes" />
                            </div>

                            <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
                                <label htmlFor="imdb" className="form-label"><b>IMDB Rate</b></label>
                                <input type="number" id="imdb" value={formData.imdb} className="form-control" onChange={handleChange} min="1"
                                    max="10" placeholder="Enter IMDB Rate" />
                            </div>

                            <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
                                <label htmlFor="ro" className="form-label"><b>Rotten Tomatoes</b></label>
                                <input type="number" id="ro" value={formData.ro} className="form-control" onChange={handleChange} min="1"
                                    max="100" placeholder="Enter Rotten Tomatoes" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}

export default AddItem;