import React, { useState } from 'react';
import { Form, Button, ListGroup, Badge  } from 'react-bootstrap';
import '../App.css';

const CommentComponent = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return; // Evitar agregar comentarios vacíos
    }
    const comment = { id: Date.now(), content: newComment };
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
          <ListGroup.Item  key={comment.id}>
              {comment.content}
            </ListGroup.Item>
        ))}
      </ListGroup>
    </div>

  );
};

export default CommentComponent;