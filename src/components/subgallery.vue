<template>
  <div class="gallery">
    <router-link :to="'/gallery'">Back to gallery</router-link>
    <div id="left" @click="left()">Left</div>
    <div id="gallery">
      <img v-for="pic in gallery" :key="pic" :src="pic" alt="Gallery picutre" ref="picture">
    </div>
    <div id="right" @click="right()">Right</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      position: 2,
      id: null,
      gallery: []
    }
  },
  methods: {
    left(){
      this.position --;
      let length = this.gallery.length;      
      if(this.position < 0){
        this.position = (length - 1);
      }
      for(let i = 0; i < length; i++){
        this.$refs.picture[i].className = '';
      }
      for(let i = -2; i <= 2; i++){
        if(i + this.position < 0){
          this.$refs.picture[length + i + this.position].classList.add('pic' + (i + 2))
          }
        else if(i + this.position >= length){
          this.$refs.picture[this.position + i - length].classList.add('pic' + (i + 2))
        }
        else{
          this.$refs.picture[i + this.position].classList.add('pic' + (i + 2))
        }
      }
    },
    right(){
      this.position ++;
      let length = this.gallery.length;
      for(let i = 0; i < length; i++){
        this.$refs.picture[i].className = '';
      }
      for(let i = -2; i <= 2; i++){
        if(i + this.position >= length)
          this.$refs.picture[this.position + i - length].classList.add('pic' + (i + 2))
        else if(this.position === 1 && i === -2)
          this.$refs.picture[length - 1].classList.add('pic0')
        else{
          this.$refs.picture[this.position + i].classList.add('pic' + (i + 2))
        }
      }
      if(this.position > (length - 1))
        this.position = 0;
    }
  },
  created(){
    //ideally you want to a GET call to the server to serve you
    //the gallery picture paths array
    this.id = this.$route.params.id
    for(let i = 1; i < 9; i++){
      this.gallery.push('/gallery/' + this.id + '/pic' + i + '.jpg')
    }
  },
  mounted(){
      for(let i = 0; i < 5; i++){
        this.$refs.picture[i].classList.add('pic' + i);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#goright{
  border: 1px solid black;
  height: 100vh;
  width: 30px;
  float: right;
  margin: auto;
  z-index: 4;
}

#goleft{
  border: 1px solid black;
  height: 100vh;
  width: 30px;
  float: left;
  margin: auto;
  z-index: 4;
}

#gallery{
  display: flex;
  align-items: center;
  height: 80vh;
}

#gallery img{
  margin-bottom: 15%;
  visibility: hidden;
  max-height: 0;
  max-width: 0;
  object-fit: cover;
  border: 3px solid rgba(70, 76, 106, 1);
  outline: 1px solid black;
  transition: flex 0.5s, margin-bottom 0.5s, ease-out;
}

#gallery .big{
  min-height: 90vh;
  min-width: auto;
}

#gallery .pic0{
  visibility: visible;
  flex: 0.3;
  z-index: 1;
  margin-right: -7%;
  margin-bottom: 10%;
  box-shadow: 1px 1px 1px rgba(70, 76, 106, 0.5);
  max-height: 30vh;
  max-width: 30vw;
  order: 1;
}

#gallery .pic1{
  visibility: visible;
  flex: 0.6;
  z-index: 2;
  margin-right: -7%;
  margin-bottom: 5%;
  box-shadow: 3px 3px 2px rgba(70, 76, 106, 0.5);
  max-height: 40vh;
  max-width: 50vw;
  order: 2;
}

#gallery .pic2{
  visibility: visible;
  flex: 1;
  z-index: 3;
  margin-bottom: 0;
  box-shadow: 3px 3px 2px rgba(70, 76, 106, 0.5);
  max-height: 100vh;
  max-width: 100vw;
  order: 3;
}

#gallery .pic3{
  visibility: visible;
  flex: 0.6;
  z-index: 2;
  margin-left: -7%;
  margin-bottom: 5%;
  box-shadow: 3px 3px 2px rgba(70, 76, 106, 0.5);
  max-height: 40vh;
  max-width: 50vw;
  order: 4;
}

#gallery .pic4{
  visibility: visible;
  flex: 0.3;
  z-index: 1;
  margin-left: -7%;
  margin-bottom: 10%;
  box-shadow: 1px 1px 1px rgba(70, 76, 106, 0.5);
  max-height: 30vh;
  max-width: 30vw;
  order: 5;
}
</style>
