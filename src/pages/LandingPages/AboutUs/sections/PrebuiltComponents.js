// Dev Infotech components
import MKBox from "components/MKBox";
import "../../../Presentation/app.css";

function PrebuiltComponents() {
  const prebuiltComponents = [
    { label: "Component Type", value: "Chatbots, Buttons, Quick Replies, Templates" },
    { label: "Integration", value: "WhatsApp, Web, Mobile Apps" },
    { label: "Customization", value: "Fully customizable styles and workflows" },
    { label: "API Support", value: "REST APIs / Webhooks" },
    { label: "Documentation", value: "Comprehensive guides & examples" },
    { label: "Support Email", value: "components@yourcompany.com" },
    { label: "Availability", value: "24/7 Developer Support" },
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
        Prebuilt Components Details
      </MKBox>

      {/* Table Card */}
      <MKBox
        sx={{
          border: "1px solid #ddd",
          borderRadius: "0px 0px 8px 8px",
          overflow: "hidden",
        }}
      >
        {prebuiltComponents.map((item, index) => (
          <MKBox
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
              borderBottom: index !== prebuiltComponents.length - 1 ? "1px solid #ddd" : "none",
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

export default PrebuiltComponents;
