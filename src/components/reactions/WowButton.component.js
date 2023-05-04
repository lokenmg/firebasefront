import React, { useState } from 'react';
import wow from '../../img/wow.png';
import { Button, Image } from 'react-bootstrap';


function WowButton() {
    const [wows, setLikes] = useState(0);
    const [woww, setLiked] = useState(false);
    const buttonStyle = {
        backgroundColor: 'transparent',
    };
    return (        
        <Button variant="outline-dark" style={buttonStyle}
        className={`like-button ${woww ? 'liked' : ''}`}
        onClick={() => {
            setLikes(wows + 1);
            setLiked(true);
        }}
    >
        <Image src={wow}
            fluid
            roundedCircle
            width={25} height={25}
            alt=""
            style={{ border: '0px solid black' }}
        /> <br />
        {wows}

    </Button>
    );
}
export default WowButton
