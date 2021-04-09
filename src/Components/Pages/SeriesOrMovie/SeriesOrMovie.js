import React, { useState, useEffect } from 'react';
import axios from 'axios'

import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination'
import Genres from '../../Genres/Genres'
import useGenre from "../../Genres/UseGenre";
import PopUp from "../../PopUp/PopUp";
import Spinner from '../../Spinner/Spinner';
const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

function Movies(props) {

    const [page, setPage] = useState(1);
    const [pageMovie, setPageMovie] = useState(1); //for API
    const [pageSeries, setPageSeries] = useState(1); //for API
    const [content, setContent] = useState([]); // Data
    const [numOfPages, setNumOfPages] = useState([]); //total pages
    const [selectedGenres, setSelectedGenres] = useState([]) //after select 
    const [genres, setGenres] = useState([]) // all genres
    const genreforURL = useGenre(selectedGenres); // arr of genres
    const [display, setDisplay] = useState(false); // for popUp
    const [selectedSeries, setSelectedSeries] = useState({}) // for popUp

    useEffect(() => {
        window.scroll(0, 0);

        let source = axios.CancelToken.source();
        const loadData = async () => {
            try {
                if (props.type) {
                    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/${props.type === 'movies' ? 'movie' : 'tv'}`, {
                        params: {
                            api_key: REACT_APP_API_KEY,
                            language: 'en-US',
                            sort_by: 'popularity.desc',
                            include_adult: false,
                            include_video: false,
                            with_genres: genreforURL,
                            page: props.type === 'movies' ? pageMovie : pageSeries,
                        }
                    })
                    setContent(data.results)
                    setNumOfPages(data.total_pages);
                }
            }
            catch (error) {
                if (axios.isCancel(error)) {
                    console.log('caught cancel');
                } else {
                    throw error;
                }
            }
        };
        loadData();
        return () => {
            source.cancel()
        };
    }, [pageMovie, pageSeries, genreforURL, props.type]);

    console.log('selectedSeries', selectedSeries);

    if (content.length > 0) {
        return (
            <div>
                <span className="pageTitle">{props.type}</span>
                <Genres type='tv' selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                    setPage={setPage} />
                <div className='page-items'>
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

                    <PopUp media_type={props.type === 'movies' ? 'movie' : 'tv'}
                        id={selectedSeries.id}
                        display={display}
                        setDisplay={(value) => setDisplay(value)}>
                        <h1>{selectedSeries.name || selectedSeries.title}</h1>
                        <h2>{selectedSeries.first_air_date || selectedSeries.release_date}</h2>
                    </PopUp>
                </div>
                {numOfPages > 1 && (
                    <CustomPagination type={props.type}
                        page={props.type === 'movies' ? pageMovie : pageSeries}
                        setPage={props.type === 'movies' ? setPageMovie : setPageSeries}
                        numOfPages={numOfPages} />)}
            </div>
        )
    }
    else return (<Spinner />)


}

export default Movies
