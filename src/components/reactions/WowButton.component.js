import React, { useState } from 'react';
import wow from '../../img/wow.png';
import { Button, Image } from 'react-bootstrap';
import kafkaService from '../../services/kafka.service';
import { useAuth } from '../../context/AuthContext'; 


function WowButton({pubId}) {
    const {user}= useAuth();
    const [wows, setLikes] = useState(0);
    const [woww, setLiked] = useState(false);
    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e) {
        const uId= user.uid;    
        const oId= pubId;
        const rId= "wow"
        kafkaService.reaction(uId, oId, rId);
        e.preventDefault();
    }
   
    return (        
        <Button variant="outline-dark" style={buttonStyle}
        className={`like-button ${woww ? 'liked' : ''}`}
        onClick={(e) => {
            e.preventDefault();
            saveLike(e, 1)
            setLikes(wows + 1);
            setLiked(true);
        }}
    >
        <Image src={wow}
            fluid
            roundedCircle
            width={25} height={25}
            alt=""
            style={{ border: '0px solid black' }}
        /> <br />
        {wows}

    </Button>
    );
}
export default WowButton
