import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Documents from './components/records/documents.jsx';

import Billings from './Billings.jsx';
function App() {
  {/*   
   <div className="container">
<button className="menu-btn"onClick={()=>setopen(!open)}>
 ☰

</button> */}
  return (
    <>
<h1 class Name= "Bill-Tilt">Billing Settings</h1>
  <p>Hello World!</p>
      <Billings />
      
<Documents/>
    </>
  );
}
export default App
