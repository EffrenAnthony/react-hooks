// import { useState } from 'react';
import './App.css';
import Characters from './components/Characters';
import Header from './components/Header';
import GlobalContainer from './containers/GlobalContainer';
import { ThemeProvider} from './context/ThemeContext';
// import ThemeContext from './context/ThemeContext';

// IMPORTANTE, CONTEXT NO PUEDE SER UTILIZADO ANTES DE SU INICIALIZACIÓN EN ESTE RETURN EN EL APP, POR ELLO LAS FUNCIONES O SILLAMAMOS AL CONTEXT AQUI, 
// ANTES DEL RETURN, NO FUNCIONARÁ
function App() {
  // const [darkmode, setDarkmode] = useState(false);

  // const handleClick = () => {
  //   setDarkmode(!darkmode);
  // }
  // const { handleClick, darkmode } = useTheme();

  // const onClick = () => {
  //   handleClick()
  // }

  return (
    <ThemeProvider>
      {/* <div className={darkmode ? 'App_dark' : 'App'}> */}
      {/* <div className={'App'}> */}
        {/* <Header handleClick={onClick} darkmode={darkmode}/> */}
        <GlobalContainer>
          <Header />
          <Characters />

        </GlobalContainer>
      {/* </div> */}
    </ThemeProvider>
  );
}

export default App;
