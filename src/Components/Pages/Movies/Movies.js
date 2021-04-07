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
