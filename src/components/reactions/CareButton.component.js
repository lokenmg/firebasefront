import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import care from '../../img/care.png';
import kafkaService from '../../services/kafka.service';

function CareButton() {
    const [cares, setLikes] = useState(0);
    const [cared, setLiked] = useState(false);

    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e, status) {
  
        let data = {
          id: 0,
          status: status
        };
     
        console.log(JSON.stringify(data));
     
        kafkaService.reaction("care");
        e.preventDefault();
    }
   
      
    return (

        <Button variant="outline-dark" style={buttonStyle}
            className={`like-button ${cared ? 'liked' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                saveLike(e, 1)
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
