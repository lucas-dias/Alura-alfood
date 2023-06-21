import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurantes = () => {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault()

    if (parametros.id) {
      axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert(`Nome atualizado com sucesso para: ${nomeRestaurante}!`)
        })
    } else {
      axios.post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante Cadastrado com Sucesso!")
        })
        .catch(error => console.log(error))
    }

  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} id="outlined-basic" label="Nome do Restaurante" variant="outlined" />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  )
}

export default FormularioRestaurantes