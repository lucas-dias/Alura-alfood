import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Box, Select } from '@mui/material';
import v1 from '../../v1';

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
  const [ordenacao, setOrdenacao] = useState('')

  // agora, o carregarDados recebe opcionalmente as opções de configuração do axios
  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

    v1.get<IPaginacao<IRestaurante>>(url, opcoes)
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

    if (ordenacao) {
      opcoes.params.ordering = ordenacao
    }
    carregarDados('/restaurantes/', opcoes)
  }

  useEffect(() => {
    // obter restaurantes
    carregarDados('/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '25px' }} onSubmit={buscar}>
      <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
      <select
        name="select-ordenacao"
        id="select-ordenacao"
        value={ordenacao}
        onChange={evento => setOrdenacao(evento.target.value)}
      >
        <option value="">Padrão</option>
        <option value="id">Por ID</option>
        <option value="nome">Por Nome</option>
      </select>
      <button type='submit'>Pesquisar</button>
    </Box>
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