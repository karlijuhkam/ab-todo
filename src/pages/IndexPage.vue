<template>
  <q-page class="flex flex-center">
    <ToDoList />
  </q-page>
</template>

<script setup>
import ToDoList from 'src/components/ToDoList.vue';
defineOptions({
  name: 'IndexPage'
});
</script>
