import "./AboutUs.css";
import AboutTransition from "../../components/AboutTransition/AboutTransition";
import QuienesSomos from "../../components/QuienesSomos/QuienesSomos";

function AboutUs() {
    return (
        <div className="about-us-page">
            <QuienesSomos />
            <AboutTransition />
        </div>
    );
}

export default AboutUs;
