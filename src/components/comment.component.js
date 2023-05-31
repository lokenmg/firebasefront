import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import '../App.css';
import kafkaService from '../services/kafka.service';
import { useAuth } from '../context/AuthContext';

const CommentComponent = ({pubId}) => {
  const {user}= useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  function saveComment(comm) {
    const uId=    user.uid;    
    const oId=   pubId;
    const comment=comm.content;
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
          <ListGroup.Item key={comment.id}>
            {comment.content}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>

  );
};

export default CommentComponent;