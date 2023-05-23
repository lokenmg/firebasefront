import React, { useState } from 'react';
import love from '../../img/love.png';
import { Button, Image } from 'react-bootstrap';
import kafkaService from '../../services/kafka.service';


function LoveButton() {
    const [loves, setLikes] = useState(0);
    const [loved, setLiked] = useState(false);
    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e, status) {
  
        let data = {
          id: 0,
          status: status
        };
     
        console.log(JSON.stringify(data));
     
        kafkaService.reaction("love");
        e.preventDefault();
    }
   
    return (
        <Button variant="outline-dark" style={buttonStyle}
            className={`like-button ${loved ? 'liked' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                saveLike(e, 1)
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
