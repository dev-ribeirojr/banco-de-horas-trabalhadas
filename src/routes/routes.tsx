import { Routes, Route } from 'react-router-dom';

import LoginAndRegister from '../pages/LoginAndRegister';
import Home from '../pages/Home';

export default function RoutesApp() {

  return (
    <Routes>
      <Route path="/" element={<LoginAndRegister/>}/>
      <Route path="/home" element={<Home/>}/>

      {/* criar página de not found */}
    </Routes>
  )
}