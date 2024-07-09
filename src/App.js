import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './comp/navbar.js';
import Search from './comp/Search.js';
import Toprated from './comp/movie/Toprated.js';
import Pop from './comp/movie/Pop.js';
import Popu from './comp/tv/Popu.js';
import Trend from './comp/tv/Trend.js';
import Toprate from './comp/tv/Toprate.js';
import Detail from './comp/movie/Detail.js';
import Tvdetail from './comp/tv/Tvdetail.js';
import Hindi from './comp/lang/Hindi.js';
import Gujarati from './comp/lang/Gujarati.js';
import Marathi from './comp/lang/Marathi.js';
import English from './comp/lang/English.js';
import Trending from './comp/movie/Trending.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Pop" element={<Pop />} />
        <Route path="/Popu" element={<Popu />} />
        <Route path="/Trend" element={<Trend />} />
        <Route path="/Toprate" element={<Toprate />} />
        <Route path="/Toprated" element={<Toprated />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Hindi" element={<Hindi />} />
        <Route path="/Marathi" element={<Marathi />} />
        <Route path="/Gujarati" element={<Gujarati />} />
        <Route path="/English" element={<English />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Tvdetail/:id" element={<Tvdetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
