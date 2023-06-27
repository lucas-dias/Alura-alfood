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
              <Link component={NavLink} to="/restaurantes/administracao">
                <Button sx={{ my: 2, color: 'white' }}> Restaurantes</Button>
              </Link>
              <Link component={NavLink} to="/restaurantes/administracao/novo">
                <Button sx={{ my: 2, color: 'white' }}> Novo Restaurante</Button>
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