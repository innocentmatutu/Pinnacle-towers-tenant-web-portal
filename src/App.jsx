import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Documents from './components/records/documents.jsx';
import Report from './components/records/report.jsx';
import Billings from './Billings.jsx';
import Menu from './Menu.jsx';

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <main className="main-content">
        <Routes>
          <Route path="/Billings" element={<Billings />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/Report" element={<Report />} />

          <Route path="/" element={<Navigate to="/Billings" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
