import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../models/Todo';

const List = () => {
  const { todos, todo, setTodo, add, toggle, remove } = useTodos();

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.todoContainer}>
      <TouchableOpacity
        onPress={() => toggle(item.id, item.done)}
        style={styles.todo}
      >
        {item.done ? (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        ) : (
          <Entypo name="circle" size={24} color="gray" />
        )}
        <Text style={styles.todoText}>{item.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => remove(item.id)}>
        <Ionicons name="trash" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add new todo"
          onChangeText={setTodo}
          value={todo}
          style={styles.input}
        />
        <Button title="Add" onPress={add} disabled={!todo.trim()} />
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 4,
    borderRadius: 6,
  },
  todo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
