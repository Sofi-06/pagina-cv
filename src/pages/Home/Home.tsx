import "./Home.css";
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import WhatWeDo from '../../components/WhatWeDo/WhatWeDo';
import MoocTutorials from '../../components/MoocTutorials/MoocTutorials';
import Innovation from '../../components/Innovation/Innovation';
import ToolsTeacher from '../../components/ToolsTeacher/ToolsTeacher';

function Home() {
    return (
        <div className="home-page-container">
            <HomeCarousel />
            <WhatWeDo />

            {/* Transition: Mooc -> Innovation -> Tools -> Footer 
                We use reveal-wrappers to provide scroll distance for each sticky layer. */}

            <div className="reveal-wrapper" style={{ zIndex: 40 }}>
                <MoocTutorials />
            </div>

            <div className="reveal-wrapper" style={{ zIndex: 30, marginTop: "-80vh" }}>
                <Innovation />
            </div>

            <div className="reveal-wrapper reveal-wrapper-tools" style={{ zIndex: 20, marginTop: "-74vh" }}>
                <ToolsTeacher />
            </div>
        </div>
    )

}

export default Home
