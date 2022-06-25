import { PostActions } from "../enums/PostActions";

const postReducer = (posts = [], action: any) => {
  switch (action.type) {
    case PostActions.FETCH_POSTS:
      return action.payload.data;

    case PostActions.CREATE_POST:
      return [...posts, action.payload.data];

    case PostActions.UPDATE_POST:
      return posts.map((post: any) =>
        post._id === action.payload.data._id ? action.payload.data : post
      );
    case PostActions.DELETE_POST:
      return posts.filter((post: any) => post._id !== action.payload.data._id);

    case PostActions.LIKE_POST:
      return posts.map((post: any) =>
        post._id === action.payload.data._id ? action.payload.data : post
      );
    default:
      return posts;
  }
};

export default postReducer;
