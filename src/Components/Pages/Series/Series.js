import axios from 'axios'
import React, { useState, useEffect } from 'react';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination'
import Genres from '../../Genres/Genres'
import useGenre from "../../Genres/UseGenre";
import PopUp from "../../PopUp/PopUp";

const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

function Movies(props) {
    console.log(props.type);
    const movieOrSeries = props.type === 'movies' ? 'movie' : 'tv';
    console.log('movieOrSeries', movieOrSeries);


    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]) //after select 
    const [genres, setGenres] = useState([])
    const genreforURL = useGenre(selectedGenres);
    const [display, setDisplay] = useState(false);
    const [selectedSeries, setSelectedSeries] = useState({})


    useEffect(() => {

        const fetchData = async () => {
            let response = await axios.get(`https://api.themoviedb.org/3/discover/${props.type === 'movies' ? 'movie' : 'tv'}?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
            console.log(response);

            console.log(response.data.results);
            setContent(response.data.results)
            setNumOfPages(response.data.total_pages);
        };

        fetchData();
        return () => {
            setNumOfPages({});
            // setNumOfPages([]); 
        };
    }, [page, genreforURL, props.type]);





    // useEffect(() => {
    //     const moviesData = async () => {
    //         let response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    //         console.log(response.data.results);
    //         setContent(response.data.results)
    //         setNumOfPages(response.data.total_pages);
    //     };
    //     moviesData();
    //     return () => {
    //         setNumOfPages({});
    //         // setNumOfPages([]); 
    //     };
    // }, [page, genreforURL]);

    return (
        <div>
            <span className="pageTitle">{props.type}</span>
            <Genres type='tv' selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage} />
            <div className='trending'>
                {content && content.map((item) => {
                    return <SingleContent key={item.id}
                        id={item.id}
                        title={item.name || item.title}
                        poster={item.poster_path}
                        date={item.first_air_date || item.release_date}
                        vote_average={item.vote_average}
                        media_type={props.type === 'movies' ? 'movie' : 'tv'}
                        onSeriesChange={() => setSelectedSeries(item)}
                        setDisplay={(value) => setDisplay(value)}
                        display={display}
                    />
                })}
       
                <PopUp  media_type={props.type === 'movies' ? 'movie' : 'tv'} id={selectedSeries.id} display={display} setDisplay={(value) => setDisplay(value)}>
                    <h1>{selectedSeries.name || selectedSeries.title}</h1>
                </PopUp>
            </div>
            {numOfPages > 1 && (
                <CustomPagination type={props.type} page={page} setPage={setPage} numOfPages={numOfPages} />)}
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