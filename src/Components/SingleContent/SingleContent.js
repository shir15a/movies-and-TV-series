import React from 'react';
import { img_300, unavailable } from '../Config/Config';
import './SingleContent.css'

function SingleContent({ id, title, media_type, poster, date, vote_average }) {
    return (
        <div className='media'>
            <span className="vote" style={{ backgroundColor: vote_average > 6 ? '#DC004E' : '#1976D2' }}>{vote_average}</span>
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className='title'>{title}</b>
            <div className='sub-title'>
                <span className='media_type'>{media_type === 'movie' ? 'Movie' : 'TV Series'} </span>
                <span className='date'>{date}</span></div>
        </div>
    )
}

export default SingleContent

//key={trendy.id}
//id={trendy.id}
//title={trendy.title || trendy.name}
//media_type = {trendy.media_type}
//poster={trendy.poster_path}
//date={trendy.release_date || trendy.first_air_date}
//vote_average = {trendy.vote_average}