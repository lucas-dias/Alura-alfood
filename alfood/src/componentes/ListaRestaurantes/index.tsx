// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import IRestaurante from '../../interfaces/IRestaurante';
// import style from './ListaRestaurantes.module.scss';
// import Restaurante from './Restaurante';
// import { IPaginacao } from '../../interfaces/IPaginacao';
// import { TextField } from '@mui/material';

// const ListaRestaurantes = () => {

//   const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
//   const [proximaPagina, setProximaPagina] = useState('');

//   useEffect(() => {
//     axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
//       .then(resposta => {
//         setRestaurantes(resposta.data.results)
//         setProximaPagina(resposta.data.next)
//       }
//       )
//       .catch(erro => {
//         console.log(erro);
//       })
//   }, []);

//   const verMais = () => {
//     axios.get<IPaginacao<IRestaurante>>(proximaPagina)
//       .then(resposta => {
//         setRestaurantes([...restaurantes, ...resposta.data.results])
//         setProximaPagina(resposta.data.next)
//       }
//       )
//       .catch(erro => {
//         console.log(erro);
//       })
//   }

//   const pesquisarRestaurante = (evento: IRestaurante["nome"]) => {
//     axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/', {
//       params: {
//         search: `nome: ${evento}`
//       }
//     })
//   }

//   return (<section className={style.ListaRestaurantes}>
//     <h1>Os restaurantes mais <em>bacanas</em>!</h1>
//     {<form>
//       <TextField variant="outlined" label="Buscar restaurante" onChange={evento => pesquisarRestaurante(evento.target.value)}></TextField>
//     </form>}
//     {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}s
//     {proximaPagina && <button onClick={verMais}> Ver Mais</button>}s
//   </section>)
// }

// export default ListaRestaurantes  

import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

// esses são os possíveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const [busca, setBusca] = useState('')

  // agora, o carregarDados recebe opcionalmente as opções de configuração do axios
  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  // a cada busca, montamos um objeto de opções
  // evento deve ser do tipo React.FormEvent, ao invés do tipo IRestaurante
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => {
    // obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
      <button type='submit'>Pesquisar</button>
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
      Página Anterior
    </button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
      Próxima página
    </button>}
  </section>)
}

export default ListaRestaurantes