import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

//action creators(functions that returns actions)
export const getPosts = (page) => async (dispatch)=>{//async (dispatch) here is part of redux to tackle asynchronization.
    try{
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);

        dispatch({type:FETCH_ALL, payload:data});
        dispatch({ type: END_LOADING });
    }   
    catch(error){
        console.log(error.message);
    }
};

export const getPost = (id) => async (dispatch)=>{//async (dispatch) here is part of redux to tackle asynchronization.
  try{
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchPost(id);

      dispatch({type:FETCH_POST, payload:data});
      dispatch({ type: END_LOADING });
  }   
  catch(error){
      console.log(error.message);
  }
};

 export const getPostsBySearch = (searchQuery) => async(dispatch) => {
      try{
        dispatch({ type: START_LOADING });
        const { data : {data} } = await api.fetchPostsBySearch(searchQuery);

        dispatch({type:FETCH_BY_SEARCH, payload:data});
        dispatch({ type: END_LOADING });
      }
      catch(error){
        console.log(error);
      }
 }
    
    export const createPost = (post) => async (dispatch) => {
        try {
          dispatch({ type: START_LOADING });
          const { data } = await api.createPost(post);
      
          dispatch({ type: CREATE, payload: data });
        } catch (error) {
          console.log(error);
        }
      };

      export const updatePost = (id, post) => async (dispatch) => {
        try {
          const { data } = await api.updatePost(id, post);
      
          dispatch({ type: UPDATE, payload: data });
        } catch (error) {
          console.log(error);
        }
      };

      export const deletePost = (id) => async (dispatch) => {
        try {
          await api.deletePost(id);
      
          dispatch({ type: DELETE, payload: id });
        } catch (error) {
          console.log(error.message);
        }
      };

      export const likePost = (id) => async (dispatch) => {
        try {
          const { data } = await api.likePost(id);
      
          dispatch({ type: LIKE, payload: data });
        } catch (error) {
          console.log(error.message);
        }
      };
