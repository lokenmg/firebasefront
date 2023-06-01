import React, { useEffect, useState } from 'react';
import haha from '../../img/haha.png';
import kafkaService from '../../services/kafka.service';
import { useAuth } from '../../context/AuthContext'; 
import { Button, Image } from 'react-bootstrap';
const MongoDBService = require('../../services/MongoDb.service');




function SadButton({pubId}) {
    const {user}= useAuth();
    const [hahas, setLikes] = useState(0);
    const [hahad, setLiked] = useState(false);

    useEffect(()=>{
        // Crea una instancia de MongoDBService con la URL base del backend
        const mongoDBService = new MongoDBService('http://localhost:3001');
    
        // Define los parámetros deseados para la llamada a getReactionsByObjectAndReaction
        const objectId = pubId;
        const reactionId = 'haha';
    
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
        })
    const buttonStyle = {
        backgroundColor: 'transparent',
    };

    function saveLike(e, status) {
        const uId= user.uid;    
        const oId= pubId;
        const rId= "haha"
        kafkaService.reaction(uId, oId, rId);
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
