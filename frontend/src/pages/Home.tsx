import TourAutoComplete from "../components/TourAutoComplete";
import LocationAutoComplete from "../components/LocationAutoComplete";
import EventAutoComplete from "../components/EventAutoComplete";

const Home = () => {
    return (
        <div>
            <TourAutoComplete />
            <LocationAutoComplete />
            <EventAutoComplete />
        </div>
    )
}

export default Home;
