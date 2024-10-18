import { useContext, useEffect, useState } from "react";
import { PostList as PostListData } from "../store/post-list-store";
import LoadingSpinner from "./LoadingSpinner";
import WelcomeMessage from "./WelcomeMessage";
import Post from "./Post";


const PostList = () => {

  const {postList, addInitialPosts}   = useContext(PostListData);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {

    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", {signal})
    .then(res => res.json())
    .then(data => {
      addInitialPosts(data.posts);
      setFetching(false);
    });

    return () => {
      console.log('cleaning up');
      controller.abort();
    }

  }, []);


  return (
  <>
  {fetching && <LoadingSpinner/>}
  { !fetching && postList.length === 0 && <WelcomeMessage /> }
  { !fetching && postList.map((post) => (
    <Post key={post.id} post = {post} />
  ))}

  </>
  )
}

export default PostList;