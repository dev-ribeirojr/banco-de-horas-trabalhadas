import { BrowserRouter } from 'react-router-dom';
import './app.css';
import RoutesApp from './routes/routes';

export default function App() {
  return (
    <BrowserRouter>
      <RoutesApp/>
    </BrowserRouter>
  );
}
