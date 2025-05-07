import React, { useState, useRef } from 'react';
import useStyles from './styles';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user.result.name}: ${comment}`, post._id));
    setComment('');
    setComments(newComments);

    // commentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              Comment {i}
            </Typography>
          ))}
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
