import { Box, Button, TextField, Typography } from "@mui/material"
import http from "../../../http"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurantes = () => {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert(`Nome atualizado com sucesso para: ${nomeRestaurante}!`)
        })
    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante Cadastrado com Sucesso!")
        })
        .catch(error => console.log(error))
    }

  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2em' }}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '0.8em', flex: '1' }} onSubmit={aoSubmeterForm}>
        <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
        <TextField
          value={nomeRestaurante}
          onChange={evento => setNomeRestaurante(evento.target.value)}
          id="outlined-basic"
          label="Nome do Restaurante"
          variant="outlined"
          required
        />
        <Button type="submit" variant="outlined">Salvar</Button>
      </Box>
    </Box>
  )
}

export default FormularioRestaurantes