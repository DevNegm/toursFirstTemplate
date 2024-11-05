import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.tabadule.com";


export const getUserById = createAsyncThunk(
    "main/userbyid/get",
    async (id,{ rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/user/public/${id}/`);
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
export const getUser = createAsyncThunk(
    "main/user/get",
    async (body,{ getState, rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/user/`, {
          headers: {
            Authorization: `Bearer ${getState()?.auth?.token}`,
          },
        });
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

export const editUser = createAsyncThunk(
  "main/user/patch",
  async (data, {getState, rejectWithValue }) => {
    const postForm = new FormData();
    data?.first_name && postForm.append("first_name", data?.first_name);
    data?.last_name && postForm.append("last_name", data?.last_name);
    data?.address && postForm.append("address", data?.address);

    if (data?.image instanceof File) {
      postForm.append("image", data.image);
    }
    try {
      const response = await axios.patch(`${BASE_URL}/auth/user/`, postForm, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuth: localStorage.getItem('token') ? true : false,
        userLoading:false,
        userError:false,
        userData:null,
        userByIdLoading:false,
        userByIdError:false,
        userById:null,
        editUser:null,
        editUserLoading:false,
        editUserError:false,
        
    },
    reducers: {},
    extraReducers: (builder) => {
          builder.addCase(getUser.pending, (state) => {
            state.userLoading = true;
            state.userError = false;
          });
          builder.addCase(getUser.fulfilled, (state, action) => {
            state.userLoading = false;
            state.userError = false;
            state.userData = action.payload;
          });
          builder.addCase(getUser.rejected, (state, action) => {
            state.userLoading = false;
            state.userError = {
              status: true,
              data: action.payload,
            };
          });
          builder.addCase(getUserById.pending, (state) => {
            state.userByIdLoading = true;
            state.userByIdError = false;
          });
          builder.addCase(getUserById.fulfilled, (state, action) => {
            state.userByIdLoading = false;
            state.userByIdError = false;
            state.userById = action.payload;
          });
          builder.addCase(getUserById.rejected, (state, action) => {
            state.userByIdLoading = false;
            state.userByIdError = {
              status: true,
              data: action.payload,
            };
          });
          builder.addCase(editUser.pending, (state) => {
            state.editUserLoading = true;
            state.editUserError = false;
          });
          builder.addCase(editUser.fulfilled, (state, action) => {
            state.editUserLoading = false;
            state.editUserError = false;
            state.editUser = action.payload;
          });
          builder.addCase(editUser.rejected, (state, action) => {
            state.editUserLoading = false;
            state.editUserError = {
              status: true,
              data: action.payload,
            };
          });
         
     
  
      },
})

export const mainReducer = mainSlice.reducer;