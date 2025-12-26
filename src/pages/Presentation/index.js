// export default Presentation;
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// Dev Infotech components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Dev Infotech examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Presentation page sections
import Testimonials from "pages/Presentation/sections/Testimonials";
import FullWidthMediaSlider from "pages/Presentation/FullWidthMediaSlider";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { useNavigate } from "react-router-dom";
import "./app.css";

function Presentation() {
  const navigate = useNavigate();
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "internal",
          route: "/pages/landing-pages/BookDemo",
          label: "BOOK A DEMO",
          color: "info",
        }}
      />

      {/* Slider Section */}
      <FullWidthMediaSlider />

      {/* WhatsApp Contact Section */}
      <MKBox
        pt={12}
        pb={12}
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <Container>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} lg={8} textAlign="center">
              <MKTypography variant="h4" fontWeight="bold" mb={2}>
                Contact Us via WhatsApp API
              </MKTypography>
              <MKTypography variant="body1" color="text" mb={3} className="font">
                Connect with our team directly on WhatsApp. Automate messages, get quick responses,
                and integrate your business communication seamlessly using our WhatsApp Business API
                services in Hyderabad.
              </MKTypography>
              <Button
                variant="contained"
                color="primary"
                sx={{ color: "#fff" }} // text color
                onClick={() => navigate("/pages/landing-pages/BookDemo")}
              >
                BOOK A DEMO
              </Button>
            </Grid>
          </Grid>
        </Container>
      </MKBox>

      {/* Testimonials & Card Section */}
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -6, // overlap a bit for nice design
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container sx={{ mt: 6 }}></Container>
        <Testimonials />
        <MKBox pt={18} pb={6}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5} ml="auto" sx={{ textAlign: { xs: "center", lg: "left" } }}>
                <MKTypography variant="h4" fontWeight="bold" mb={0.5} className="header">
                  Thank you for your support!
                </MKTypography>
                <MKTypography variant="body1" color="text" className="font">
                  We deliver the best web products
                </MKTypography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={5}
                my={{ xs: 5, lg: "auto" }}
                mr={{ xs: 0, lg: "auto" }}
                sx={{ textAlign: { xs: "center", lg: "right" } }}
              >
                <MKSocialButton
                  className="font"
                  component="a"
                  href="https://twitter.com/intent/tweet?text=Check%20Material%20Design%20System%20made%20by%20%40CreativeTim%20%23webdesign%20%23designsystem%20%23mui5&amp;url=https%3A%2F%2Fwww.ujrtechnologies.com/%2Fproduct%2Fmaterial-kit-react"
                  target="_blank"
                  color="twitter"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-twitter" />
                  &nbsp;Tweet
                </MKSocialButton>
                <MKSocialButton
                  className="font"
                  component="a"
                  href="https://www.facebook.com/sharer/sharer.php?u=https://www.ujrtechnologies.com/"
                  target="_blank"
                  color="facebook"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-facebook" />
                  &nbsp;Share
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  className="font"
                  href="https://www.pinterest.com/pin/create/button/?url=https://www.ujrtechnologies.com/"
                  target="_blank"
                  color="pinterest"
                >
                  <i className="fab fa-pinterest" />
                  &nbsp;Pin it
                </MKSocialButton>
              </Grid>
            </Grid>
          </Container>
        </MKBox>
      </Card>

      {/* Footer */}
      <MKBox
        pt={6}
        px={1}
        mt={6}
        sx={{
          background: "linear-gradient(135deg, #076585, #ffffff)",
        }}
      >
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
