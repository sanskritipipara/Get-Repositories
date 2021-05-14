import React from 'react'

const Block = (props) => {
    let { name, description, language} = props;
    return (
        <div style={{ marginLeft:'30px'}}>
            
            <h4>📂 {name}</h4>

            <div style={{ marginLeft:'30px' }}>
                <h5>{description}</h5>
            </div>
            
            <div style={{ marginTop:'-10px',marginLeft:'30px' }}>
                <h7>Language : {language}</h7>
            </div>
            
        </div>
    )
}

export default Block