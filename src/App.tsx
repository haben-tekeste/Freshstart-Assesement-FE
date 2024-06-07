import Nav from "@components/Nav";
import AddItem from "@pages/AddItem";
import EditItem from "@pages/EditItem";
import DeleteItem from "@pages/DeleteItem";
import Home from "@pages/index";
import Dashboard from "@pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit" element={<EditItem />} />
        <Route path="/delete" element={<DeleteItem />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
