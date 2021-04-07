import axios from 'axios'
import React, { useEffect } from 'react';

import { Chip } from "@material-ui/core";

const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

function Genres({ type, genres, setGenres, selectedGenres, setSelectedGenres, setPage }) {

    useEffect(() => {
        const genresData = async () => {
            let response = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`)
            console.log("Genre", response.data.genres);
            setGenres(response.data.genres)
        };
        genresData();
        return () => {
            setGenres({});
        };
    }, [type, setGenres]);

    // get specific genre, remove it from genres array and then put it to selected genre array
    // ...setSelectedGenres -> chosen genre
    // selectedGenre -> new selected genre
    const handleAdd = (selectedGenre) => {
        console.log(selectedGenre);
        setSelectedGenres([...selectedGenres, selectedGenre])
        setGenres(genres.filter((genre) => genre.id !== selectedGenre.id));
        setPage(1);
    }

    const handleRemove = (selectedGenre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== selectedGenre.id));
        setGenres([...genres, selectedGenre]);
        setPage(1);
    };

    return (
        <div >
            {selectedGenres.map((genre) => {
                return <Chip label={genre.name}
                    key={genre.id}
                    style={{ margin: 2, fontWeight: 'bold' }}
                    clickable
                    onDelete={() => handleRemove(genre)}
                />
            })}
            {genres.map((genre) => {
                return <Chip label={genre.name}
                    key={genre.id}
                    style={{ margin: 2, fontWeight: 'bold' }}
                    clickable
                    onClick={() => handleAdd(genre)} />
            })}
        </div>
    )
}

export default Genres




// eslint-disable-next-line
