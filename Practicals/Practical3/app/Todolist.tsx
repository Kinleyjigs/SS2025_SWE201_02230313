import { addDoc, collection, deleteDoc, doc, DocumentData, onSnapshot, QuerySnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { auth, FIRESTORE_DB } from '../Lib/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export interface Todo{
    title: string;
    done: boolean;
    id: string;
}

const List = ({ navigation }: any) => {
    const [todos, setTodos] = React.useState<Todo []>([]);
    const [todo, setTodo] = useState('');
    // access firebase database
    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');
        // we can get snapshot of the collection
        // snapshot is for instant updates
        // onSnapshot is a listener that listens to the collection
        // onSnapshot is a function that takes a collection and a callback function
        // the callback function is called whenever the collection is updated
        // the callback function takes a snapshot as an argument
        // the snapshot contains the data of the collection
        const subscribe = onSnapshot(todoRef, {
            next: (snapshot: QuerySnapshot<DocumentData>) => {
                console.log('UPDATED');
                const todos: Todo[] = [];
                snapshot.docs.forEach((doc) => {
                    console.log(doc.data());
                    const data = doc.data();
                    todos.push({
                        id: doc.id,
                        title: typeof data.title === 'string' ? data.title : '',
                        done: typeof data.done === 'boolean' ? data.done : false,
                    }); 
                });
                setTodos(todos);
            },
        });

        return () => subscribe();

    }, []);

    const addTodo = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), {title: todo, done: false});
        setTodo('');
    };

    const renderTodo = ({ item }: any) => {
      const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
    
      const toggleDone = async () => {
        await updateDoc(ref, { done: !item.done });
      };
    
      const deleteItem = async () => {
        await deleteDoc(ref);
        };
    
        return (
        <View style={styles.todoContainer}>
            <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                {item.done ? (
                <Ionicons name="checkmark-circle" size={24} color="green" />
                ) : (
                <Entypo name="circle" size={24} color="gray" />
                )}
                <Text style={styles.todoText}>{item.title}</Text>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={deleteItem}>
                <Ionicons name="trash" size={24} color="black" />
            </TouchableOpacity>
            </View>
        );
    };
    

    return (
    <View style={styles.container}>
      {/* <Text>List Screen</Text> */}
        {/* <Button title="Add Todo" onPress={addTodo}/> */}
        {/* <Button   
        title="Open Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
        <View style={styles.container}>
    <Text style={styles.title}>Todo List</Text>

    <View style={styles.inputContainer}>
        <TextInput 
        placeholder="Add new todo"
        onChangeText={(text: string) => setTodo(text)}
        value={todo}
        style={styles.input}
        />
    <Button title="Add" onPress={addTodo} disabled={todo === ''} />
</View>

        { todos.length > 0 && (
        <View> 
            <FlatList data={todos} renderItem={(item) => renderTodo(item)} keyExtractor={(todo: Todo) => todo.id } />
        </View>
        )}
    
</View>

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
    todoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1111',
        padding: 10,
        marginVertical: 4,
    },
    todoText:{
        flex: 1,
        paddingHorizontal: 4
    },
    todo:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});