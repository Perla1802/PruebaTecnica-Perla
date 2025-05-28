import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  //Mostrar solamente 10 usuarios
  return response.data.slice(0, 10);
});

//solicitud para posteos
export const fetchPosts = createAsyncThunk(
  "users/fetchPosts",
  async (userId) => {
    const postsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    const posts = postsResponse.data;
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const commentsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        );
        return { ...post, comments: commentsResponse.data };
      })
    );
    return postsWithComments;
  }
);

//solicitus para ver tareas

export const fetchTodos = createAsyncThunk(
  "users/fetchTodos",
  async (userId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    //se ordena de mayor a menor
    return response.data.sort((a, b) => b.id - a.id);
  }
);

//agregar una nueva tarea
export const createTodo = createAsyncThunk(
  "users/createTodo",
  async (todoData) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      todoData
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  //estados iniciales
  initialState: {
    users: [],
    selectedUser: null,
    posts: [],
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      // Se limpian los datos al cambiar de usuario
      state.posts = [];
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos = [action.payload, ...state.todos].sort(
          (a, b) => b.id - a.id
        );
      });
  },
});

export const { setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
