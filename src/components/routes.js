import Gallery from './gallery.vue'
import Subgallery from './subgallery.vue'

export default[
    {path: '/gallery', component: Gallery},
    {path: '/gallery/:id', component: Subgallery}
]