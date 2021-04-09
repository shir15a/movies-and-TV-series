import { img_300, unavailable } from '../Config/Config';
import './SingleContent.css'
import React from 'react';


function SingleContent({ id, title, media_type, poster, date, vote_average, onSeriesChange, setDisplay, display }) {

    return (
        <div className='media' onClick={() => { setDisplay(!display); onSeriesChange() }}>
            <span className="vote" style={{ backgroundColor: vote_average > 6 ? '#576574' : '#222f3e' }}>{vote_average}</span>
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className='title'>{title}</b>
            <div className='sub-title'>
                <span className='media_type'>{media_type === 'movie' ? 'Movie' : 'TV Series'} </span>
                <span className='date'>{date}</span></div>
        </div>
    )
}

export default SingleContent

