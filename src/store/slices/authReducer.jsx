import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.tabadule.com";

export const postSignUp = createAsyncThunk(
    "main/signup/post",
    async (data,{rejectWithValue}) => {
      const postForm = new FormData();
      data?.first_name && postForm.append("first_name", data?.first_name);
      data?.last_name && postForm.append("last_name", data?.last_name);
      data?.email && postForm.append("email", data?.email);
      data?.username && postForm.append("username", data?.username);
      data?.password1 && postForm.append("password1", data?.password1);
      data?.password1 && postForm.append("password2", data?.password1);
  
      if (data?.image instanceof File) {
        postForm.append("image", data.image);
      }
      try {
        const response = await axios.post(`${BASE_URL}/auth/registration/`, postForm);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export const postLogin = createAsyncThunk(
    "main/login/post",
    async (body, {rejectWithValue}) => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/login/`, body);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export const postLogout = createAsyncThunk(
    "main/logout/post",
    async (body,{rejectWithValue}) => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/logout/`);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
  export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuth: localStorage.getItem('token') ? true : false,
        signUpLoading:false,
        signUpError:false,
        loginLoading:false,
        loginError:false,
        logoutLoading:false,
        logoutError:false,
        changePasswordLoading:false,
        changePasswordError:false,
        resetPasswordSendCodeLoading:false,
        resetPasswordSendCodeError:false,
        resetPasswordCodeConfirmLoading:false,
        resetPasswordCodeConfirmError:false,
        resetPasswordLoading:false,
        resetPasswordError:false,
        deleteUserLoading:false,
        deleteUserError:false,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.clear()
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postSignUp.pending, (state) => {
          state.signUpLoading = true;
          state.signUpError = false;
        });
        builder.addCase(postSignUp.fulfilled, (state, action) => {
          state.signUpLoading = false;
          state.signUpError = false;
          state.signUpData = action.payload;
          const data = action?.payload;
          state.token = data?.access;
          data?.access && localStorage.setItem("token", data?.access)
          data?.access && localStorage.setItem("refershToken", data?.refresh)
        });
        builder.addCase(postSignUp.rejected, (state, action) => {
          state.signUpLoading = false;
          state.signUpError = {
            status: true,
            data: action.payload,
          };
        });

    


          builder.addCase(postLogin.pending, (state) => {
              state.loginLoading = true;
              state.loginError = false;
          });
          builder.addCase(postLogin.fulfilled, (state, action) => {
            state.loginLoading = false;
            state.loginError = false;
            state.loginData = action?.payload;
            const data = action?.payload;
            state.token = data?.access;
            state.isAuth = true;
            data?.access && localStorage.setItem("token", data?.access)
            data?.access && localStorage.setItem("refershToken", data?.refresh)
          });
          builder.addCase(postLogin.rejected, (state, action) => {
            state.loginLoading = false;
            state.loginError = {
              status: true,
              data: action.payload,
            };
          });

          builder.addCase(postLogout.pending, (state) => {
            state.logoutLoading = true;
            state.logoutError = false;
          });
          builder.addCase(postLogout.fulfilled, (state, action) => {
            state.logoutLoading = false;
            state.logoutError = false;
            state.logoutData = action.payload;
            localStorage.clear();
            state.token = null;
            state.isAuth = false;
          });
          builder.addCase(postLogout.rejected, (state, action) => {
            state.logoutLoading = false;
            state.logoutError = {
              status: true,
              data: action.payload,
            };
          });
      },
})

export const authReducer = authSlice.reducer;
export const { logout, saveToken  } = authSlice.actions;