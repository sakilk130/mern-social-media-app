import { PostActions } from "../enums/PostActions";

const postReducer = (state = { posts: [] }, action: any) => {
  switch (action.type) {
    case PostActions.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    case PostActions.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload.data],
      };

    case PostActions.UPDATE_POST:
      return state?.posts.map((post: any) =>
        post._id === action.payload.data._id ? action.payload.data : post
      );
    case PostActions.DELETE_POST:
      return state?.posts.filter(
        (post: any) => post._id !== action.payload.data._id
      );

    case PostActions.LIKE_POST:
      return state?.posts.map((post: any) =>
        post._id === action.payload.data._id ? action.payload.data : post
      );

    case PostActions.GET_POST_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    default:
      return state;
  }
};

export default postReducer;
