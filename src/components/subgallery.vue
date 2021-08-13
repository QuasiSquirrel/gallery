<template>
   <div class="gallery">
      <router-link :to="'/gallery'">Back to gallery</router-link>
      <div
         id="gallery"
         @mousemove.prevent="drag($event)"
         @mousedown.prevent="startdrag($event)"
         @mouseup="stopdrag"
         @mouseleave="stopdrag"
      >
         <img
         v-for="(value, name) in gallery"
         :key="name"
         :src="`/gallery/${$route.params.id}/${name}`"
         :id="name"
         alt="Gallery picutre"
         ref="picture"
         />
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         gallery: {},
         currentX: 0,
         previousX: 0,
         target: undefined,
         dragging: false,
         velocity: 0,
         topPicture: undefined,
         galleryEl: undefined
      }
   },
   methods: {
      drag(e) {
         if (this.dragging) {
            this.previousX = this.currentX;
            this.currentX = e.clientX;
            this.pictureIterator(this.currentX - this.previousX)
         }
      },
      startdrag(e) {
         this.currentX = e.clientX;
         this.previousX = this.currentX;
         this.dragging = true;
         this.target = e.target;
      },
      stopdrag() {
         if(this.dragging){
            this.dragging = false;
            this.velocity = this.currentX - this.previousX;
            this.animate(this.velocity);
         }
         
      },
      animate(velocity) {
         requestAnimationFrame(() => {
            if (this.dragging)
               return;
            if (velocity < 1 && velocity > -1){
               setTimeout(() => {
                  this.centerElements((this.topPicture.offsetLeft + this.topPicture.offsetWidth / 2) - this.galleryEl.clientWidth / 2)
               }, 300);
               return;
            }
            this.pictureIterator(velocity)
            this.animate(velocity*0.85);
         })
      },
      centerElements(distance){
         requestAnimationFrame(() => {
            if(distance === 0)
               return
            if(distance < 0 && distance > -3){
               this.pictureIterator(1)
            }
            else if (distance > 0 && distance < 3){
               this.pictureIterator(-1)
            }
            else if(distance < 0){
               this.pictureIterator(3)
            }
            else {
               this.pictureIterator(-3)
            }
            this.centerElements((this.topPicture.offsetLeft + this.topPicture.offsetWidth / 2) - this.galleryEl.clientWidth / 2)
         })
      },
      pictureIterator(coefficient){
         for (let i of this.$refs.picture) {
            this.gallery[i.id] = this.gallery[i.id] + coefficient;
            const eccentricAngle = (this.gallery[i.id] / (this.galleryEl.clientWidth)) * Math.PI
            i.style.height = (Math.sin(eccentricAngle) + 1) * 14 + 1 + "vw";
            i.style.top = (this.galleryEl.clientHeight / 2 - i.offsetHeight / 2) + Math.round(this.galleryEl.clientHeight / 4 * Math.sin(eccentricAngle)) + 'px';
            i.style.left = (this.galleryEl.clientWidth / 2 - i.offsetWidth / 2) + Math.round(this.galleryEl.clientWidth / 3 * -Math.cos(eccentricAngle)) + 'px';
            i.style['z-index'] = Math.round(i.offsetTop + i.offsetHeight/2);
            if(i.style['z-index'] > this.topPicture.style['z-index'])
               this.topPicture = i;
         }
      }
   },
   created() {
      //ideally you want to a GET call to the server to serve you
      //the gallery picture paths array
      for (let i = 1; i < 9; i++) {
         this.gallery["pic" + i + ".jpg"] = 0
      }
   },
   mounted() {
      this.galleryEl = document.getElementById("gallery");

      for (let i = 0; i < this.galleryEl.children.length; i++){
         this.$refs.picture[i].style.visibility = 'hidden';
      }

      window.addEventListener("load", () => {
         for (let i = 0; i < this.galleryEl.children.length; i++){
               this.$refs.picture[i].style.visibility = 'visible';
               this.gallery[this.$refs.picture[i].id] = (i/this.galleryEl.children.length) * this.galleryEl.clientWidth * 2;
               const eccentricAngle = (this.gallery[this.$refs.picture[i].id] / (this.galleryEl.clientWidth)) * Math.PI;
               this.$refs.picture[i].style.height = (Math.sin(eccentricAngle) + 1) * 14 + 1 + "vw";
               this.$refs.picture[i].style.top = (this.galleryEl.clientHeight / 2 - this.$refs.picture[i].offsetHeight / 2) + Math.round(this.galleryEl.clientHeight / 4 * Math.sin(eccentricAngle)) + 'px'
               this.$refs.picture[i].style.left = (this.galleryEl.clientWidth / 2 - this.$refs.picture[i].offsetWidth / 2) + Math.round(this.galleryEl.clientWidth / 3 * -Math.cos(eccentricAngle)) + 'px';
               this.$refs.picture[i].style['z-index'] = Math.round(this.$refs.picture[i].offsetTop + this.$refs.picture[i].offsetHeight/2);
         }
      })
      this.topPicture = this.galleryEl.childNodes[0];
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
   box-sizing: border-box;
   margin: 0;
}

#gallery {
   display: flex;
   align-items: center;
   height: 80vh;
   width: 100vw;
}

#gallery img {
   position: absolute;
   max-height: 95vh;
   max-width: 95vw;
}
</style>
