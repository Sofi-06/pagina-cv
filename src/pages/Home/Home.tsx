import "./Home.css";
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import WhatWeDo from '../../components/WhatWeDo/WhatWeDo';

function Home() {
    return (
        <div className="home-page-container">
            <HomeCarousel />
            <WhatWeDo />
        </div>
    )

}

export default Home
