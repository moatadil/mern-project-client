import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'
const Posts = ({ setCurrentId }) => {
    const classes = useStyles()
    const { posts, loading } = useSelector(state => state.posts)
    if (!posts.length && !loading) return 'No Posts'
    return (
        loading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid item xs={12} sm={12} md={6} lg={3} key={post._id}>
                        <Post setCurrentId={setCurrentId} post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts