import React, { useState } from 'react';
import angry from '../../img/angry.png';
import { Button, Image } from 'react-bootstrap';



function AngryButton() {
    const [angries, setLikes] = useState(0);
    const [angried, setLiked] = useState(false);

    const buttonStyle = {
        backgroundColor: 'transparent',
      };
    
    return (
            <Button variant="outline-dark" style={buttonStyle}
                className={`like-button ${angried ? 'liked' : ''}`}
                onClick={() => {
                    setLikes(angries + 1);
                    setLiked(true);
                }}
            >
                <Image  src={angry}
                 fluid
                 roundedCircle
                  width={25} height={25}
                   alt=""
                   style={{border: '0px solid black'}} 
                   /> <br/>
                    {angries}
                
            </Button>
    );
}
export default AngryButton
