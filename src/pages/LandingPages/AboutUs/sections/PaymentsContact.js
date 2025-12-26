// Dev Infotech components
import MKBox from "components/MKBox";
import "../../../Presentation/app.css";
// Payments Contact Table Using DIV
function PaymentsContact() {
  const payment = [
    { label: "Payment Method", value: "UPI, Bank Transfer, Credit/Debit Card" },
    { label: "Support Email", value: "payments@yourcompany.com" },
    { label: "Support Phone", value: "+1 234 567 8901" },
    { label: "Availability", value: "24/7 Support" },
    { label: "Billing Cycle", value: "Monthly / Yearly" },
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
        Payments
      </MKBox>

      <MKBox
        sx={{
          border: "1px solid #ddd",
          borderRadius: "0px 0px 8px 8px",
          overflow: "hidden",
        }}
      >
        {payment.map((item, index) => (
          <MKBox
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
              borderBottom: index !== payment.length - 1 ? "1px solid #ddd" : "none",
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

export default PaymentsContact;
