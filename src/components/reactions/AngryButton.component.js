import React, { useState } from 'react';
import angry from '../../img/angry.png';
import { Button, Image } from 'react-bootstrap';
import kafkaService from '../../services/kafka.service';



function AngryButton() {
    const [angries, setLikes] = useState(0);
    const [angried, setLiked] = useState(false);

    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e, status) {
  
        let data = {
          id: 0,
          status: status
        };
     
        console.log(JSON.stringify(data));
     
        kafkaService.reaction("angry");
        e.preventDefault();
    }
   
    
    return (
            <Button variant="outline-dark" style={buttonStyle}
                className={`like-button ${angried ? 'liked' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1)
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
