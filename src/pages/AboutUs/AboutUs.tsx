import "./AboutUs.css";
import AboutTransition from "../../components/AboutTransition/AboutTransition";
import QuienesSomos from "../../components/QuienesSomos/QuienesSomos";
import QueHacemos from "../../components/QueHacemos/QueHacemos";
import Values from "../../components/Values/Values";

function AboutUs() {
    return (
        <div className="about-us-page">
            <QuienesSomos />
            <AboutTransition />
            <QueHacemos />
            <Values />
        </div>
    );
}

export default AboutUs;
