import { ActivityPage } from "@/components/ActivityPage";
import { FocusPage } from "@/components/FocusPage";
import MainPage from "@/components/MainPage";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isActivityPage = location.pathname.startsWith("/activity");

  return (
    <div
      className={`rounded-lg bg-[#131313] p-8 font-geistSans text-sm text-white ${
        isActivityPage ? "w-[800px]" : "w-[400px]"
      }`}
    >
      {children}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/activity/:id" element={<ActivityPage />} />
        </Routes>
      </PageWrapper>
    </HashRouter>
  );
}
