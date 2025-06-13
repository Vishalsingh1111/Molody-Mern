
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UploadSong from "../../admin/src/Components/UploadNewSong";
import DashboardLayout from "./Components/Dashboard";
import NewArtist from "./Components/NewArtist";

function App() {
  return (
    <Router>

      <div className="min-h-screen bg-black text-white pb-20">
        <Routes>
          <Route path="/" element={<DashboardLayout />} />
          <Route path="/Addsong" element={<UploadSong />} />
          <Route path="/Artist" element={<NewArtist />} />
        </Routes>

        {/* Music player will be fixed at bottom */}

      </div>
    </Router>
  );
}

export default App;