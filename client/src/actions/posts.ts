import {
  createPost,
  fetchPosts,
  updatePost,
  deletePost,
  likePost,
  getPostBySearch,
  getPostById,
} from "../api";
import { PostActions } from "../enums/PostActions";
import { IPostFormData, IQuery } from "../types/Post";

export const getPosts = (page: number) => async (dispatch: any) => {
  try {
    const { data } = await fetchPosts(page);
    dispatch({
      type: PostActions.FETCH_POSTS,
      payload: {
        posts: data.data?.posts,
        totalPages: data.data?.totalPages,
        currentPage: data.data?.currentPage,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const fetchPostById = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await getPostById(id);
    dispatch({
      type: PostActions.FETCH_POST,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const createNewPost = (formData: any) => async (dispatch: any) => {
  try {
    const { data } = await createPost(formData);
    dispatch({
      type: PostActions.CREATE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAPost =
  ({ id, formData }: { id: string; formData: IPostFormData }) =>
  async (dispatch: any) => {
    try {
      const { data } = await updatePost(id, formData);
      dispatch({
        type: PostActions.UPDATE_POST,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteAPost =
  ({ id }: { id: string }) =>
  async (dispatch: any) => {
    try {
      const { data } = await deletePost(id);
      dispatch({
        type: PostActions.DELETE_POST,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const likeAPost =
  ({ id }: { id: string }) =>
  async (dispatch: any) => {
    try {
      const { data } = await likePost(id);
      dispatch({
        type: PostActions.LIKE_POST,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const searchPosts =
  ({ query, tags }: IQuery) =>
  async (dispatch: any) => {
    try {
      const { data } = await getPostBySearch({ query, tags });
      dispatch({
        type: PostActions.GET_POST_BY_SEARCH,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
