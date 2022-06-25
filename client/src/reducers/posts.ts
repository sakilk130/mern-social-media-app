const postReducer = (posts = [], action: any) => {
  switch (action.type) {
    case "GET_POSTS":
      return action.payload.data;
    case "CREATE_POST":
      return [...posts, action.payload.data];
    default:
      return posts;
  }
};

export default postReducer;
