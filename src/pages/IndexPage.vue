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
  @media (min-width: $breakpoint-sm-min) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media (min-width: $breakpoint-lg-min) {
    padding-left: 10rem;
    padding-right: 10rem;
  }
}
</style>
