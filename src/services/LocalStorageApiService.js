import { v4 as uuidv4 } from "uuid";

/**
 * This is a mock todo data service with client side localStorage, to support
 * client side only demo deployment.
 */
export default {
  /** API list todos */
  async listTodos(options = {}) {
    const todos = getTodos();
    // a dummy search just only for client side data mocking
    if (options.q) {
      let hits = todos.filter(td => td.title.toLowerCase().includes(options.q.toLowerCase()));
      return Promise.resolve({
        data: hits,
        headers: { 'x-total-count': hits.length }
      });
    }
    return Promise.resolve({
      data: todos,
      headers: { 'x-total-count': todos.length }
    });
  },
  /** API insert todo */
  async insertTodo(data) {
    let todos = getTodos();
    let newTodo = {
      id: uuidv4(),
      title: data.title,
      completed: data.completed
    };
    // add new todo to the front of the array
    todos.unshift(newTodo);
    for (let ld of todos) {
      console.log('ls todo id: ' + ld.id);
    }
    setTodos(todos);
    return Promise.resolve({ data: newTodo });
  },
  /** API patchTodo */
  async patchTodo(todoId, data = {}) {
    let todos = getTodos();
    let todo = todos.find(td => td.id === todoId);
    if (!todo) {
      return Promise.reject(new Error('todo not round by id' + todoId));
    }
    if (data.title) {
      todo.title = data.title;
    }
    if (data.completed != null) {
      todo.completed = data.completed;
    }
    setTodos(todos);
    return Promise.resolve({ data: todo });
  },
  /** API delete todo */
  async deleteTodo(todoId) {
    let todos = getTodos();
    let newTodos = todos.filter(td => td.id !== todoId);
    setTodos(newTodos);
    return Promise.resolve(null);
  }
};

let getTodos = function (options = {}) {
  // seed todo list if asked or if list is null or empty
  if (options.reset) {
    setTodos(seedTodos);
  } else {
    let todos = JSON.parse(localStorage.getItem('todos'));
    if (todos == null) { // || todos.length === 0) {
      setTodos(seedTodos);
    }
  }
  return JSON.parse(localStorage.getItem('todos'));
};

let setTodos = function(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const seedTodos = [
  {
    id: 1,
    title: 'Take a nap',
    completed: false
  },
  {
    id: 2,
    title: 'Brew a cup of coffee',
    completed: true
  },
  {
    id: 3,
    title: 'Water plants'
  },
  {
    id: 4,
    title: 'Make a call to a friend'
  },
  {
    id: 5,
    title: 'Watch a favorite movie'
  },
  {
    id: 6,
    title: 'Take a nap',
    completed: true
  },
  {
    id: 7,
    title: 'Run for 3 miles'
  },
  {
    id: 8,
    title: 'Attend a concert or ballet show'
  }
];
