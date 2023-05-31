import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import care from '../../img/care.png';
import kafkaService from '../../services/kafka.service';
import { useAuth } from '../../context/AuthContext';

function CareButton({pubId}) {
    const {user}= useAuth();
    const [cares, setLikes] = useState(0);
    const [cared, setLiked] = useState(false);

    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e) {
        const uId= user.uid;    
        const oId= pubId;
        const rId= "care"
        kafkaService.reaction(uId, oId, rId);
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
