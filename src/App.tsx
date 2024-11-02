import { FocusPage } from "@/components/FocusPage";
import MainPage from "@/components/MainPage";
import { HashRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <div className="w-[400px] rounded-lg bg-[#131313] p-8 font-geistSans text-sm text-white">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/activity/[id]" element=} /> // TODO: Add activity page with graph timeStamp array should be taken care of GN BRO KEEP WORKIN !! TRUST IN JESUS
        </Routes>
      </div>
    </HashRouter>
  );
}
