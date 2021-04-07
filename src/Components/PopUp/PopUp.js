import React, { useState, useEffect } from 'react';
import './PopUp.css'
import axios from 'axios'
import {
    img_500,
    unavailable,
} from "../Config/Config";
import Carousel from "../../Components/Carousel/Carousel";

import FavoriteIcon from '@material-ui/icons/Favorite';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { addEventToLocal, removeEvent, inFav } from '../../LocalStorage/LocalStorage';

import { red } from '@material-ui/core/colors';


const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

export default function PopUp({ display, setDisplay, children, media_type, id }) {

    const [video, setVideo] = useState();
    const [content, setContent] = useState();
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (content) setIsFav(inFav(content))
    }, [content])


    useEffect(() => {
        let source = axios.CancelToken.source();
        const loadData = async () => {
            try {
                const respone = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${REACT_APP_API_KEY}&language=en-US`, { cancelToken: source.token });
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${REACT_APP_API_KEY}&language=en-US`
                );
                setVideo(data.results[0]?.key)
                setContent(respone.data);
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
    }, [content, id, media_type]);

    const onLikeClick = () => {
        addEventToLocal(content);
        setIsFav(!isFav)
    }

    const onDisLikeClick = () => {
        removeEvent(content);
        setIsFav(!isFav)
    }

    
    return (
        <div>
            { display && (
                <div className='show-details' style={{ display: display }}>
                    <button onClick={() => { setDisplay(display ? false : true) }}>{<CloseIcon />}</button>
                    <div style={{ textAlign: 'center' }}> {children}</div>
                    {content && <p style={{ textAlign: 'center' }}>{content.tagline}</p>}
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
                                <a href={`https://www.youtube.com/watch?v=${video}`} target='blank'><button>{<YouTubeIcon style={{ color: red[800] }} />
                                } Watch the Trailer</button></a>
                                <div>
                                    <button onClick={isFav ? onDisLikeClick : onLikeClick}> {isFav ? <FavoriteIcon style={{ color: red[800] }} />
                                        : <FavoriteBorderIcon style={{ color: red[800] }} />
                                    } Add to my favorites</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

