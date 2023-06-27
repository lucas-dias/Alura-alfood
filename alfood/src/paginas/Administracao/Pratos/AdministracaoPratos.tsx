import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import http from "../../../http"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {

  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>('/pratos/')
      .then(
        resposta => {
          setPratos(resposta.data)
        }
      )
      .catch(error => {
        console.log(error)
      })
  }, [])

  const excluirPrato = (pratoAhSerExcluido: IPrato) => {
    http.delete(`/pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const listaPrato = pratos.filter(restaurante => restaurante.id !== pratoAhSerExcluido.id)
        setPratos([...listaPrato])
      })
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Imagem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map(prato =>
              <TableRow key={prato.id}>
                <TableCell>
                  {prato.nome}
                </TableCell>
                <TableCell>
                  <Link to={`/administracao/pratos/${prato.id}`}>Editar</Link>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluirPrato(prato)}>Excluir</Button>
                </TableCell>
                <TableCell>
                  {prato.descricao}
                </TableCell>
                <TableCell>
                  {prato.tag}
                </TableCell>
                <TableCell>
                  <a href={prato.imagem} target="_blank" rel="norreferer">Ver Imagem</a>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AdministracaoPratos