import React, { useState } from 'react';
import haha from '../../img/haha.png';
import kafkaService from '../../services/kafka.service';

import { Button, Image } from 'react-bootstrap';


function SadButton() {
    const [hahas, setLikes] = useState(0);
    const [hahad, setLiked] = useState(false);

    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e, status) {

        let data = {
            id: 0,
            status: status
        };

        console.log(JSON.stringify(data));

        kafkaService.reaction("haha");
        e.preventDefault();
    }

    return (

        <Button variant="outline-dark" style={buttonStyle}
            className={`like-button ${hahad ? 'liked' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                saveLike(e, 1)
                setLikes(hahas + 1);
                setLiked(true);
            }}
        >
            <Image src={haha}
                fluid
                roundedCircle
                width={25} height={25}
                alt=""
                style={{ border: '0px solid black' }}
            /> <br />
            {hahas}

        </Button>
    );
}
export default SadButton
