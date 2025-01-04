import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './Pages/Home';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
      <Router>
      <div className="h-screen">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`pt-14 ${isSidebarOpen ? 'ml-64' : ''} transition-margin duration-300 ease-in-out`}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        </div>
      </Router>
  )
}

export default App
