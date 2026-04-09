import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout showChatbot>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/campus"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
