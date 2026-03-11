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
            <Innovation />
            <ToolsTeacher />
        </div>
    )

}

export default Home
