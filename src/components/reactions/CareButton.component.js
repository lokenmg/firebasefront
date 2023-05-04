import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import care from '../../img/care.png';

function CareButton() {
    const [cares, setLikes] = useState(0);
    const [cared, setLiked] = useState(false);

    const buttonStyle = {
        backgroundColor: 'transparent',
      };
      
    return (

        <Button variant="outline-dark" style={buttonStyle}
            className={`like-button ${cared ? 'liked' : ''}`}
            onClick={() => {
                setLikes(cares + 1);
                setLiked(true);
            }}
        >
            <Image src={care}
                fluid
                roundedCircle
                width={25} height={25}
                alt=""
                style={{ border: '0px solid black' }}
            /> <br />
            {cares}

        </Button>
    );
}
export default CareButton
