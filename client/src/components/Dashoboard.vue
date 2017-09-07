<template>
  <div class="dashboard">
    <div class="container-fluid">
      <addRoom></addRoom>
    </div>
  </div>
</template>

<script>
import addRoom from '@/components/AddRoom'
export default {
  name: 'dashboard',
  components: {
    addRoom
  }
}
</script>

<style>

</style>