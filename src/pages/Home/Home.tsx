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
            <MoocTutorials />
            <div style={{ position: "relative", zIndex: 1, isolation: "isolate" }}>
                <Innovation />
            </div>
            <div style={{ position: "relative", zIndex: 2, isolation: "isolate" }}>
                <ToolsTeacher />
            </div>
        </div>
    )

}

export default Home
