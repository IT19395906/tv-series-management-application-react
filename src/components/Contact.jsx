import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

const Contact = () => {
  const token = localStorage.getItem('jwtToken');
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    contact: '',
    content: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData(prev => ({
      ...prev, [name]: type === 'file' ? files[0] : value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fname.trim() || !formData.lname.trim() || !formData.email.trim() || !formData.content.trim()) {
      toast.warn("Please fill all required details");
      return;
    }

    const submitDto = new FormData();
    submitDto.append("fname", formData.fname.trim());
    submitDto.append("lname", formData.lname.trim());
    submitDto.append("email", formData.email.trim());
    submitDto.append("contact", formData.contact);
    submitDto.append("content", formData.content.trim());
    submitDto.append("file", formData.file);

    try {
      const response = await fetch('http://localhost:8080/api/requests/contact', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: submitDto
      });

      const result = await response.json();

      if (result.message == 'Request Sent Successfully') {
        toast.success('Request Sent Successfully');
        setFormData({
          fname: '',
          lname: '',
          email: '',
          contact: '',
          content: '',
          file: null
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Request Send Failed', error.message);
    }
  }

  return (
    <div className="card mx-auto rounded shadow" style={{ maxWidth: '700px' }}>
      <div className="card-header text-center"><h4>Contact Us</h4></div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <ToastContainer hideProgressBar stacked theme="colored" closeOnClick autoClose={3000} />
          <div className="row">

            <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
              <label htmlFor='fname' className='form-label'><b>First Name*</b></label>
              <input type='text' id='fname' name='fname' className='form-control' maxLength="50" required placeholder='Enter First Name' onChange={handleChange} value={formData.fname} />
            </div>

            <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
              <label htmlFor='lname' className='form-label'><b>Last Name*</b></label>
              <input type='text' id='lname' name='lname' className='form-control' maxLength="50" required placeholder='Enter Last Name' onChange={handleChange} value={formData.lname} />
            </div>

            <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
              <label htmlFor='email' className='form-label'><b>Email*</b></label>
              <input type='email' id='email' name='email' className='form-control' maxLength="50" required placeholder='Enter Your Email' onChange={handleChange} value={formData.email} />
            </div>

            <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
              <label htmlFor='contact' className='form-label'><b>Contact Number</b></label>
              <input type='tel' id='contact' name='contact' pattern="[0-9]{10}" className='form-control' maxLength="10" placeholder='Enter Your Contact Number' onChange={handleChange} value={formData.contact} />
            </div>

            <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
              <label htmlFor="content" className="form-label"><b>Content*</b></label>
              <textarea id="content" name="content" className="form-control" required onChange={handleChange} value={formData.content}
                style={{ resize: 'none' }} rows="5" placeholder="Enter Content of The Message"></textarea>
            </div>

            <div className="mb-3 col-lg-6 col-md-12 col-sm-12">
              <label htmlFor="file" className="form-label"><b>Uploads</b></label>
              <input type="file" id="file" name="file" className="form-control" onChange={handleChange}
                accept="image/*, .txt, .doc, .docx" />
            </div>

            <div className="text-center">
              <button className="w-25 btn btn-primary" type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact;