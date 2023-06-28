import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import http from "../../../http"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"
import ITag from "../../../interfaces/ITag"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioPratos = () => {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => {
          setNomeId(resposta.data.nome.toString())
        })
    }
  }, [parametros])

  // const nomeRestauranteId = () => {
  //   http.get<IRestaurante>(`restaurantes/${nomeId}`)
  //     .then(resposta => {
  //       resNomeId = resposta.data.nome
  //     })
  // 

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => {
          setNomePrato(resposta.data.nome)
          setDescricao(resposta.data.descricao)
          setTag(resposta.data.tag)
          // setRestaurante(resNomeId) - Como settar este nome no momento de editar o prato?
        })
    }
  }, [parametros])






  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tags, setTags] = useState<ITag[]>([])
  const [tag, setTag] = useState('')
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [restaurante, setRestaurante] = useState('')
  const [nomeId, setNomeId] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)


  useEffect(() => {
    http.get<{ tags: ITag[] }>("tags/")
      .then(resposta => setTags(resposta.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault()

    const formData = new FormData();

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if (imagem) {
      formData.append('imagem', imagem)
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => {
        setDescricao('')
        setNomePrato('')
        setTag('')
        alert('Prato cadastrado com sucesso')
      })
      .catch(error => console.log(error))
  }

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null);
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2em', flexGrow: '1' }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '0.8em', flex: '1', flexGrow: '1', width: '50%' }} onSubmit={aoSubmeterForm}>
          <Typography component="h1" variant="h6">Formulário do Prato</Typography>
          <TextField
            value={nomePrato}
            onChange={evento => setNomePrato(evento.target.value)}
            id="outlined-basic"
            label="Nome do Prato"
            variant="outlined"
            required
          />
          <TextField
            value={descricao}
            onChange={evento => setDescricao(evento.target.value)}
            id="outlined-basic"
            label="Descrição do Prato"
            variant="outlined"
            required
          />
          <FormControl>
            <InputLabel id="select-tag">Tag:</InputLabel>
            <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
              {tags.map(tag => <MenuItem value={tag.value} key={tag.id}>{tag.value}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="select-restaurante">Restaurante:</InputLabel>
            <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
              {restaurantes.map(restaurante => <MenuItem value={restaurante.id} key={restaurante.id}>{restaurante.nome}</MenuItem>)}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionarArquivo} />
          <Button type="submit" variant="outlined">Salvar</Button>
        </Box>
      </Box>
    </>
  )
}

export default FormularioPratos