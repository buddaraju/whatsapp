// @mui material components
// import Card from "@mui/material/Card";

// Dev Infotech components
import MKBox from "components/MKBox";

// Dev Infotech examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import { Link } from "react-router-dom";

// Author page sections
// import Profile from "pages/LandingPages/Author/sections/Profile";
import Posts from "pages/LandingPages/Author/sections/Posts";
// import Footer from "pages/LandingPages/Author/sections/Footer";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/city-profile.jpg";

function Blog() {
  return (
    <>
      <MKBox position="fixed" top="0" width="100%">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/pages/landing-pages/BookDemo",
            label: "BOOK A DEMO",
            color: "info",
          }}
        />
      </MKBox>
      <MKBox bgColor="white">
        <MKBox
          minHeight="25rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        />
        {/* <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        > */}
        <Posts />
        {/* </Card> */}
        <MKBox
          pt={6}
          px={1}
          mt={-1}
          sx={{
            background: "linear-gradient(135deg, #076585, #ffffff)",
          }}
        >
          <DefaultFooter content={footerRoutes} />
        </MKBox>
      </MKBox>
    </>
  );
}

export default Blog;
