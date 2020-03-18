import axios from "axios";
import { v4 as uuidv4 } from "uuid";
//
import "izitoast/dist/css/iziToast.min.css";
import izitoast from "izitoast";

const baseUrl = "http://localhost:3000/todos";
// const baseUrl = 'http://dot:3000/todos';
// const baseUrl = 'http://134.122.19.243:3000/todos';

const toast = {
  error: (message, title = 'Error') => {
    return izitoast.error({
      title: title,
      message: message,
      position: 'topCenter'
    });
  },
  success: (message, title = 'Success') => {
    return izitoast.success({
      title: title,
      message: message,
      position: 'topCenter'
    });
  }
}

// register axios intercepter to cover general API error control
axios.interceptors.response.use(
  function(response) {
    // happy path
    return response;
  }, // happy path
  function(error) {
    // unhappy path, handle error
    console.log("API error: " + error);
    if (error.response) {
      console.log("API error response: " + error.response);
      if (error.response.status) {
        console.log("API error status: " + error.response.status);
      }
    }
    // alert("API error: " + error);
    // replace ugly alert with izitoast
    toast.error('API Error: ' + error);

    // return Promise.reject(error); // kinda rethrow the error to caller...
  }
);

export default {
  /**
   * API list todos
   * options: _page, _limit, _sort, _order, q (search string)
   */
  async listTodos(options = {}) {
    try {
      console.log("Api list todos with params:");
      for (let k in options) {
        console.log(`${k} => ${options[k]}`);
      }
      return await axios.get(baseUrl, { params: options });
    } catch (e) {
      console.log(e);
    }
  },
  /** API insert todo */
  async insertTodo(data) {
    try {
      const res = await axios.post(baseUrl, {
        id: uuidv4(),
        title: data.title,
        completed: data.completed
      });
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  /** API patchTodo */
  async patchTodo(todoId, data = {}) {
    let properties = {};
    if (data.title) {
      properties.title = data.title;
    }
    if (data.completed != null) {
      properties.completed = data.completed;
    }
    try {
      await axios.patch(baseUrl + `/${todoId}`, properties);
    } catch (e) {
      console.log(e);
    }
  },
  /** API delete todo */
  async deleteTodo(todoId) {
    console.log("msg delete-todo: " + todoId);
    try {
      const res1 = await axios.delete(baseUrl + `/${todoId}`);
      console.log("delete successful: " + res1.status);
      if (res1.status > 200) {
        console.log("Deletion error: " + res1.status);
        return;
      }
      // reload todos list from backend
      const res = await axios.get(baseUrl);
      this.todos = res.data;
    } catch (e) {
      console.log(e);
    }
  }
};
