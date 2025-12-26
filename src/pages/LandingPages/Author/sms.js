// Dev Infotech components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
// Dev Infotech examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
// @mui icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "assets/images/bgsms.jpg";
import "./style.css";

function Sms() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const goToPrices = () => navigate("/pages/landing-pages/prices?sms=true");
  const goToImages = () => navigate("/pages/landing-pages/prices?images=true");
  const goToLinks = () => navigate("/pages/landing-pages/prices?links=true");
  const goToAudios = () => navigate("/pages/landing-pages/prices?audios=true");

  const handleSend = () => {
    if (!phone || !message) {
      alert("Please enter both phone number and message.");
      return;
    }
    alert("Message sent (simulation). Connect SMS API to make it live.");
  };

  return (
    <>
      {/* Navbar */}
      <MKBox position="fixed" top={0} width="100%" zIndex={10}>
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

      {/* Hero Section */}
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
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          mt: "58px",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>WhatsApp SMS</h1>
      </MKBox>

      {/* Pricing Section */}
      <MKBox py={8} px={2}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontWeight: 700, fontSize: "2.4rem" }}>WhatsApp SMS Pricing Plans</h2>
            <p className="p-text">
              Deliver SMS notifications, alerts, and marketing messages instantly with our secure
              and scalable SMS gateway. Choose the plan that matches your messaging volume and
              business needs.
            </p>
            <p className="p-text">
              Here is the Bulk SMS Services content in a single, clean paragraph: Our Bulk SMS
              Services help businesses connect with customers instantly through fast, reliable, and
              affordable messaging. We offer both promotional and transactional SMS with high
              delivery rates, instant OTP support, sender ID registration, and real-time delivery
              reports. Whether you need to send offers, alerts, reminders, updates, or automated
              notifications, our SMS gateway ensures smooth and secure communication. Our platform
              is ideal for startups, institutes, retailers, real estate, hospitals, e-commerce
              stores, and service-based businesses. Boost your customer engagement and grow your
              brand with our trusted Bulk SMS solutions.
            </p>
            <button className="btn btn-primary mt-3" onClick={goToPrices}>
              Click Here For Price
            </button>
          </div>

          {/* Cards Section */}
          <div className="card-container my-5">
            <div className="row g-4">
              {/* Images Card */}
              <div className="col-md-4 d-flex">
                <div
                  className="card text-center p-4 shadow-sm flex-fill d-flex flex-column"
                  style={{ transition: "all 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
                >
                  <h4 className="Imagesheader mb-3">Images</h4>
                  <div className="flex-grow-1 mt-3" style={{ textAlign: "start" }}>
                    <p style={{ display: "flex" }}>
                      <CheckCircleIcon style={{ color: "green", marginTop: "6px" }} />
                      <span style={{ marginLeft: "8px", textAlign: "start" }}>
                        Generate an image with caption to send on WhatsApp?
                      </span>
                    </p>
                    <p style={{ display: "flex" }}>
                      <CheckCircleIcon style={{ color: "green", marginTop: "6px" }} />
                      <span style={{ marginLeft: "8px", textAlign: "start" }}>
                        Extract context/description from an image (e.g., explain what’s in a photo
                        you want to send)?
                      </span>
                    </p>
                    <p style={{ display: "flex" }}>
                      <CheckCircleIcon style={{ color: "green", marginTop: "6px" }} />
                      <span style={{ marginLeft: "8px", textAlign: "start" }}>
                        Resize/format an image for WhatsApp?
                      </span>
                    </p>
                  </div>
                  <button className="btn btn-primary mt-3" onClick={goToImages}>
                    Click Here For Price
                  </button>
                </div>
              </div>

              {/* Links Card */}
              <div className="col-md-4 d-flex">
                <div
                  className="card text-center p-4 shadow-sm flex-fill d-flex flex-column"
                  style={{ transition: "all 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
                >
                  <h4 className="Imagesheader mb-3">Links</h4>
                  <div className="flex-grow-1 mt-3" style={{ textAlign: "start" }}>
                    <p style={{ display: "flex" }}>
                      <CheckCircleIcon style={{ color: "green", marginTop: "6px" }} />
                      <span style={{ marginLeft: "8px", textAlign: "start" }}>
                        Do you need simple shortening of analytics/branding/customization?
                      </span>
                    </p>
                    <p style={{ display: "flex" }}>
                      <CheckCircleIcon style={{ color: "green", marginTop: "6px" }} />
                      <span style={{ marginLeft: "8px", textAlign: "start" }}>
                        If you run a business/brand, custom domain links, branded links, analytics,
                        dashboards matter.
                      </span>
                    </p>
                    <p style={{ display: "flex" }}>
                      <CheckCircleIcon style={{ color: "green", marginTop: "6px" }} />
                      <span style={{ marginLeft: "8px", textAlign: "start" }}>
                        For many links or campaigns: link-management services
                      </span>
                    </p>
                  </div>
                  <button className="btn btn-primary mt-3" onClick={goToLinks}>
                    Click Here For Price
                  </button>
                </div>
              </div>

              {/* Audios Card */}
              <div className="col-md-4 d-flex">
                <div
                  className="card text-center p-4 shadow-sm flex-fill d-flex flex-column"
                  style={{ transition: "all 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
                >
                  <h4 className="Imagesheader mb-3">Audios</h4>
                  <div className="flex-grow-1 mt-3" style={{ textAlign: "start" }}>
                    <p style={{ display: "flex" }}>
                      <CheckCircleIcon style={{ color: "green", marginTop: "6px" }} />
                      <span style={{ marginLeft: "8px", textAlign: "start" }}>
                        Convert text into an audio message that you can send on WhatsApp
                      </span>
                    </p>
                    <p style={{ display: "flex" }}>
                      <CheckCircleIcon style={{ color: "green", marginTop: "6px" }} />
                      <span style={{ marginLeft: "8px", textAlign: "start" }}>
                        Transcribe an audio message you received on WhatsApp
                      </span>
                    </p>
                    <p style={{ display: "flex" }}>
                      <CheckCircleIcon style={{ color: "green", marginTop: "6px" }} />
                      <span style={{ marginLeft: "8px", textAlign: "start" }}>
                        Generate a voice note script for WhatsApp
                      </span>
                    </p>
                  </div>
                  <button className="btn btn-primary mt-3" onClick={goToAudios}>
                    Click Here For Price
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SMS Form */}
          <MKBox
            maxWidth="600px"
            mx="auto"
            mb={6}
            px={4}
            py={4}
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Send SMS Message</h3>
            <MKInput
              label="Phone Number"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />
            <MKInput
              label="Message"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />
            <MKButton variant="contained" color="success" fullWidth onClick={handleSend}>
              Send Message
            </MKButton>
          </MKBox>
        </div>
      </MKBox>

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

export default Sms;
