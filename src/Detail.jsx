import React from 'react'
import { useLocation } from 'react-router-dom';

const Detail = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <div>
      <div className="text-center">
        <img style={{height: '20rem'}} src={data.img || 'https://via.placeholder.com/300x200?text=No+Image'} alt={data.title} />
      </div>

      <h2 className="mt-3">{data.title}</h2>
      <p>{data.description}</p>
      <ul className="info-list">
        <li><strong>🗂️ Category:</strong> {data.category}</li>
        <li><strong>🔖 Tags:</strong> {data.tags}</li>
        <li><strong>📺 Quality:</strong> {data.quality}&nbsp;{data.format}</li>
        <li><strong>🗣️ Language:</strong> {data.language}</li>
        <li><strong>✅ Status:</strong> {data.status}</li>
        <li><strong>📅 Released:</strong> {data.releasedDate}</li>
        <li><strong>📤 Added Date:</strong> {data.addedDate}</li>
        <li><strong>👤 Added By:</strong> {data.addedBy}</li>
        <li><strong>📚 Seasons:</strong> {data.seasons}</li>
        <li><strong>🎭 Episodes:</strong> {data.episodes}</li>
        <li><strong>⭐ IMDB Rate:</strong> {data.imdb}/10</li>
        <li><strong>🍅 Rotten Tomatoes:</strong> {data.ro}%</li>
      </ul>


      <div>
        <iframe width="560" height="315" src="sanitizeUrl(data.trailer)" frameBorder="0" allowFullScreen></iframe>
      </div >

      <div className="carousel-wrapper">
        <button className="scroll-btn" id="right" style={{right: '-2em'}}><i className="fa fa-arrow-right"></i></button>
        <div className="carousel">
          <img className="Imagecard" src="img" />
        </div>
        <button className="scroll-btn" id="left" style={{left: '-2em'}}><i className="fa fa-arrow-left"></i></button>
      </div>
    </div >
  )
}

export default Detail;