import "./Home.css";
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import WhatWeDo from '../../components/WhatWeDo/WhatWeDo';
import MoocTutorials from '../../components/MoocTutorials/MoocTutorials';
import Innovation from '../../components/Innovation/Innovation';

function Home() {
    return (
        <div className="home-page-container">
            <HomeCarousel />
            <WhatWeDo />
            <MoocTutorials />
            <Innovation />
        </div>
    )

}

export default Home
