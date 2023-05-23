import React, { useState } from 'react';
import like from '../../img/like.png';
import { Button, Image } from 'react-bootstrap';
import kafkaService from '../../services/kafka.service';

function LikeButton() {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e, status) {

        let data = {
            id: 0,
            status: status
        };

        console.log(JSON.stringify(data));

        kafkaService.reaction("like");
        e.preventDefault();
    }

    return (


        <Button variant="outline-dark" style={buttonStyle}
            className={`like-button ${liked ? 'liked' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                saveLike(e, 1)
                setLikes(likes + 1);
                setLiked(true);
            }}
        >
            <Image src={like}
                fluid
                roundedCircle
                width={25} height={25}
                alt=""
                style={{ border: '0px solid black' }}
            /> <br />
            {likes}

        </Button>
    );
}
export default LikeButton
