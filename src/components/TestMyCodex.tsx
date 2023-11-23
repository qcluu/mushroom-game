import React from 'react';

export const TestMyCodex = ( { visible, toggleCodexVisibility } ) => {
    
    return (
        <div style={{ display: visible ? 'block' : 'none', position: 'absolute', top: '50px', left: '50px' }}>
            <button onClick={toggleCodexVisibility}>Close</button>
        </div>
    )
}
