// Dev Infotech components
import MKBox from "components/MKBox";
import "../../../Presentation/app.css";
function FullyIntegratedContact() {
  const integratedInfo = [
    { label: "Integration Type", value: "WhatsApp Business API (Cloud & On-Premise)" },
    { label: "Use Cases", value: "Notifications, Chatbots, Support, OTP, Alerts" },
    { label: "Supported Platforms", value: "CRM, ERP, Websites, Mobile Apps" },
    { label: "API Format", value: "REST APIs / Webhooks" },
    { label: "Support Email", value: "integrations@yourcompany.com" },
    { label: "Support Phone", value: "+1 234 567 9999" },
    { label: "Integration Time", value: "1–3 Days" },
  ];

  return (
    <MKBox mt={-1}>
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
        Fully Integrated
      </MKBox>

      <MKBox
        sx={{
          border: "1px solid #ddd",
          borderRadius: "0px 0px 8px 8px",
          overflow: "hidden",
        }}
      >
        {integratedInfo.map((item, index) => (
          <MKBox
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
              borderBottom: index !== integratedInfo.length - 1 ? "1px solid #ddd" : "none",
            }}
          >
            <MKBox
              className="font"
              sx={{
                padding: "12px",
                fontWeight: "bold",
                background: "#f7f7f7",
                borderRight: { md: "1px solid #ddd" },
              }}
            >
              {item.label}
            </MKBox>

            <MKBox sx={{ padding: "12px" }} className="font">
              {item.value}
            </MKBox>
          </MKBox>
        ))}
      </MKBox>
    </MKBox>
  );
}

export default FullyIntegratedContact;
