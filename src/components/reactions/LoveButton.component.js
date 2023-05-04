import React, { useState } from 'react';
import love from '../../img/love.png';
import { Button, Image } from 'react-bootstrap';


function LoveButton() {
    const [loves, setLikes] = useState(0);
    const [loved, setLiked] = useState(false);
    const buttonStyle = {
        backgroundColor: 'transparent',
    };
    return (
        <Button variant="outline-dark" style={buttonStyle}
            className={`like-button ${loved ? 'liked' : ''}`}
            onClick={() => {
                setLikes(loves + 1);
                setLiked(true);
            }}
        >
            <Image src={love}
                fluid
                roundedCircle
                width={25} height={25}
                alt=""
                style={{ border: '0px solid black' }}
            /> <br />
            {loves}

        </Button>
    );
}
export default LoveButton
