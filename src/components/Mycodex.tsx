import React, { useState } from 'react';

function Mycodex( { openCodex } ) {

    const [showCodex, setShowCodex] = useState(false);

    const codexHandler = () => {
        setShowCodex(true);
    }
    
    const codex = (
        <div className= "w-200 h-600 bg-orange-100"></div>
    )

    const noCodex = (
        <div></div>
    )

    return (
        <div>
            <div>{showCodex ? codex: noCodex}</div>
            <div>
                <button onClick={codexHandler}>
                    test
                </button>
            </div>
        </div>
    )
}

export default Mycodex;