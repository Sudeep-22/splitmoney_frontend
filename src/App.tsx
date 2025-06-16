import './App.css'
import Login from './pages/Login'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Appbar from './components/Appbar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Groups from './pages/Groups'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#FEFEFE',
      light: '#E9DB5D',
      dark: '#c9def2',
      contrastText: '#1976d2',
    },
  },
});
function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Appbar/> 
        <Routes>
          <Route path="/" element={<Groups/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
