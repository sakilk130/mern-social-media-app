import { AuthActions } from "../enums/AuthActions";
import { getSignIn, getSignUp } from "../api";

export const signin = (formData: any) => async (dispatch: any) => {
  try {
    const { data } = await getSignIn(formData);
    dispatch({
      type: AuthActions.LOGIN,
      payload: {
        user: {
          name: data?.user?.name,
          email: data?.user?.email,
          imageUrl: data?.user?.imageUrl || "",
          id: data?.user?._id,
        },
        token: data?.token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData: any) => async (dispatch: any) => {
  try {
    const { data } = await getSignUp(formData);
    dispatch({
      type: AuthActions.LOGIN,
      payload: {
        user: {
          name: data?.user?.name,
          email: data?.user?.email,
          imageUrl: data?.user?.imageUrl || "",
          id: data?.user?._id,
        },
        token: data?.token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
