import React, { useState } from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { useHistory } from 'react-router-dom'
import userImage from '../../../images/user-image.jpg'
import moment from 'moment'
const Post = ({ post, setCurrentId }) => {
  const [likes, setLikes] = useState(post?.likes)
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const history = useHistory()

  const userId = user?.result?.googleId || user?.result?._id
  const hasLikedPost = likes.find(id => id === userId)

  const handleClick = async () => {
    dispatch(likePost(post._id))
    if (hasLikedPost) {
      setLikes(post.likes.filter(id => id !== (userId)))
    } else {
      setLikes([...post.likes, userId])
    }

  }
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(like => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />&nbsp;{likes.length > 2 ? `you and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <><ThumbUpAltOutlined fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
      )
    }
    return <><ThumbUpAltOutlined fontSize='small' />&nbsp;Like</>
  }
  const openPost = (e) => history.push(`/posts/${post._id}`)
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile ? post.selectedFile : userImage} title={post.title} />
      </ButtonBase>
      <div className={classes.overlay}>
        <Typography variant="h6" >{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(post?.creator === user?.result?.googleId || post?.creator === user?.result?._id) && (
        <div className={classes.overlay2} >
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details} >
        <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" disabled={!user?.result} color="primary" onClick={handleClick}>
          <Likes />
        </Button>
        {(post?.creator === user?.result?.googleId || post?.creator === user?.result?._id) && (
          <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id)) }}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post