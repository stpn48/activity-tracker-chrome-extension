import { HashRouter, Route, Routes } from "react-router-dom";
import { FocusPage } from "./components/FocusPage";
import MainPage from "./components/MainPage";

export default function App() {
  return (
    <HashRouter>
      <div className="font-geistSans rounded-lg w-[400px] text-sm bg-[#131313] p-8 text-white">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/focus" element={<FocusPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
