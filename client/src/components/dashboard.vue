<template>
  <div class="dashboard">
    <div class="container-fluid">
      <div class="row top-wrap">
        <div class="col-sm-12 col-md-9" >
          <image src="./assets/img-logo.png" />
        </div>
        <div class="col-sm-12 col-md-3" >
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle"
              data-toggle="dropdown" role="button"
              aria-expanded="false"> Username
              <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                  <li><a href="#">Category1</a></li>
                  <li><a href="#">Category2</a></li>
                  <li><a href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <addRoom />
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
