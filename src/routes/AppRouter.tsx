import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";

const AppRouter = () => {
  return (
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
  );
};

export default AppRouter;
