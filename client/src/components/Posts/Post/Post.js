import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { likePost, deletePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative'
      }}
    >
      <CardMedia image={post.selectedFile ||
        'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
      } title={post.title} sx={{
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundBlendMode: 'darken'
      }} />
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white'
      }}>
        <Button sx={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px'
      }}>
        <Typography variant='body2' color='textSecondary' component='h2'>
          {post.tags?.map(tag => `${tag}`)}
        </Typography>
      </div>
      <Typography gutterBottom variant='h5' component='h2' sx={{
        padding: '0 16px'
      }}>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color="textSecondary" component='p'>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions sx={{
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize='small' />Like {post.likeCount}
        </Button>
        <Button variant='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post;