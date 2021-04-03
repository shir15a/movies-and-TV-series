import React from 'react'

function SingleContent({ id, title, media_type, poster, date, vote_average }) {
    return (
        <div>
            {title}
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