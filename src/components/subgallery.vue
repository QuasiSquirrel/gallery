<template>
  <div class="gallery">
    <router-link :to="'/gallery'">Back to gallery</router-link>
    <div id="goleft" @click="position--">Left</div>
    <div id="gallery">
      <img :src="pic" alt="Gallery picutre" v-for="(pic, index) in items" :key="pic" ref="picture" :id="index" @click="selector($event)">
    </div>
    <div id="goright" @click="position++">Right</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      position: 0,
      id: null,
      gallery: []
    }
  },
  methods: {
    selector(event){
      let int = parseInt(event.target.id)
      if(2 === int){
        if(event.target.className)
          event.target.classList.remove('big');
        else
          event.target.classList.add('big')
      }
      else
        this.position = this.position - 2 + int;
    }
  },
  computed:{
    items: function() {
      let length = this.gallery.length;
      if(this.position === 0){
        return this.gallery.slice(- 2).concat(this.gallery.slice(0, 3))
      }
      else if(this.position === 1){
        return this.gallery.slice(- 1).concat(this.gallery.slice(0, 4))
      }
      else if(this.position === length - 2){
        return this.gallery.slice(this.position - 2).concat(this.gallery.slice(0, 1))
      }
      else if(this.position === length - 1){
        return this.gallery.slice(this.position - 2).concat(this.gallery.slice(0, 2))
      }
      else
        return this.gallery.slice(this.position - 2, this.position + 3)
    }
  },
  watch:{
    position: function() {
      if(this.position < 0)
        this.position = (this.gallery.length - 1);
      else if(this.position > (this.gallery.length - 1))
        this.position = 0;
    }
  },
  created(){
    this.id = this.$route.params.id
    for(let i = 1; i < 9; i++){
      this.gallery.push('/gallery/' + this.id + '/pic' + i + '.jpg')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#gallery{
  display: flex;
  align-items: center;
  position: relative;
}

#gallery img{
  object-fit: cover;
  border: 3px solid rgba(70, 76, 106, 1);
  outline: 1px solid black;
}

#gallery img:nth-child(1){
  flex: 0.3 0.3;
  z-index: 1;
  margin-right: -7%;
  box-shadow: 1px 1px 1px rgba(70, 76, 106, 0.5);
}
#gallery img:nth-child(2){
  flex: 0.7 0.7;
  z-index: 2;
  margin-right: -7%;
  box-shadow: 3px 3px 2px rgba(70, 76, 106, 0.5);
}
#gallery img:nth-child(3){
  flex: 1 1;
  z-index: 3;
  box-shadow: 3px 3px 2px rgba(70, 76, 106, 0.5);
}
#gallery img:nth-child(4){
  flex: 0.7 0.7;
  z-index: 2;
  margin-left: -7%;
  box-shadow: 3px 3px 2px rgba(70, 76, 106, 0.5);
}
#gallery img:nth-child(5){
  flex: 0.3 0.3;
  z-index: 1;
  margin-left: -7%;
  box-shadow: 1px 1px 1px rgba(70, 76, 106, 0.5);
}
</style>
