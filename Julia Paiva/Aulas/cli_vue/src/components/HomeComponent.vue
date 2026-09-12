<template>
    <div>
        <header>
            <p>Seja bem vindo:{{ nome }}</p>
            <img 
                width="200" 
                :height="altura" 
                :src="urlImgFlamengo" />
        </header>
    </div>
</template>

<script>
export default{
    name: "HomeComponent",
    data() {
        return{
            nome:"Julia",
            altura:150,
            urlImgFlamengo:"https://upload.wikimedia.org/wikipedia/commons/9/93/Flamengo-RJ_%28BRA%29.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
        };
    },
    mounted(){
        setTimeout(()=>{
            this.urlImgFlamengo="https://s3.glbimg.com/v1/AUTH_35862ca5c6ab48b992baf1f1b4f7062e/m-extra-globo-com/incoming/22575458-b4b-d97/w488h275-PROP/flamengo-escudo.jpg"
        }, 5*1000)
    }
};
</script>
