import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

interface Props {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;