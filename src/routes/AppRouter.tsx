import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
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
      <Route
        path="/contacto"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRouter;