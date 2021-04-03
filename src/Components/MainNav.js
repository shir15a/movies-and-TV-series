import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';

import FavoriteIcon from '@material-ui/icons/Favorite';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from "@material-ui/icons/Movie";
import TvIcon from "@material-ui/icons/Tv";
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// material ui inline style
const useStyles = makeStyles({
    root: {
        width: "100%",
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#2d313a',
        zIndex: 1,
        color: 'whitesmoke',
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if(value === 0) history.push("/")
        else if(value === 1) history.push("/movies")
        else if(value === 2) history.push("/series")
        else if(value === 3) history.push("/search")
        else if(value === 4) history.push("/myFav")
    }, [value, history])

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);}}
            showLabels
            className={classes.root}>
            <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} style={{ color: "white" }} />
            <BottomNavigationAction label="Movies" icon={<MovieIcon />} style={{ color: "white" }} />
            <BottomNavigationAction label="TV Series" icon={<TvIcon />} style={{ color: "white" }} />
            <BottomNavigationAction label="Search" icon={<SearchIcon />} style={{ color: "white" }} />
            <BottomNavigationAction label="My Favorites" icon={<FavoriteIcon />} style={{ color: "white" }} />
        </BottomNavigation>
    );
}
