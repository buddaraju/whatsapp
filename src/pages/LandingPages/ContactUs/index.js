// @mui material components
import Grid from "@mui/material/Grid";

// Dev Infotech components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Dev Infotech examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import backgroundImage from "assets/images/images-us.jpg";

function ContactUs() {
  return (
    <MKBox
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        marginTop: "-150px",
      }}
    >
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

        {/* Top Info Cards Section */}
        <MKBox mt={12} mb={6}>
          <Grid container spacing={3} justifyContent="center" alignItems="stretch"></Grid>
        </MKBox>

        <Grid container spacing={3} alignItems="center">
          {/* Contact Form */}
          <Grid item xs={12} lg={6}>
            <MKBox
              bgColor="#fff"
              borderRadius="xl"
              shadow="lg"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              mb={{ xs: 15, sm: 10, md: 17 }}
              mt={100}
              mx={3}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              sx={{
                transition: "transform 0.3s ease", // smooth movement
              }}
            >
              {/* Header */}
              <MKBox
                variant="gradient"
                bgColor="info"
                coloredShadow="info"
                borderRadius="lg"
                p={2}
                mx={2}
                mt={-3}
              >
                <MKTypography variant="h3" color="white">
                  Contact us
                </MKTypography>
              </MKBox>
              <MKBox p={3}>
                <MKTypography variant="body2" color="text" mb={3}>
                  For further questions, including partnership opportunities, please email
                  info@devinfotech.in or contact using our contact form.
                </MKTypography>

                <MKBox width="100%" component="form" method="post" autoComplete="off">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <MKInput
                        variant="standard"
                        label="Full Name"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <MKInput
                        type="email"
                        variant="standard"
                        label="Email"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <MKInput
                        type="Phone Number"
                        variant="standard"
                        label="Phone Number"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MKInput
                        variant="standard"
                        label="What can we help you?"
                        placeholder="Describe your problem in at least 250 characters"
                        InputLabelProps={{ shrink: true }}
                        multiline
                        fullWidth
                        rows={6}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                    <MKButton type="submit" variant="gradient" color="info">
                      Send Message
                    </MKButton>
                  </Grid>
                </MKBox>
              </MKBox>
            </MKBox>
          </Grid>
          {/* Google Map Section */}
          <Grid item xs={12} lg={6}>
            <MKBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="calc(100% - 2rem)"
              height="calc(100vh - 2rem)"
              borderRadius="lg"
              ml={2}
              pt={50}
            >
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1902.6640800251027!2d78.3924966578895!3d17.491841555188984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb918d306665ad%3A0x74690b7847195a59!2s602%2C%20Manjeera%20Majestic%20Commercial!5e0!3m2!1sen!2sin!4v1622483828075!5m2!1sen!2sin"
                width="100%"
                height="100"
                style={{ border: 0, borderRadius: "12px", transform: "translateY(50px)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </MKBox>
          </Grid>
        </Grid>
        <MKBox mt={12} mb={6}>
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {/* Location Card */}
            <Grid item xs={12} sm={3} display="flex">
              <MKBox
                p={2}
                borderRadius="lg"
                shadow="md"
                textAlign="center"
                sx={{
                  backgroundColor: "#fff",
                  mt: "120px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  flex: 1, // makes the box fill the Grid height
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",

                  "&:hover": {
                    backgroundColor: "#2563EB",
                    transform: "translateY(-8px)",
                    boxShadow: "0 15px 30px rgba(37,99,235,0.4)",
                  },
                  "&:hover h6, &:hover p": {
                    color: "#FFFFFF",
                  },
                }}
              >
                <MKTypography variant="h6" mb={1}>
                  📍 Location
                </MKTypography>
                <MKTypography variant="body2" fontSize="0.875rem">
                  #820, 8th floor, Manjeera Majestic Commercial, KPHB, Hyderabad - 500072.
                </MKTypography>
              </MKBox>
            </Grid>

            {/* Phone Card */}
            <Grid item xs={12} sm={3} display="flex">
              <MKBox
                p={2}
                borderRadius="lg"
                shadow="md"
                textAlign="center"
                sx={{
                  backgroundColor: "#fff",
                  mt: "120px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",

                  "&:hover": {
                    backgroundColor: "#2563EB",
                    transform: "translateY(-8px)",
                    boxShadow: "0 15px 30px rgba(37,99,235,0.4)",
                  },
                  "&:hover h6, &:hover p": {
                    color: "#FFFFFF",
                  },
                }}
              >
                <MKTypography variant="h6" mb={1}>
                  📞 Phone
                </MKTypography>
                <MKTypography variant="body2" fontSize="0.875rem">
                  +91 707 572 8275
                </MKTypography>
              </MKBox>
            </Grid>

            {/* Email Card */}
            <Grid item xs={12} sm={3} display="flex">
              <MKBox
                p={2}
                borderRadius="lg"
                shadow="md"
                textAlign="center"
                sx={{
                  backgroundColor: "#fff",
                  mt: "120px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",

                  "&:hover": {
                    backgroundColor: "#2563EB",
                    transform: "translateY(-8px)",
                    boxShadow: "0 15px 30px rgba(37,99,235,0.4)",
                  },
                  "&:hover h6, &:hover p": {
                    color: "#FFFFFF",
                  },
                }}
              >
                <MKTypography variant="h6" mb={1}>
                  ✉️ Email
                </MKTypography>
                <MKTypography variant="body2" fontSize="0.875rem">
                  info@devinfotech.in
                </MKTypography>
              </MKBox>
            </Grid>
          </Grid>
        </MKBox>
        <MKBox
          sx={{
            background: "linear-gradient(135deg, #076585, #ffffff)",
            height: "350px",
            width: "100%",
          }}
        >
          <DefaultFooter content={footerRoutes} />
        </MKBox>
      </>
    </MKBox>
  );
}

export default ContactUs;
