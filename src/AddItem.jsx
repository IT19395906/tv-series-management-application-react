import Select from "react-select/base";

function AddItem() {
    return (
        <div className="container mt-3">
            <div className="card mx-auto rounded shadow">
                <div className="card-header text-center bg-primary text-white"><h4>Upload Tv Series</h4></div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label"><b>Category</b></label>
                            <select id="category" className="form-select" formControlName="category" value="" required>
                                <option value="" disabled>Select a category</option>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Horror">Horror</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label"><b>Title</b></label>
                            <input type="text" id="title" className="form-control" formControlName="title" required maxLength="50"
                                placeholder="Enter TV Series title" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="language" className="form-label"><b>Language</b></label>
                            <Select id="language" formControlName="language" value="" required options="" isSearchable
                            placeholder="Select a language">
                            </Select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea id="description" className="form-control" formControlName="description"
                              style={{resize:'none'}}  rows="4" placeholder="Enter a brief description of the TV Series"></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="releaseDate" className="form-label">Release Date</label>
                            <input type="date" id="releaseDate" className="form-control" formControlName="releaseDate" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input type="file" id="image" className="form-control" formControlName="image" required
                                accept="image/*" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="status" className="form-label d-block">Status</label>
                            <div className="form-check form-check-inline">
                                <input type="radio" id="ongoing" name="status" className="form-check-input" formControlName="status"
                                    value="Ongoing" required />
                                <label htmlFor="ongoing" className="form-check-label">Ongoing</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" id="complete" name="status" className="form-check-input"
                                    formControlName="status" value="Complete" />
                                <label htmlFor="complete" className="form-check-label">Complete</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="seasons" className="form-label">Total Number of Seasons</label>
                            <input type="number" id="seasons" className="form-control" formControlName="seasons" required min="1"
                                max="50" placeholder="Enter Total Number of Seasons" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="episodes" className="form-label">Total Number of Episodes</label>
                            <input type="number" id="episodes" className="form-control" formControlName="episodes" required min="1"
                                max="10000" placeholder="Enter Total Number of Episodes" />
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}

export default AddItem;