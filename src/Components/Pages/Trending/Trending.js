import axios from 'axios'
import React, { useState, useEffect } from 'react';
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css'
import CustomPagination from '../../Pagination/CustomPagination'
const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

function Trending() {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const trendingData = async () => {
            let response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${REACT_APP_API_KEY}&page=${page}`)
            console.log(response.data.results);
            setContent(response.data.results)
        };
        trendingData();
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className='trending'>
                {content && content.map((trendy) => {
                    return <SingleContent key={trendy.id}
                        id={trendy.id}
                        title={trendy.title || trendy.name}
                        media_type={trendy.media_type}
                        poster={trendy.poster_path}
                        date={trendy.release_date || trendy.first_air_date}
                        vote_average={trendy.vote_average}
                    />
                })}
            </div>

            <CustomPagination page={page} setPage={setPage} />
        </div>
    )
}

export default Trending

//movie
// adult: false
// backdrop_path: "/jMWkd0fuwbG39eJpzycJzPWMCww.jpg"
// genre_ids: (2) [28, 878]
// id: 399566
// media_type: "movie"
// original_language: "en"
// original_title: "Godzilla vs. Kong"
// overview: "In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages."
// popularity: 22934.813
// poster_path: "/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"
// release_date: "2021-03-24"
// title: "Godzilla vs. Kong"
// video: false
// vote_average: 8.6
// vote_count: 2694



//tv
// backdrop_path: "/6UH52Fmau8RPsMAbQbjwN3wJSCj.jpg"
// first_air_date: "2021-03-26"
// genre_ids: (3) [16, 10759, 18]
// id: 95557
// media_type: "tv"
// name: "Invincible"
// origin_country: ["US"]
// original_language: "en"
// original_name: "Invincible"
// overview: "Mark Grayson is a normal teenager except for the fact that his father is the most powerful superhero on the planet. Shortly after his seventeenth birthday, Mark begins to develop powers of his own and enters into his father’s tutelage."
// popularity: 546.469
// poster_path: "/yDWJYRAwMNKbIYT8ZB33qy84uzO.jpg"
// vote_average: 8.8
// vote_count: 251