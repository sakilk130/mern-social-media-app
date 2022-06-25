import { createPost, fetchPosts, updatePost } from "../api";
import { PostActions } from "../enums/PostActions";
import { IPostFormData } from "../types/Post";

export const getPosts = () => async (dispatch: any) => {
  try {
    const { data } = await fetchPosts();
    dispatch({
      type: PostActions.FETCH_POSTS,
      payload: data,
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
