import React,{ useEffect } from 'react';
import { Paper , Typography , CircularProgress , Divider } from '@material-ui/core';
import { useDispatch , useSelector } from 'react-redux';
import moment from 'moment';
import { useParams , useNavigate } from 'react-router-dom';

import CommentSection from './CommentSection';
import { getPost , getPostsBySearch } from '../../actions/posts';
import useStlyes from './styles';   

const PostDetails = () => {
    const classes = useStlyes();
    const { post , posts , isLoading } = useSelector((state) => state.posts); // from reduc global state 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // taking the parameter value to id 

    //get the single post base on the id 
    useEffect(() => {
        dispatch(getPost(id))
    },[id])
    
    //for recommmendation in bottom of the single page
    useEffect(() => {
        if(post){
            dispatch(getPostsBySearch({ search : 'none' , tags : post?.tags.join(',') }))
        }
    },[post])

    //if post is empty the return null
    if(!post) return null ;

    // render a loading screen while gettint the data
    if(isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>    
        )
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id); 

    const openPost = (_id) => navigate(`/posts/${_id}`) 

    return (
        <Paper style={{ padding : '20px' , borderRadius : '5px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
                    <CommentSection post={post} />
            {!!recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5" >You might also like : </Typography>
                    <Divider />
                        <div className={classes.recommendedPosts}>
                            {recommendedPosts.map(({ title , message , name , likes , selectedFile , _id }) => (
                                <div style={{ margin : '20px'  , cursor : 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                    <Typography gutterBottom variant="h6">{title}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                    <Typography gutterBottom variant="subtitle1">Like : {likes.length}</Typography>
                                    <img src={selectedFile} alt="" width="200px" />
                                </div>
                            ))}
                        </div>
                </div>
            )}
        </Paper>
    )
};

export default PostDetails;
