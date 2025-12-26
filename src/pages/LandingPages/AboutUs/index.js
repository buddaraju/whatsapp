// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

// Dev Infotech components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Dev Infotech examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// About Us page sections
import Information from "pages/LandingPages/AboutUs/sections/Information";
import Content from "pages/LandingPages/AboutUs/sections/content";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/bgsms.jpg";

function AboutUs() {
  return (
    <>
      {/* NAVBAR */}
      <MKBox position="fixed" top="0" width="100%" zIndex={10}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/pages/landing-pages/BookDemo",
            label: "BOOK A DEMO",
            color: "info",
            className: "font",
          }}
        />
      </MKBox>

      {/* HERO SECTION */}
      <MKBox
        minHeight="40vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          mt: "64px", // fixed navbar offset
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto" }}
          >
            <MKTypography variant="h1" color="white" className="header">
              Work with an amazing design
            </MKTypography>

            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              We&apos;re constantly trying to express ourselves and actualize our dreams.
            </MKTypography>

            <MKButton
              color="default"
              to="/pages/landing-pages/BookDemo"
              component={Link}
              sx={{ color: ({ palette: { dark } }) => dark.main }}
            >
              whatsapp growth consultation
            </MKButton>
          </Grid>
        </Container>
      </MKBox>

      {/* 🔥 MAIN CONTENT BACKGROUND (WHITE REMOVE HERE) */}
      <MKBox
        sx={{
          background: "linear-gradient(180deg, #F2F6FB 0%, #E6EDF7 100%)",

          py: 10,
        }}
      >
        <Container>
          <Card
            sx={{
              background: "transparent", // ⭐ VERY IMPORTANT
              boxShadow: "none", // ⭐ VERY IMPORTANT
            }}
          >
            <Content />
            <Information />
            <Newsletter />
          </Card>
        </Container>
      </MKBox>

      {/* FOOTER */}
      <MKBox
        pt={6}
        px={1}
        sx={{
          background: "linear-gradient(135deg, #076585, #ffffff)",
        }}
      >
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default AboutUs;
