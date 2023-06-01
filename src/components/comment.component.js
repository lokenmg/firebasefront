import React, { useEffect, useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import '../App.css';
import kafkaService from '../services/kafka.service';
import { useAuth } from '../context/AuthContext';
import MongoDBService from '../services/MongoDb.service';

const CommentComponent = ({ pubId }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Crea una instancia de MongoDBService con la URL base del backend
    const mongoDBService = new MongoDBService('http://localhost:3001');

    // Define una función asincrónica para cargar los datos
    const fetchData = async () => {
      try {
        const response = await mongoDBService.getCommentsByObjectId(pubId);
        setComments(response); // Actualiza el estado 'comments' con los comentarios recibidos
      } catch (error) {
        console.error(error);
      }
    };

    // Llama a fetchData al montar o actualizar el componente
    fetchData();
  }, [pubId]);

  function saveComment(comm) {
    const uId = user.uid;
    const oId = pubId;
    const comment = comm.content;
    //console.log("user id", uId, "object id", oId, "comentario", comment);
    kafkaService.comment(uId, oId, comment);
  }

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return; // Evitar agregar comentarios vacíos
    }
    const comment = { id: Date.now(), content: newComment };
    saveComment(comment);
    setComments((prevComments) => [...prevComments, comment]);
    setNewComment('');
  };

  return (
    <div className="comment-component">
      <Form className="comment-form">
        <Form.Control
          type="text"
          placeholder="Nuevo comentario"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <Button variant="primary" type="button" onClick={handleAddComment}>
          Agregar
        </Button>
      </Form>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment._id}>
            {comment.comment}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CommentComponent;