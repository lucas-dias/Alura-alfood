import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material"
import { Link as NavLink, Outlet } from "react-router-dom"
const AdmDashboard = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">
              Administração
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: '1' }}>
              <Link component={NavLink} to="/administracao/restaurantes/">
                <Button sx={{ my: 2, color: 'white' }}> Restaurantes</Button>
              </Link>
              <Link component={NavLink} to="/administracao/restaurantes/novo">
                <Button sx={{ my: 2, color: 'white' }}> Novo Restaurante</Button>
              </Link>
              <Link component={NavLink} to="/administracao/pratos/">
                <Button sx={{ my: 2, color: 'white' }}> Pratos</Button>
              </Link>
              <Link component={NavLink} to="/administracao/pratos/novo">
                <Button sx={{ my: 2, color: 'white' }}> Novo Prato</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  )
}


export default AdmDashboard