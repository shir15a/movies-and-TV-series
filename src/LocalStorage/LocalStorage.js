
export const inisializeLocal = () => {
    const json = localStorage.getItem('myFavorites');
    if (!json) {
        localStorage.setItem('myFavorites', JSON.stringify([]));
    }
}

export const addEventToLocal = (event) => {
    const json = localStorage.getItem('myFavorites');
    const data = JSON.parse(json);
    data.push(event);
    localStorage.setItem('myFavorites', JSON.stringify(data));
}

export const getAllLocalData = () => {
    const json = localStorage.getItem('myFavorites');
    const data = JSON.parse(json);
    return (data);
}

export const removeEvent = (event) => {
    const json = localStorage.getItem('myFavorites');
    let data = JSON.parse(json);
    data = data.filter(curMovieOrSeries => curMovieOrSeries.id !== event.id);
    localStorage.setItem('myFavorites', JSON.stringify(data));
}

//
export const inFav = (event) => {
    const json = localStorage.getItem('myFavorites');
    let data = JSON.parse(json);
    if (data) {
        data = data.filter(currntEvent => currntEvent.id === event.id);
        if (data.length > 0)
            return true;
        return false;
    }
}
