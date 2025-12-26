import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../Presentation/app.css";

function Contact() {
  const content = {
    companyName: "Dev Infotech",
    description: [
      "We empower businesses to connect, communicate, and grow through seamless WhatsApp messaging solutions.",
      "As a leading WhatsApp API provider, we specialize in enabling enterprises to engage their customers efficiently, securely, and at scale.",
      "Our mission is simple: to make business communication smarter, faster, and more personal.",
      "By integrating our API, companies can automate notifications, manage customer support, and run interactive campaigns — all through the world’s most popular messaging platform.",
      "We pride ourselves on delivering reliable, compliant, and cutting-edge solutions tailored to your business needs.",
    ],
    features: [
      {
        title: "Robust & Scalable",
        detail: "Supports businesses of all sizes, from startups to enterprises.",
      },
      {
        title: "Secure & Compliant",
        detail: "Full adherence to WhatsApp policies and industry standards.",
      },
      { title: "24/7 Support", detail: "Our expert team is always ready to assist you." },
      {
        title: "Easy Integration",
        detail: "Connect seamlessly with your existing systems and workflows.",
      },
    ],
    conclusion:
      "Join thousands of businesses leveraging Your Company Name to transform customer communication into a growth engine.",
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">About {content.companyName}</h1>

      {/* 3 Column Layout */}
      <div className="row g-4">
        {/* Description Column */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5
                className="mb-0 header"
                style={{
                  background: "transparent",
                  color: "#fff",
                  backgroundColor: "#0d6efd",
                  paddingLeft: "4px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  borderRadius: "8px 8px 0 0",
                  boxShadow: "none",
                }}
              >
                Description
              </h5>
            </div>
            <div className="list-group list-group-flush">
              {content.description.map((item, index) => (
                <div key={index} className="list-group-item font">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Column */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5
                className="mb-0 header"
                style={{
                  background: "transparent",
                  color: "#fff",
                  backgroundColor: "#0d6efd",
                  paddingLeft: "4px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  borderRadius: "8px 8px 0 0",
                  boxShadow: "none",
                }}
              >
                Why Choose Us?
              </h5>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Feature</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {content.features.map((feature, index) => (
                    <tr key={index}>
                      <td className="fw-bold font">{feature.title}</td>
                      <td className="font">{feature.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Conclusion Column */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5
                className="mb-0 header"
                style={{
                  background: "transparent",
                  color: "#fff",
                  backgroundColor: "#0d6efd",
                  paddingLeft: "4px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  borderRadius: "8px 8px 0 0",
                  boxShadow: "none",
                }}
              >
                Conclusion
              </h5>
            </div>
            <div className="card-body">
              <p className="fw-bold font">{content.conclusion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
