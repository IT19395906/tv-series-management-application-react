import React from 'react'
import { ToastContainer } from 'react-toastify';

const Contact = () => {
  return (
    <div className="card mx-auto rounded shadow">
      <div className="card-header text-center"><h4>Contact Us</h4></div>
      <div className="card-body">
        <form >
          <ToastContainer hideProgressBar stacked theme="colored" closeOnClick autoClose={3000} />
          <div className="row">

            <div className="mb-3">
              <label htmlFor='fname' className='form-label'><b>First Name*</b></label>
              <input type='text' id='fname' name='fname' className='form-control' maxLength="50" required placeholder='Enter First Name'/>
            </div>

            <div className="mb-3">
              <label htmlFor='lname' className='form-label'><b>Last Name*</b></label>
              <input type='text' id='lname' name='lname' className='form-control' maxLength="50" required placeholder='Enter Last Name'/>
            </div>

            <div className="mb-3">
              <label htmlFor='email' className='form-label'><b>Email*</b></label>
              <input type='email' id='email' name='email' className='form-control' maxLength="50" required placeholder='Enter Your Email'/>
            </div>

            <div className="mb-3">
              <label htmlFor='contact' className='form-label'><b>Contact Number</b></label>
              <input type='tel' id='contact' name='contact' className='form-control' maxLength="12" placeholder='Enter Your Contact Number'/>
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label"><b>Content*</b></label>
              <textarea id="content" name="content" className="form-control" required
                style={{ resize: 'none' }} rows="5" placeholder="Enter Content of The Message"></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="img" className="form-label"><b>Uploads</b></label>
              <input type="file" id="img" name="img" className="form-control"
                accept="image/*" />
            </div>

            <div className="text-center">
              <button className="btn btn-primary" type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact;