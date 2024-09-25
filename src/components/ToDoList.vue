<template>
  <div class="column q-pa-md q-gutter-md full-width full-height">
    <div class="q-px-md">
      <q-input v-model="inputText" label="Add a new to-do" @keydown.enter="addNewToDo(inputText)">
        <template v-slot:after>
          <q-btn color="primary" label="Add" @click="addNewToDo(inputText)" />
        </template>
      </q-input>
    </div>
    <q-virtual-scroll v-if="filteredToDos && filteredToDos.length > 0" bordered class="rounded-borders"
      :items="filteredToDos" v-slot="{ item, index }" style="height: 75dvh">
      <q-item :key="index" clickable v-ripple>
        <q-item-section>
          <q-checkbox size="lg" v-model="item.completed" val="lg" :label="item.title" />
        </q-item-section>
        <q-item-section side>
          <q-btn round flat color="deep-orange" icon="delete" @click="removeToDo(item.id)" />
        </q-item-section>
      </q-item>
      <q-inner-loading :showing="loading" />
    </q-virtual-scroll>
    <p v-else class="q-pa-md text-center flex content-center justify-center" style="height: 75dvh">
      {{ noToDoMessage }}
    </p>
    <div>
      <q-btn-toggle v-model="filter" toggle-color="primary" :options="[
        { label: 'Show all', value: 'all' },
        { label: 'Done', value: 'done' },
        { label: 'Undone', value: 'undone' }
      ]" />

      <q-btn outline color="red" label="Clear all" icon="delete" @click="clearAll" />
      <q-btn outline color="primary" icon="refresh" @click="reloadToDoList" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const toDoList = ref(null);
const loading = ref(false);
const inputText = ref(null);
const filter = ref('all');

const loadInitialData = async () => {
  try {
    loading.value = true;
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        toDoList.value = data;
      });
    if (response) {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      toDoList.value = await response.json();
    }

  } catch (error) {
    console.error(error.message);
  } finally {
    loading.value = false;
  }
}

loadInitialData();

const addNewToDo = (newToDoTitle) => {
  // Prevent adding empty to-do
  if (!newToDoTitle) return;

  // Create a new to-do object
  const newToDo = {
    userId: 1,
    id: toDoList.value.length + 1,
    title: newToDoTitle,
    completed: filter.value === 'done' ? true : false
  };
  toDoList.value = [newToDo, ...toDoList.value];

  // Clear the input field
  inputText.value = null;
};

const removeToDo = (id) => {
  toDoList.value = toDoList.value.filter(toDo => toDo.id !== id);
};

const filterToDos = (filter) => {
  switch (filter) {
    case 'done':
      return toDoList.value.filter(toDo => toDo.completed);
    case 'undone':
      return toDoList.value.filter(toDo => !toDo.completed);
    default:
      return toDoList.value;
  }
};

const filteredToDos = computed(() => filterToDos(filter.value));

const clearAll = () => {
  toDoList.value = [];
};

const noToDoMessage = computed(() => {
  if (filter.value === 'done') {
    return 'No to-dos with "Done" status found. Add a new to-do above.';
  }
  if (filter.value === 'undone') {
    return 'No to-dos with "Undone" status found. Add a new to-do above.';
  }

  return ' No to-dos found. Add a new to-do above.';
});

const reloadToDoList = () => {
  loadInitialData();
}

</script>
