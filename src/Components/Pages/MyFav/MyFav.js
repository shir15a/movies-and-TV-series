import React, { useState, useEffect } from 'react';
import { getAllLocalData } from '../../../LocalStorage/LocalStorage'
import SingleContent from '../../SingleContent/SingleContent';
import PopUp from "../../PopUp/PopUp";
import "./MyFav.css";


function MyFav() {

    const localDataArr = getAllLocalData();

    const [selectedSeries, setSelectedSeries] = useState({})
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    
    return (
        <div>
            {localDataArr.length === 0 &&
                <div className='no-fav'><p>There are no favorites yet</p>
                    <p className='animated-popcorn'><img src={'https://www.animatedimages.org/data/media/1692/animated-popcorn-image-0007.gif'}></img></p>
                </div>
            }
            {localDataArr.length > 0 && <div className='page-items'>
                {localDataArr.map((item) => {
                    return <SingleContent key={item.id}
                        id={item.id}
                        title={item.name || item.title}
                        poster={item.poster_path}
                        date={item.first_air_date || item.release_date}
                        vote_average={item.vote_average}
                        // media_type={props.type === 'movies' ? 'movie' : 'tv'}
                        onSeriesChange={() => setSelectedSeries(item)}
                        setDisplay={(value) => setDisplay(value)}
                        display={display}
                    />
                })}

                <PopUp
                    media_type={selectedSeries.release_date ? 'movie' : 'tv'}
                    id={selectedSeries.id}
                    display={display}
                    setDisplay={(value) => setDisplay(value)}>
                    <h1>{selectedSeries.name || selectedSeries.title}</h1>
                    <h2>{selectedSeries.first_air_date || selectedSeries.release_date}</h2>
                </PopUp>

            </div>}
        </div>
    )
}

export default MyFav
