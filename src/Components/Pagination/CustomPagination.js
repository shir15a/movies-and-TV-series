import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import './CustomPagination.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})

function CustomPagination({ setPage, numOfPages = 15 }) {
    const handlePageChange = (page) => {
        console.log(page, 'page');
        setPage(page);
        window.scroll(0, 0);
    };

    return (
        <div className='pagination'>
            <ThemeProvider theme={darkTheme}>
                <Pagination count={numOfPages} onChange={(e) => handlePageChange(e.target.textContent)} />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
