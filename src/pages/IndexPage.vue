<template>
  <q-page>
    <ToDoList />
  </q-page>
</template>

<script setup>
import ToDoList from 'src/components/ToDoList.vue';
defineOptions({
  name: 'IndexPage'
});
</script>

<style lang="scss">
.q-page {
  @media (min-width: 600px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media (min-width: 1440px) {
    padding-left: 10rem;
    padding-right: 10rem;
  }
}
</style>
