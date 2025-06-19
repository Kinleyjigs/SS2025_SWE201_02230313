import { useEffect, useState } from 'react';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/TodoService';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    const unsubscribe = TodoService.subscribeTodos(setTodos);
    return () => unsubscribe();
  }, []);

  const add = async () => {
    if (todo.trim() !== '') {
      await TodoService.addTodo(todo);
      setTodo('');
    }
  };

  const toggle = async (id: string, done: boolean) => {
    await TodoService.toggleTodo(id, done);
  };

  const remove = async (id: string) => {
    await TodoService.deleteTodo(id);
  };

  return {
    todos,
    todo,
    setTodo,
    add,
    toggle,
    remove,
  };
};
