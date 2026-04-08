import "./AboutUs.css";
import AboutTransition from "../../components/AboutTransition/AboutTransition";
import QuienesSomos from "../../components/QuienesSomos/QuienesSomos";
import QueHacemos from "../../components/QueHacemos/QueHacemos";
import Team from "../../components/Team/Team";
import Values from "../../components/Values/Values";

function AboutUs() {
    return (
        <div className="about-us-page">
            <QuienesSomos />
            <AboutTransition />
            <QueHacemos />
            <Values />
            <Team />
        </div>
    );
}

export default AboutUs;
