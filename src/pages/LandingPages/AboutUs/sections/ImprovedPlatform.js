// Dev Infotech components
import MKBox from "components/MKBox";
import "../../../Presentation/app.css";

function ImprovedPlatform() {
  const platformInfo = [
    { label: "Platform Features", value: "Enhanced Dashboard, Analytics, Multi-channel Support" },
    { label: "Integration", value: "WhatsApp, Web, Mobile Apps, CRM & ERP Systems" },
    { label: "Security", value: "End-to-end encryption, Role-based access control" },
    { label: "API Support", value: "REST APIs / Webhooks / SDKs" },
    { label: "Documentation", value: "Full developer guides & examples" },
    { label: "Support Email", value: "platform@yourcompany.com" },
    { label: "Support Phone", value: "+1 234 567 8888" },
    { label: "Availability", value: "24/7 Enterprise Support" },
  ];

  return (
    <MKBox className="mt-5">
      {/* Table Header */}
      <MKBox
        className="header"
        sx={{
          fontWeight: "bold",
          // fontSize: "1.5rem",
          // mb: 1,
          // textAlign: "center",
          color: "#fff",
          backgroundColor: "#0d6efd",
          paddingLeft: "4px",
          py: 2,
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        Improved Platform
      </MKBox>

      {/* Table Card */}
      <MKBox
        sx={{
          border: "1px solid #ddd",
          borderRadius: "0px 0px 8px 8px",
          overflow: "hidden",
        }}
      >
        {platformInfo.map((item, index) => (
          <MKBox
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
              borderBottom: index !== platformInfo.length - 1 ? "1px solid #ddd" : "none",
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff", // alternating row colors
              "&:hover": { backgroundColor: "#e9f5ff" }, // hover effect
            }}
          >
            {/* Label */}
            <MKBox
              className="font"
              sx={{
                padding: "12px",
                fontWeight: "bold",
                borderRight: { md: "1px solid #ddd" },
              }}
            >
              {item.label}
            </MKBox>

            {/* Value */}
            <MKBox sx={{ padding: "12px" }} className="font">
              {item.value}
            </MKBox>
          </MKBox>
        ))}
      </MKBox>
    </MKBox>
  );
}

export default ImprovedPlatform;
