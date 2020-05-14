import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsIfNeeded, selectSubreddit } from './actions';
import './App.css';

function App() {
  const dispatch = useDispatch()
  const subreddit = useSelector(state => state.selectedSubreddit)

  useEffect(() => {
    dispatch(fetchPostsIfNeeded(subreddit));
  }, [subreddit, dispatch])

  const posts = useSelector(state => {
    const { postsBySubreddit, selectedSubreddit } = state;
    return selectPosts(postsBySubreddit, selectedSubreddit);
  })

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(selectSubreddit('reactJS'))}>reactJs</button>
        <button onClick={() => dispatch(selectSubreddit('javascript'))}>javascript</button>
        <button onClick={() => dispatch(selectSubreddit('webdev'))}>webdev</button>
        <button onClick={() => dispatch(selectSubreddit('web'))}>web</button>
      </div>
      <p>{subreddit}</p>
      {posts.length > 0 && (
        posts.map(post => (
          <p key={post.id}>{post.title} | {post.author}</p>
        ))
      )
      }
    </div>
  );
}

const selectPosts = (postsBySubreddit, selectedSubreddit) => {
  let items = [];
  if (postsBySubreddit[selectedSubreddit] && postsBySubreddit[selectedSubreddit].items) {
    items = postsBySubreddit[selectedSubreddit].items;
  }
  return items;
}

export default App;
