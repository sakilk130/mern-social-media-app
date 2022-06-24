import { fetchPosts } from "../api";

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
