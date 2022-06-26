import { AuthActions } from "../enums/AuthActions";

const authReducer = (state = { authData: null }, action: any) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };

    case AuthActions.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };

    default:
      return state;
  }
};

export default authReducer;
