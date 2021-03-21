<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>

    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">
    
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">

        <meu-painel :titulo = "foto.titulo">
            <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
            <meu-botao rotulo="REMOVER" tipo="button" @botaoAtivado="remove(foto)" :confirmacao="true" estilo="perigo"/>
        </meu-painel>

      </li>
    </ul>
  </div>   
  
</template>

<script>
  import Painel from '../shared/painel/Painel.vue';
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
  import Botao from '../shared/botao/Botao.vue';
  import FotoService from '../../domain/foto/FotoService';
  export default {
    components: {
      'meu-painel': Painel,
      'imagem-responsiva': ImagemResponsiva,
      'meu-botao': Botao
    },
    data(){
      return {
        titulo: 'Alurapic',
        fotos: [],
        filtro: '',
        mensagem: ''
      }
    },
    created(){

      this.service = new FotoService(this.$resource);
      this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => console.log(err));

    },
    methods: {

      remove(foto){
        this.service.apaga(foto._id)
        .then(() => {
            let indice = this.fotos.indexOf(foto); // acha a posição da foto na lista
            this.fotos.splice(indice, 1); // a instrução altera o array
            // assim que apagar, exibe a mensagem para o usuário
            this.mensagem = 'Foto removida com sucesso'
          }, 
          err => {
            this.mensagem = 'Não foi possível remover a foto';
            console.log(err);
          }
        )
      }
    },
    computed: {
      fotosComFiltro(){
        if(this.filtro){
          // criando uma expressão com o valor do filtro, insensitivo
          let exp = new RegExp(this.filtro.trim(), 'i');
          // retorna apenas as fotos que condizem com a expressão
          return this.fotos.filter(foto => exp.test(foto.titulo));
        } else {
          return this.fotos;
        }
      }
    }
  }
</script>

<style>
  .centralizado{
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  /* código anterior omitido */
  .filtro {
    display: block;
    width: 100%;
  }

</style>
