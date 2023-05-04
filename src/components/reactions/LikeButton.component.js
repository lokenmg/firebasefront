import React, { useState } from 'react';
import like from '../../img/like.png';
import { Button, Image } from 'react-bootstrap';

function LikeButton() {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const buttonStyle = {
        backgroundColor: 'transparent',
    };
    return (


<Button variant="outline-dark" style={buttonStyle}
className={`like-button ${liked ? 'liked' : ''}`}
onClick={() => {
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
