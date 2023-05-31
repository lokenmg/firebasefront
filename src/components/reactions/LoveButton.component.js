import React, { useState } from 'react';
import love from '../../img/love.png';
import { Button, Image } from 'react-bootstrap';
import kafkaService from '../../services/kafka.service';
import { useAuth } from '../../context/AuthContext';

function LoveButton({pubId}) {
    const {user}= useAuth();
    const [loves, setLikes] = useState(0);
    const [loved, setLiked] = useState(false);
    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e) {
        const uId= user.uid;    
        const oId= pubId;
        const rId= "love"
        kafkaService.reaction(uId, oId, rId);
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
