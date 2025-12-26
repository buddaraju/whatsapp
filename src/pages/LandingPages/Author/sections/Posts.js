// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

// Dev Infotech components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Images
import post1 from "assets/images/bulk-sms.webp";
import post2 from "assets/images/business-us.png";
import post3 from "assets/images/unified-us.png";

function Places() {
  return (
    <MKBox
      sx={{
        background:
          "linear-gradient(180deg, #0f4c5c -100%, #1f6f8b 30%, #4ea8de 50%, #e0f2f7 100%)",

        py: 8,
        textAlign: "center",
        borderRadius: "0 0 24px 24px",
      }}
    >
      <Container>
        {/* Section Heading */}
        <Grid container justifyContent="center" mb={6} mt={-4}>
          <Grid item xs={12} lg={6} textAlign="center">
            <MKTypography variant="h3" sx={{ color: "#fff" }}>
              Check my latest blogposts
            </MKTypography>
          </Grid>
        </Grid>

        {/* Cards */}
        <Grid container spacing={3}>
          {/* Card 1 */}
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            style={{ transition: "all 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={post1}
                alt="Bulk WhatsApp SMS Gateway Services"
              />

              <CardContent>
                <MKTypography variant="h6" gutterBottom>
                  Bulk WhatsApp SMS Gateway Services
                </MKTypography>

                <MKTypography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  A high-throughput SMS API designed for transactional and promotional messaging.
                  Features include sender ID management, DLR reports, route selection, and
                  enterprise-grade reliability.
                </MKTypography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2 */}
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            style={{ transition: "all 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={post2}
                alt="WhatsApp Business API Integration"
              />

              <CardContent>
                <MKTypography variant="h6" gutterBottom>
                  WhatsApp Business API Integration
                </MKTypography>

                <MKTypography variant="body2" color="text.secondary" sx={{ fontSize: "14px" }}>
                  Integrate WhatsApp messaging directly into your application using REST APIs and
                  webhooks. Supports template messages, media attachments, delivery status
                  callbacks, and automated responses at scale.
                </MKTypography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 */}
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            style={{ transition: "all 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={post3}
                alt="Unified Messaging API Platform"
              />

              <CardContent>
                <MKTypography variant="h6" gutterBottom>
                  Unified Messaging API Platform
                </MKTypography>

                <MKTypography variant="body2" color="text.secondary" sx={{ fontSize: "14px" }}>
                  Access WhatsApp, SMS, and Email through a single API layer. Built for scalability
                  with secure authentication, real-time analytics, and easy integration with CRM and
                  backend systems.
                </MKTypography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;
