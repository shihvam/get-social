import { useCallback } from "react";
import { createContext, useReducer } from "react";

const DEFAULT_CONTEXT = {
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost : () => {},
}

export const PostList = createContext({ DEFAULT_CONTEXT });

const postListReducer = (currPostList, action) => {

  let newPostList = currPostList;

  if (action.type === 'DELETE_POST') {
    newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
  } 
  else if (action.type === 'ADD_POST') {
    newPostList = [ action.payload, ...currPostList ]
  } 
  else if (action.type === 'ADD_INITIAL_POSTS') {
    newPostList = action.payload.posts;
  }

  return newPostList;
}


const PostListProvider = ({children}) => {

  const [postList, dispatchPostList] =  useReducer(
    postListReducer, []);

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      }
    })
  }

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: 'ADD_POST',
      payload: { 
          id : Date.now(),
          title: postTitle,
          body: postBody,
          reactions: reactions,
          userId: userId,
          tags: tags,
    }})
  };
 
  const deletePost = useCallback((postId) => {
    dispatchPostList({
      type:'DELETE_POST',
      payload: {
        postId,
      }
    })
  }, [dispatchPostList])

  
  return <PostList.Provider value={
    { postList,
    addPost,
    addInitialPosts,
    deletePost}
  }>

    {children}

   </PostList.Provider>
}

// const DEFAULT_POST_LIST = 

export default PostListProvider;