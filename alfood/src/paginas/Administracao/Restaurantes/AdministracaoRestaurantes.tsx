import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import http from "../../../http"
import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Link, useParams } from "react-router-dom"

const AdministracaoRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<IRestaurante[]>('/restaurantes/')
      .then(
        resposta => {
          setRestaurantes(resposta.data)
        }
      )
      .catch(error => {
        console.log(error)
      })
  }, [])

  const excluirRestaurante = (restauranteAhSerExcluido: IRestaurante) => {
    http.delete(`/restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
        setRestaurantes([...listaRestaurante])
      })
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome do Restaurante</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map(restaurante =>
              <TableRow key={restaurante.id}>
                <TableCell>
                  {restaurante.nome}
                </TableCell>
                <TableCell>
                  [ <Link to={`/restaurantes/administracao/${restaurante.id}`}>Editar</Link> ]
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluirRestaurante(restaurante)}>Excluir</Button>
                </TableCell>
                <TableCell>
                  [ <Link to={`/restaurantes/administracao/${restaurante.id}`}>Editar</Link> ]
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluirRestaurante(restaurante)}>Excluir</Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AdministracaoRestaurantes