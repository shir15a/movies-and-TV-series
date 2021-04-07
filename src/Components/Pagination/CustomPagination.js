import React, { useState, useEffect} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import './CustomPagination.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})

function CustomPagination({ type, page, setPage, numOfPages = 15 }) {

    const[localPage, setLocalPage] = useState(page);

    useEffect(() => {
        setLocalPage(page);

    }, [page])

    // useEffect(() => {
    //     setLocalPage(1);
    //     setPage(1);

    // }, [type])


    const handlePageChange = (event, value) => {
        console.log(value, 'value');
        setLocalPage(value);
        setPage(parseInt(value));
        window.scroll(0, 0);
    };

    return (
        <div className='pagination'>
            <ThemeProvider theme={darkTheme}>
                <Pagination page={localPage} count={numOfPages} onChange={handlePageChange} />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
