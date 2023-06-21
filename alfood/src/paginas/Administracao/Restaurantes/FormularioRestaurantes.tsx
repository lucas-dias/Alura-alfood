import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

const FormularioRestaurantes = () => {

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault()
    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome: nomeRestaurante
    })
      .then(() => {
        alert("Restaurante Cadastrado com Sucesso!")
      })
      .catch(error => console.log(error))
  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
      <Button type="submit" variant="outlined">Outlined</Button>
    </form>
  )
}

export default FormularioRestaurantes