import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Tabs, Tab } from '@material-ui/core';

import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import PopUp from "../../PopUp/PopUp";

const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

export default function Search() {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const [content, setContent] = useState([]);
    const [search, setSearch] = useState('');


    const [selectedSeries, setSelectedSeries] = useState({})
    const [display, setDisplay] = useState(false);

    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}`, {
            params: {
                api_key: REACT_APP_API_KEY,
                language: 'en-US',
                page: page,
                query: search,
                include_adult: false
            }
        })
        console.log(data, 'data');
        setContent(data.results);
        setNumOfPages(data.total_pages);
    };

    useEffect(() => {
        // window.scroll(0, 0);
        if (search) fetchSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, page]);

    return (
        <div>
            <span className="pageTitle">Search</span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input onChange={(e) => setSearch(e.target.value)} style={{ width: '50%' }} type="text" id="search" placeholder='Search...' ></input>
                <button onClick={() => fetchSearch()} id="searchBtn"><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            <Tabs value={type} indicatorColor='primary' centered
                onChange={(event, newValue) => {
                    console.log(event);
                    console.log(newValue, 'newValue');
                    setType(newValue);
                    setPage(1);
                }}>
                <Tab label='Search Movies' style={{ width: '50%', color: 'white' }}></Tab>
                <Tab label='Search Series' style={{ width: '50%', color: 'white' }}></Tab>
            </Tabs>
            <div className="page-items">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}

                            onSeriesChange={() => setSelectedSeries(c)}
                            setDisplay={(value) => setDisplay(value)}
                            display={display}

                        />
                    ))}
                <PopUp media_type={selectedSeries.type === 'movies' ? 'movie' : 'tv'}
                    id={selectedSeries.id}
                    display={display}
                    setDisplay={(value) => setDisplay(value)}>
                    <h1>{selectedSeries.name || selectedSeries.title}</h1>
                    <h2>{selectedSeries.first_air_date || selectedSeries.release_date}</h2>
                </PopUp>
            </div>
            {numOfPages > 1 && (
                <CustomPagination page={page} setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}


