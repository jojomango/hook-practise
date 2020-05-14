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

  const changeResoure = src =>
    dispatch(selectSubreddit(src));

  return (
    <div className="App">
      <div>
        <button onClick={() => changeResoure('reactJS')}>reactJs</button>
        <button onClick={() => changeResoure('javascript')}>javascript</button>
        <button onClick={() => changeResoure('webdev')}>webdev</button>
        <button onClick={() => changeResoure('web')}>web</button>
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
