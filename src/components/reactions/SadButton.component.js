import React, { useState } from 'react';
import sad from '../../img/sad.png';
import { Button, Image } from 'react-bootstrap';
import kafkaService from '../../services/kafka.service';

function SadButton() {
    const [sads, setLikes] = useState(0);
    const [saded, setLiked] = useState(false);
    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e, status) {
  
        let data = {
          id: 0,
          status: status
        };
     
        console.log(JSON.stringify(data));
     
        kafkaService.reaction("sad");
        e.preventDefault();
    }
   
    return (

        <Button variant="outline-dark" style={buttonStyle}
            className={`like-button ${saded ? 'liked' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                saveLike(e, 1)
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
