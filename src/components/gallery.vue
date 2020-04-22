<template>
    <div class="gallery-container">

        <ul>
            <li v-for="(gallery, index) in galleryArray" :key="gallery" v-bind:id="index">                
                <router-link v-bind:to="'/gallery/' + gallery" exact>{{gallery}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            galleryArray: ['gallery1', 'gallery2', 'gallery3', 'gallery4', 'gallery5', 'gallery6']
        }
    }
}
</script>

<style>

</style>