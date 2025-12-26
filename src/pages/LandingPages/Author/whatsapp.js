// Dev Infotech components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
// Dev Infotech examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
// @mui material components
import Icon from "@mui/material/Icon";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { useState } from "react";

import bgImage from "assets/images/bgsms.jpg";
import "./style.css";
import "../../Presentation/app.css";
import { useNavigate } from "react-router-dom";

function WhatsApp() {
  const navigate = useNavigate();

  // Button handlers
  const goToBasic = () => {
    navigate("/pages/landing-pages/prices");
  };
  // const goToStandard = () => (window.location.href = "/standard");
  // const goToPremium = () => (window.location.href = "/premium");

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!phone || !message) {
      alert("Please enter both phone number and message.");
      return;
    }
    console.log("Sending SMS message:");
    console.log("Phone:", phone);
    console.log("Message:", message);
    alert("Message sent (simulation). Connect SMS API to make it live.");
  };

  return (
    <>
      {/* Fixed Navbar */}
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
        <h1 style={{ fontSize: "3rem" }} className="header">
          WhatsApp API
        </h1>
      </MKBox>

      {/* Pricing Section */}
      <MKBox py={8} px={2} sx={{ backgroundColor: "#f7f9fc" }}>
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-5">
            <h2 style={{ fontWeight: "90%", fontSize: "2.4rem" }} className="header">
              WhatsApp API Pricing
            </h2>
            <p
              style={{ maxWidth: "90%", margin: "10px auto", color: "#555", textAlign: "justify" }}
              className="font"
            >
              Choose the plan that fits your business needs. All plans include secure WhatsApp
              messaging, API access, analytics dashboard, and 99.9% uptime guarantee. WhatsApp
              marketing is a cutting-edge method of advertising your goods and company via the
              WhatsApp messaging program. With over 90% of the world&apos;s population paying
              attention to their notifications and a massive open rate, this well-known messaging
              software has taken the world by storm. Furthermore, WhatsApp has become the go-to
              method for conducting business in several nations, such as India, which is expanding
              quickly. This type of marketing is preferred even by tiny retailers. As the top
              WhatsApp marketing service provider in Hyderabad, Dev Infotech welcomes you and your
              company. Our outstanding and skilled staff will make sure that your company achieves
              its long-term objectives.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* ---------------- BASIC PLAN ---------------- */}
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="annual-plan-card">
                <h3>Annual Plan</h3>
                <h2>
                  <Icon className="icon">currency_rupee</Icon> 1999 / yearly
                </h2>
                <p>⭐ Perfect for small businesses starting with automated WhatsApp messaging.</p>
                <ul>
                  <li>500 WhatsApp Messages</li>
                  <li>Basic API Access</li>
                  <li>Message Templates</li>
                  <li>Basic Support</li>
                </ul>
                <button onClick={goToBasic}>Choose Plan</button>
              </div>
            </div>
          </div>
        </div>
      </MKBox>

      {/* Whatsapp Dynamic Form */}
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
        <h3 style={{ marginBottom: "20px" }} className="header">
          Send WhatsApp message
        </h3>

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

export default WhatsApp;
