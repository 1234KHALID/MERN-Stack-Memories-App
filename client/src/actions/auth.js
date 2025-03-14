import { AUTH } from "../constants/actionType";
import * as api from "../api/index";

export const SignUp = (formData, navigate) => async (dispatch) => {
  try {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      throw new Error("Passwords are not the same.");
    }

    const { data } = await api.SignUp(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.SignIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
