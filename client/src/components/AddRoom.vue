<template>
  <div class="addroom">
    <div class="row card-wrap">
      <div class="cardo col-sm-12 col-md-3">
        <div class="box">
          <div class="add-wrapper">
            <img src="../assets/plus.png" />
          </div>
          <div class="card-block">
            <h4 class="card-title">Add Town</h4>
          </div>
        </div>
      </div>
      <div class="cardo col-sm-12 col-md-3" v-for="room in rooms">
        <div class="box">
          <div class="img-wrapper">
            <img src="../assets/wolfie.png" />
          </div>
          <div class="card-block">
            <h4 class="card-title">Town Name</h4>
            <h3 class="card-title"><strong>{{room.name}}</strong></h3>
            <h4 class="card-title">Population: {{Object.keys(room.member).length}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addroom',
  firebase () {
    return {
      rooms: this.$db.ref('rooms')
    }
  }
}
</script>
