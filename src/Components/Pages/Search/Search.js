import React, { useState, useEffect } from 'react';

import { Tabs, Tab } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import PopUp from "../../PopUp/PopUp";
import { grey } from '@material-ui/core/colors';

import axios from 'axios'

const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

export default function Search() {

    const [type, setType] = useState(0); // tv or movie for API and for search menu
    const [page, setPage] = useState(1); // which page for API
    const [numOfPages, setNumOfPages] = useState(1); // total pages
    const [content, setContent] = useState([]); // data
    const [search, setSearch] = useState('');
    const [selectedSeries, setSelectedSeries] = useState({}) // for popUp
    const [display, setDisplay] = useState(false); // show popUp or not

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
        // console.log(data, 'data');
        setContent(data.results);
        setNumOfPages(data.total_pages);
    };

    useEffect(() => {
        window.scroll(0, 0);
        if (search) fetchSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, page]);

    console.log(selectedSeries, 'selectedSeries');
    return (
        <div>
            <span className="pageTitle">Search</span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input onChange={(e) => setSearch(e.target.value)} style={{ width: '50%', fontSize: '2rem' }} type="text" id="search" placeholder='Search...' ></input>
                <button onClick={() => fetchSearch()} id="searchBtn"><SearchIcon style={{ color: grey[50] }} /></button>
            </div>
            <Tabs value={type} indicatorColor='primary' centered
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                }}>
                <Tab label='Search Movies' style={{ width: '50%', color: 'white' }}></Tab>
                <Tab label='Search Series' style={{ width: '50%', color: 'white' }}></Tab>
            </Tabs>
            <div className="page-items">
                {content &&
                    content.map((item) => (
                        <SingleContent
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            title={item.title || item.name}
                            date={item.first_air_date || item.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={item.vote_average}
                            onSeriesChange={() => setSelectedSeries(item)}
                            setDisplay={(value) => setDisplay(value)}
                            display={display}

                        />
                    ))}
                <PopUp media_type={selectedSeries.release_date ? 'movie' : 'tv'}
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


