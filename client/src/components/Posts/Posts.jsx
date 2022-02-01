import React from 'react';
import { Grid , CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useSyles from './style';

const Posts = ({ setCurrentId }) => {
  const { posts , isLoading  } = useSelector((state) => state.posts)
  const classes = useSyles();

  if(!posts.length && !isLoading) return 'No posts'; 

  return(
      isLoading ? 
      <CircularProgress  size="7em"  className={classes.loadingPaper} /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
          {posts?.map((post) => (
            <Grid key={post._id} item xs={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )
  )
};

export default Posts;