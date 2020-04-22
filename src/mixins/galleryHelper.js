export default{
    methods:{
        next(position, array){
            position++;
            if(position > (array.length - 1))
                position = 0;
            this.position = position;
            let img = document.createElement(img);
            let toDelete = document.querySelector("#gallery img:nth-child(1)");
            toDelete.parentNode.removeChild(toDelete);
            img.src = array[position + 1];
            img.parentNode.appendChild(img);

        },
        previous(position, array){

        }
    }
}