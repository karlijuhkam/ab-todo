<template>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders" style="max-width: 650px">
      <div class="q-px-md">
        <q-input borderless v-model="inputText" label="Add a new to-do">
          <template v-slot:after>
            <q-btn color="primary" label="Add" @click="addNewToDo(inputText)" />
          </template>
        </q-input>
      </div>
      <q-separator spaced />
      <q-item v-for="toDo in toDoList" :key="toDo.id" clickable v-ripple>
        <q-item-section>
          <q-checkbox size="lg" v-model="toDo.completed" val="lg" :label="toDo.title" />
        </q-item-section>

        <q-item-section side>
          <q-btn round flat color="deep-orange" icon="delete" @click="removeToDo(toDo.id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const toDoList = ref(null);

// Fetch to-do list from JSONPlaceholder API
fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => {
    toDoList.value = data;
  });

const inputText = ref(null);

const addNewToDo = (newToDoTitle) => {
  // Prevent adding empty to-do
  if (!newToDoTitle) return;

  // Create a new to-do object
  const newToDo = {
    userId: 1,
    id: toDoList.value.length + 1,
    title: newToDoTitle,
    completed: false
  };
  toDoList.value = [newToDo, ...toDoList.value];

  // Clear the input field
  inputText.value = null;
};

const removeToDo = (id) => {
  toDoList.value = toDoList.value.filter(toDo => toDo.id !== id);
};


</script>
