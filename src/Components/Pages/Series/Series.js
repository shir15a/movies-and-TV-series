import axios from 'axios'
import React, { useState, useEffect } from 'react';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination'
import Genres from '../../Genres/Genres'
import useGenre from "../../Genres/UseGenre";


const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

function Movies() {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]) //after select 
    const [genres, setGenres] = useState([])
    const genreforURL = useGenre(selectedGenres);

    useEffect(() => {
        const moviesData = async () => {
            let response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
            console.log(response.data.results);
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
            <span className="pageTitle">TV Series</span>
            <Genres type='tv' selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage} />
            <div className='trending'>
                {content && content.map((tvSeries) => {
                    return <SingleContent key={tvSeries.id}
                        id={tvSeries.id}
                        title={tvSeries.name}
                        poster={tvSeries.poster_path}
                        date={tvSeries.first_air_date}
                        vote_average={tvSeries.vote_average}
                        media_type='TV Series'
                    />
                })}
            </div>
            {numOfPages > 1 && (
                <CustomPagination page={page} setPage={setPage} numOfPages={numOfPages} />)}
        </div>
    )
}

export default Movies

// backdrop_path: "/JB17sIsU53NuWVUecOwrCA0CUp.jpg"
// first_air_date: "2021-03-19"
// genre_ids: (3) [10765, 10759, 18]
// id: 88396
// name: "The Falcon and the Winter Soldier"
// origin_country: ["US"]
// original_language: "en"
// original_name: "The Falcon and the Winter Soldier"
// overview: "Following the events of “Avengers: Endgame”, the Falcon, Sam Wilson and the Winter Soldier, Bucky Barnes team up in a global adventure that tests their abilities, and their patience."
// popularity: 6813.1
// poster_path: "/6kbAMLteGO8yyewYau6bJ683sw7.jpg"
// vote_average: 7.8
// vote_count: 2743