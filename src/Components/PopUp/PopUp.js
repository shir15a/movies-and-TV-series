import React, { useState, useEffect } from 'react';
import './PopUp.css'
import axios from 'axios'
import {
    img_500,
    unavailable,
    unavailableLandscape,
} from "../../Components/Config/Config";
import Carousel from "../../Components/Carousel/Carousel";

const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

export default function PopUp({ display, setDisplay, children, media_type, id }) {

    const [video, setVideo] = useState();
    const [content, setContent] = useState();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                let response = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${REACT_APP_API_KEY}&language=en-US`)
                setContent(response.data);
            }
            fetchData();
        }
    }, [content, id]);


    return (
        <div>
            { display && (
                <div className='show-details' style={{ display: display }}>
                    <button onClick={() => { setDisplay(display ? false : true) }}>×</button>
                    <div> {children}</div>
                    {content && (
                        <div className='ContentModal'>
                            <div className='itemImg'>
                                <img className="ContentModal__portrait" src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.name || content.title}></img>
                            </div>
                            <div className='itemDetails'>
                                <p className="ContentModal__description">
                                    {content.overview}
                                </p>
                                <div>
                                    <Carousel id={id} media_type={media_type} />
                                </div>
                            </div>
                            <button>Watch the Trailer</button>


                        </div>
                    )}

                </div>
            )}
        </div>
    )
}


