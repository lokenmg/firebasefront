import React, { useState } from 'react';
import sad from '../../img/sad.png';
import { Button, Image } from 'react-bootstrap';

function SadButton() {
    const [sads, setLikes] = useState(0);
    const [saded, setLiked] = useState(false);
    const buttonStyle = {
        backgroundColor: 'transparent',
    };
    return (

        <Button variant="outline-dark" style={buttonStyle}
            className={`like-button ${saded ? 'liked' : ''}`}
            onClick={() => {
                setLikes(sads + 1);
                setLiked(true);
            }}
        >
            <Image src={sad}
                fluid
                roundedCircle
                width={25} height={25}
                alt=""
                style={{ border: '0px solid black' }}
            /> <br />
            {sads}

        </Button>
    );
}
export default SadButton
