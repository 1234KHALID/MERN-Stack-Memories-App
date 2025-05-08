import React, { useState } from 'react';
import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { likePost, deletePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const user = JSON.parse(localStorage.getItem('profile'));

  const isUserId = user?.resul?.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === isUserId);

  const handleLiked = () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post?.likes?.filter((id) => id !== isUserId));
    } else {
      setLikes([...post?.likes, isUserId]);
    }
  };
  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === isUserId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
      }}
      raised
      elevation={6}
    >
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          image={
            post.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
          sx={{
            height: 0,
            paddingTop: '56.25%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backgroundBlendMode: 'darken',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: 'white',
          }}
        >
          <Typography variant="h6">{post?.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'white',
          }}
        >
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button sx={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
              <MoreHorizIcon fontSize="medium" />
            </Button>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px',
          }}
        >
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags?.map((tag) => `${tag}`)}
          </Typography>
        </div>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            padding: '0 16px',
          }}
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions
        sx={{
          padding: '0 16px 8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLiked}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button variant="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
