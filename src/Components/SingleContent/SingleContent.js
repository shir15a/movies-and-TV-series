import React from 'react'
import { img_300, unavailable } from '../Config/Config'

function SingleContent({ id, title, media_type, poster, date, vote_average }) {
    return (
        <div>
            {title}
            <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            {date}
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