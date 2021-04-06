import axios from 'axios'
import React, { useState, useEffect } from 'react';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination'
import Genres from '../../Genres/Genres'
import useGenre from "../../Genres/UseGenre";


const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

function Movies(props) {
    console.log(props.type);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]) //after select 
    const [genres, setGenres] = useState([])
    const genreforURL = useGenre(selectedGenres);

    // const useGenre = (selectedGenres) => {
    //     if (selectedGenres.length > 1) return '';
    //     const genreIds = selectedGenres.map((genre) => genre.id);
    //     return genreIds.reduce((acc, curr) => acc + "," + curr, []);
    // }

    useEffect(() => {
        const moviesData = async () => {
            let response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
            console.log(response);
            setContent(response.data.results)
            setNumOfPages(response.data.total_pages);
        };
        moviesData();
        return () => {
            setNumOfPages({});
            // setNumOfPages([]); 
        };
    }, [page, genreforURL]);



    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Genres type='movie' selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage} />
            <div className='trending'>
                {content && content.map((movie) => {
                    return <SingleContent key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster={movie.poster_path}
                        date={movie.release_date}
                        vote_average={movie.vote_average}
                        media_type='movie'
                    />
                })}
            </div>
            {numOfPages > 1 && (
                <CustomPagination page={page} setPage={setPage} numOfPages={numOfPages} />)}
        </div>
    )
}

export default Movies


// adult: false
// backdrop_path: "/u5WUCO6irZoq27qbYYrtLUrCGDV.jpg"
// genre_ids: (2) [27, 53]
// id: 630586
// original_language: "en"
// original_title: "Wrong Turn"
// overview: "Jen and a group of friends set out to hike the Appalachian Trail. Despite warnings to stick to the trail, the hikers stray off course—and cross into land inhabited by The Foundation, a hidden community of mountain dwellers who use deadly means to protect their way of life."
// popularity: 1043.387
// poster_path: "/4U1SBHmwHkNA0eHZ2n1CuiC1K1g.jpg"
// release_date: "2021-01-26"
// title: "Wrong Turn"
// video: false
// vote_average: 6.2
// vote_count: 318


