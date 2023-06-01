import React, {  useEffect, useState } from 'react';
import like from '../../img/like.png';
import { Button, Image } from 'react-bootstrap';
import kafkaService from '../../services/kafka.service';
import { useAuth } from '../../context/AuthContext'; 
const MongoDBService = require('../../services/MongoDb.service');

function LikeButton({pubId}) {
    const {user}= useAuth();
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(()=>{
    // Crea una instancia de MongoDBService con la URL base del backend
    const mongoDBService = new MongoDBService('http://localhost:3001');

    // Define los parámetros deseados para la llamada a getReactionsByObjectAndReaction
    const objectId = pubId;
    const reactionId = 'like';

    // Define una función asincrónica para cargar los datos
    const fetchData = async () => {
      try {
        const response = await mongoDBService.getReactionsByObjectAndReaction(objectId, reactionId);
        const data= response[0];
        setLikes(data.n);
      } catch (error) {
        console.error(error);
      }
    };

    // Llama a fetchData al montar o actualizar el componente
    fetchData();
    },[])
    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e) {
        const uId= user.uid;    
        const oId= pubId;
        const rId= "like"
        kafkaService.reaction(uId, oId, rId);
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
