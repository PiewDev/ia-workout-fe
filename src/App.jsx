import './App.css';
import { Outlet } from 'react-router-dom';
import { AppProvider } from './pages/context-provider/AppProvider';

function App() { 

  return (
    <> 
     <div className="container">
      <AppProvider>
        <Outlet />
      </AppProvider>
     </div>
    </>
  );
}

export default App;
