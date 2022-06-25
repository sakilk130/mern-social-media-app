import { fetchPosts, createPost } from "../api";

export const getPosts = () => async (dispatch: any) => {
  try {
    const { data } = await fetchPosts();
    dispatch({
      type: "GET_POSTS",
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
      type: "CREATE_POST",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
