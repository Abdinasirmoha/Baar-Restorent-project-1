import Herosection from "../components/herosection"
import FivePartSection from "../components/FivePartSection"
import ServiceFlowSection from "../components/ServiceFlowSection"
import MenuShowcaseSection from "../components/MenuShowcaseSection"
import ReservationSection from "../components/ReservationSection"
import MenuSection from "../components/MenuSection"

function Home(){
    return(
        <>
        <Herosection />
         <MenuSection />
        <FivePartSection />
        <ServiceFlowSection />
        <MenuShowcaseSection />
        <ReservationSection />
        </>
    )
}
export default Home