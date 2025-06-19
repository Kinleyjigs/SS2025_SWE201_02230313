import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { FIRESTORE_DB } from '../Lib/firebaseConfig';
import { Todo } from '../models/Todo';

const todosRef = collection(FIRESTORE_DB, 'todos');

export const TodoService = {
  addTodo: async (title: string) => {
    await addDoc(todosRef, { title, done: false });
  },

  deleteTodo: async (id: string) => {
    await deleteDoc(doc(FIRESTORE_DB, 'todos', id));
  },

  toggleTodo: async (id: string, done: boolean) => {
    await updateDoc(doc(FIRESTORE_DB, 'todos', id), { done: !done });
  },

  subscribeTodos: (callback: (todos: Todo[]) => void) => {
    return onSnapshot(todosRef, snapshot => {
      const todos: Todo[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title ?? '',
          done: data.done ?? false,
        };
      });
      callback(todos);
    });
  },
};
