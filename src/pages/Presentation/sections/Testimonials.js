import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";

import appleLogo from "assets/images/logos/gray-logos/logo-apple.svg";
import facebookLogo from "assets/images/logos/gray-logos/logo-facebook.svg";
import nasaLogo from "assets/images/logos/gray-logos/logo-nasa.svg";
import vodafoneLogo from "assets/images/logos/gray-logos/logo-vodafone.svg";
import digitalOceanLogo from "assets/images/logos/gray-logos/logo-digitalocean.svg";
import "../app.css";

const logos = [appleLogo, facebookLogo, nasaLogo, vodafoneLogo, digitalOceanLogo];

function Information() {
  const reviews = [
    { name: "Nick Willever", date: "1 day ago", review: "Excellent product!", rating: 5 },
    {
      name: "Shailesh Kushwaha",
      date: "1 week ago",
      review: "Very affordable and helpful.",
      rating: 5,
    },
    { name: "Samuel Kamuli", date: "3 weeks ago", review: "Great components and docs.", rating: 5 },
    { name: "Jessica Lee", date: "2 months ago", review: "Awesome support.", rating: 5 },
    { name: "David Kim", date: "1 month ago", review: "Highly recommend.", rating: 5 },
    { name: "Emma Wilson", date: "3 weeks ago", review: "Fantastic UI.", rating: 5 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3 >= reviews.length ? 0 : prev + 3));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(reviews.length - 3, 0) : prev - 3));
  };

  const currentReviews = [
    reviews[currentIndex % reviews.length],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <MKBox
      component="section"
      // sx={{
      //   background: "linear-gradient(90deg, #1a2980, #26d0ce)",
      // }}
    >
      <MKTypography variant="h1" textAlign="center" mb={4} className="header">
        <span className="highlight">Dev Infotech</span>
      </MKTypography>
      <MKBox
        className="font"
        sx={{
          maxWidth: "90%",
          mx: "auto",
          textAlign: "center",
          mb: 4,
        }}
      >
        <MKTypography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#000", // Dev Infotech blue
            mb: 2,
            letterSpacing: "0.1px",
          }}
        >
          Dev Infotech WhatsApp API & SMS Services
        </MKTypography>

        <MKBox className="font" sx={{ maxWidth: "auto", mx: "auto", mt: 4, mb: 6 }}>
          <MKTypography variant="body1" className="text">
            Dev Infotech’s WhatsApp Messaging & API Solution is a technically robust yet easy-to-use
            communication platform built on the official WhatsApp Business API. Designed for
            enterprises, organizations, and political campaigns, it enables reliable, secure, and
            scalable messaging across multiple channels. At its core, the platform acts as a bridge
            between WhatsApp and internal systems, allowing applications such as CRM, ERP, billing,
            support, or custom software to send and receive messages programmatically through secure
            API endpoints. This ensures automated communication, consistent messaging, and efficient
            interaction management for businesses and political campaigns alike.
          </MKTypography>

          <MKTypography variant="body1" className="text">
            From a technical perspective, the API is event-driven and supports automation. Messages
            can be triggered automatically based on system actions such as order placements, payment
            confirmations, login requests, appointment scheduling, delivery updates, or
            campaign-specific actions like rally announcements, voter outreach, donation requests,
            and volunteer coordination. All messages are sent using pre-approved WhatsApp templates
            to maintain compliance and professional delivery.
          </MKTypography>

          <MKTypography variant="body1" className="text">
            The platform supports both outbound messaging —including notifications, alerts, OTPs,
            reminders, order updates, campaign announcements, and political updates—and inbound
            messaging, enabling recipients to reply and interact in real time. Incoming messages are
            captured via webhooks, which instantly notify the connected system and allow automated
            responses, intelligent chat routing, or escalation to live agents or campaign staff.
          </MKTypography>

          {/* Repeat MKTypography for remaining paragraphs */}

          <MKTypography variant="body1" className="text">
            Dev Infotech’s solution is built for high performance and scalability, capable of
            handling high-volume messaging with queue management, retry mechanisms, and real-time
            delivery tracking. Detailed message status updates (sent, delivered, read) provide
            actionable insights for monitoring engagement and optimizing communication strategies.
            The API also supports rich media messaging, including images, videos, documents, PDFs,
            invoices, manifestos, and promotional content, making communication more interactive and
            impactful.
          </MKTypography>
          <MKTypography variant="body1" className="text">
            For political campaigns, Dev Infotech’s WhatsApp API and SMS services offer specialized
            capabilities such as targeted voter outreach, event notifications, fundraising messages,
            volunteer coordination, and region-specific announcements. Campaign teams can integrate
            the API with voter databases or CRM tools to segment audiences, schedule automated
            messages, track responses, and analyze engagement metrics, all while ensuring data
            privacy, security, and regulatory compliance.
          </MKTypography>
          <MKTypography variant="body1" className="text">
            Additionally, Dev Infotech provides WhatsApp SMS services for organizations that require
            text-based communication alongside WhatsApp messaging. This ensures coverage for users
            who may not have WhatsApp or for delivering critical alerts via SMS, creating a
            multi-channel communication strategy that maximizes reach and reliability.
          </MKTypography>
          <MKTypography variant="body1" className="text">
            Overall, Dev Infotech’s WhatsApp Messaging & API Solution combines technical
            reliability, scalability, and ease of use. By automating workflows, enabling two-way
            engagement, supporting rich multimedia, and integrating with existing systems, it allows
            businesses and political campaigns to deliver timely, personalized, and impactful
            communication—improving engagement, streamlining operations, and driving measurable
            results.
          </MKTypography>
        </MKBox>
      </MKBox>

      <Container>
        <MKTypography variant="h2" textAlign="center" mb={4} mt={10} className="header">
          Customer Reviews
        </MKTypography>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 4, flexWrap: "nowrap" }} // ensure no wrapping
          spacing={2}
        >
          {/* Previous Arrow */}
          <Grid item xs="auto" sx={{ fontSize: 40, cursor: "pointer" }} onClick={handlePrevious}>
            &#8592;
          </Grid>

          {/* Review Cards */}
          {currentReviews.map((review, index) => (
            <Grid
              item
              xs={12}
              sm={4} // Always 3 cards in row
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <MKBox sx={{ flexGrow: 1 }}>
                <DefaultReviewCard
                  color="info"
                  name={review.name}
                  date={review.date}
                  review={review.review}
                  rating={review.rating}
                  className="font"
                />
              </MKBox>
            </Grid>
          ))}

          {/* Next Arrow */}
          <Grid item xs="auto" sx={{ fontSize: 40, cursor: "pointer" }} onClick={handleNext}>
            &#8594;
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />
        {/* Logos */}
        <Grid
          container
          item
          py={6}
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKTypography variant="h2" className="header">
            Client
          </MKTypography>
        </Grid>
        <MKBox
          sx={{
            overflow: "hidden", // Hide scrollbars
            width: "100%",
            position: "relative",
          }}
        >
          <MKBox
            sx={{
              display: "flex",
              width: "max-content",
              animation: "scroll 20s linear infinite", // Animation
            }}
          >
            {logos.concat(logos).map(
              (
                logo,
                idx // duplicate logos for seamless loop
              ) => (
                <MKBox
                  component="img"
                  src={logo}
                  alt={`Logo ${idx}`}
                  sx={{ width: 150, opacity: 0.6, marginRight: 3 }}
                  key={idx}
                />
              )
            )}
          </MKBox>

          {/* Keyframes for smooth scroll */}
          <style>
            {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } /* scroll by half container width (because we duplicated logos) */
          }

        `}
          </style>
        </MKBox>
      </Container>
    </MKBox>
  );
}

export default Information;
