import { Paper, TextField, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import FileBase from 'react-file-base64';
import { useSelector, useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });



  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post])

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper sx={{ padding: "15px" }}>
      <form
        autoComplete='off'
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}
        >{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>

        <TextField
          name='creator'
          sx={{ marginBottom: "10px" }}
          variant='outlined' label='Creator'
          fullWidth value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />

        <TextField
          name='title'
          variant='outlined'
          label='Title'
          sx={{ marginBottom: "10px" }}
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name='message'
          variant='outlined'
          label='Message'
          sx={{ marginBottom: "10px" }}
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />

        <TextField
          name='tags'
          variant='outlined'
          label='Tags (coma seprated)'
          value={postData.tags}
          sx={{ marginBottom: "10px" }}
          fullWidth
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />

        <div
          style={{
            width: '97%',
            margin: '10px 0',
          }}
        >
          <FileBase
            type='file'
            multiline={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}

          />
        </div>
        <Button
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
          sx={{ marginBottom: "10px" }}
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form;