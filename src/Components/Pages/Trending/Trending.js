import axios from 'axios'
import React, { useState, useEffect } from 'react';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination'
import PopUp from "../../PopUp/PopUp";
import Spinner from '../../Spinner/Spinner';
import './Trending.css'

const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

function Trending() {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    const [display, setDisplay] = useState(false);
    const [selectedSeries, setSelectedSeries] = useState({})


    useEffect(() => {
        const trendingData = async () => {
            let response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${REACT_APP_API_KEY}&page=${page}`)
            console.log(response.data.results);
            setContent(response.data.results)
        };
        trendingData();
    }, [page]);

    if (content.length > 0) {
        return (
            <div>
                <span className="pageTitle">Trending</span>
                <div className='page-items'>
                    {content && content.map((trendy) => {
                        return <SingleContent key={trendy.id}
                            id={trendy.id}
                            title={trendy.title || trendy.name}
                            media_type={trendy.media_type}
                            poster={trendy.poster_path}
                            date={trendy.release_date || trendy.first_air_date}
                            vote_average={trendy.vote_average}
                            onSeriesChange={() => setSelectedSeries(trendy)}
                            setDisplay={(value) => setDisplay(value)}
                            display={display}
                        />
                    })}
                    <PopUp media_type={selectedSeries.media_type} id={selectedSeries.id} display={display} setDisplay={(value) => setDisplay(value)}>
                        <h1>{selectedSeries.name || selectedSeries.title}</h1>
                    </PopUp>
                </div>
                <CustomPagination page={page} setPage={setPage} />
            </div>
        )
    }
    else return (<Spinner />)

}

export default Trending
