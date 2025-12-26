// @mui material components
import Container from "@mui/material/Container";

// Dev Infotech components
import MKBox from "components/MKBox";

// Dev Infotech examples
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import FullyIntegratedContact from "pages/LandingPages/AboutUs/sections/FullyIntegratedContact";
import PaymentsContact from "pages/LandingPages/AboutUs/sections/PaymentsContact";
import PrebuiltComponents from "pages/LandingPages/AboutUs/sections/PrebuiltComponents";
import ImprovedPlatform from "pages/LandingPages/AboutUs/sections/ImprovedPlatform";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <div className="row">
          <div className="col-12 col-lg-6 mb-4">
            <FullyIntegratedContact />
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <PaymentsContact />
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <PrebuiltComponents />
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <ImprovedPlatform />
          </div>
        </div>
      </Container>
    </MKBox>
  );
}

export default Information;
