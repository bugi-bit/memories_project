import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //login in the user
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //sign up in the user
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
    console.log(error.request);
    console.log(error.message);
  }
};
