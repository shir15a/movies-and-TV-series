import React from 'react'
import './PopUp.css'

export default function PopUp({ display, setDisplay, children }) {
    return (
        <div>
            { display && (
                <div className='show-details' style={{ display: display }}>
                    <button onClick={() => { setDisplay(display ? false : true) }}>×</button>
                   <div> {children}</div>
                </div>
            )}
        </div>
    )
}
