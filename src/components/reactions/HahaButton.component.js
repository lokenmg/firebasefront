import React, { useState } from 'react';
import haha from '../../img/haha.png';

import { Button, Image } from 'react-bootstrap';


function SadButton() {
    const [hahas, setLikes] = useState(0);
    const [hahad, setLiked] = useState(false);

    const buttonStyle = {
        backgroundColor: 'transparent',
      };
    return (

<Button variant="outline-dark" style={buttonStyle}
className={`like-button ${hahad ? 'liked' : ''}`}
onClick={() => {
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
