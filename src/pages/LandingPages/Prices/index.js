import "./pricestyles.css";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import "bootstrap/dist/css/bootstrap.min.css";

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tooltip } from "bootstrap";
import PropTypes from "prop-types";

/* =========================
   PRICING TABLE COMPONENT
   ========================= */
function PricingTable({ title, data, creditLabel }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDataInfo, setSelectedDataInfo] = useState(null);
  const navigate = useNavigate();

  const calculateGST = (amount) => amount * 0.18;
  const format = (num) => `Rs. ${num.toLocaleString()}`;

  const handleCheckboxChange = (index) => {
    setSelectedRow(index);
  };

  const handleButtonClick = () => {
    if (selectedRow !== null) {
      const selectedData = data[selectedRow];
      const gst = calculateGST(selectedData.price);
      const total = selectedData.price + gst;

      setSelectedDataInfo({
        credits: selectedData.credits,
        cost: selectedData.cost,
        price: format(selectedData.price),
        gst: format(gst),
        total: format(total),
      });
    } else {
      setSelectedDataInfo(null);
    }
    setShowModal(true);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/pages/landing-pages/about-us", {
      state: { plan: selectedDataInfo },
    });
  };

  /* Enable Bootstrap tooltips */
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => new Tooltip(el));
  }, []);

  return (
    <div
      className="p-4 bg-white shadow-lg rounded text-center d-flex flex-column mb-4"
      style={{ borderTop: "5px solid #0d6efd" }}
    >
      <h3 className="fw-bold mb-3">{title}</h3>

      {/* TABLE CONTAINER */}
      <div className="p-3   flex-column">
        <div className="table-responsive flex-grow-1">
          <table className="table table-bordered table-striped table-hover text-center align-middle mb-0">
            <thead>
              <tr>
                <th className="font">Select</th>
                <th className="font">{creditLabel} Credits</th>
                <th className="font">Cost</th>
                <th className="font">Price</th>
                <th className="font">GST</th>
                <th className="font">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                const gst = calculateGST(item.price);
                const total = item.price + gst;

                return (
                  <tr key={i} className={selectedRow === i ? "selected-row" : ""}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRow === i}
                        onChange={() => handleCheckboxChange(i)}
                        data-bs-toggle="tooltip"
                        title="Click to select this plan"
                      />
                    </td>
                    <td className="font">{item.credits}</td>
                    <td className="font">{item.cost}</td>
                    <td className="font">{format(item.price)}</td>
                    <td className="font">{format(gst)}</td>
                    <td className="font">{format(total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* BUTTON */}
      <button className="btn btn-primary mt-3" onClick={handleButtonClick}>
        Choose Plan
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal-inside-box d-flex justify-content-center align-items-center">
          <div
            className="modal-content p-4 shadow-lg rounded"
            style={{ width: "400px", border: "2px solid #0d6efd" }}
          >
            <h5 className="fw-bold mb-3 text-center text-primary">Plan Information</h5>

            {selectedDataInfo ? (
              <div className="d-flex flex-column gap-2">
                {[
                  ["Credits", selectedDataInfo.credits, "info"],
                  ["Cost per unit", selectedDataInfo.cost, "warning"],
                  ["Price", selectedDataInfo.price, "success"],
                  ["GST (18%)", selectedDataInfo.gst, "secondary"],
                  ["Total", selectedDataInfo.total, "primary"],
                ].map(([label, value, color], i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center p-2 border rounded bg-light"
                  >
                    <span className="fw-bold">{label}:</span>
                    <span className={`badge bg-${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-danger text-center">⚠️ Please select a plan first!</p>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              {selectedDataInfo && (
                <button className="btn btn-primary" onClick={handleContinue}>
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   PROPTYPES
   ========================= */
PricingTable.propTypes = {
  title: PropTypes.string.isRequired,
  creditLabel: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      credits: PropTypes.string.isRequired,
      cost: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

/* =========================
   MAIN PRICES PAGE
   ========================= */
export default function Prices() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const showSMSOnly = params.get("sms") === "true";
  const showImagesOnly = params.get("images") === "true";
  const showLinksOnly = params.get("links") === "true";
  const showAudioOnly = params.get("audios") === "true";

  const smsData = [
    { credits: "10,000 SMS", cost: "25 paisa", price: 2500 },
    { credits: "25,000 SMS", cost: "24 paisa", price: 6000 },
    { credits: "50,000 SMS", cost: "22 paisa", price: 11000 },
    { credits: "1 Lakh SMS", cost: "20 paisa", price: 20000 },
    { credits: "2 Lakh SMS", cost: "20 paisa", price: 40000 },
    { credits: "3 Lakh SMS", cost: "19 paisa", price: 57000 },
    { credits: "5 Lakh SMS", cost: "18 paisa", price: 90000 },
  ];

  const imageData = [
    { credits: "10,000 Images", cost: "30 paisa", price: 3000 },
    { credits: "25,000 Images", cost: "28 paisa", price: 7000 },
    { credits: "50,000 Images", cost: "27 paisa", price: 13500 },
    { credits: "1 Lakh Images", cost: "26 paisa", price: 26000 },
    { credits: "2 Lakh Images", cost: "25 paisa", price: 50000 },
    { credits: "3 Lakh Images", cost: "24 paisa", price: 72000 },
    { credits: "5 Lakh Images", cost: "22 paisa", price: 110000 },
  ];

  const linksData = [
    { credits: "10,000 Links", cost: "40 paisa", price: 4000 },
    { credits: "25,000 Links", cost: "37 paisa", price: 9250 },
    { credits: "50,000 Links", cost: "35 paisa", price: 17500 },
    { credits: "1 Lakh Links", cost: "32 paisa", price: 32000 },
    { credits: "2 Lakh Links", cost: "30 paisa", price: 60000 },
    { credits: "3 Lakh Links", cost: "29 paisa", price: 87000 },
    { credits: "5 Lakh Links", cost: "27 paisa", price: 135000 },
  ];

  const audioData = [
    { credits: "10,000 Audios", cost: "48 paisa", price: 4800 },
    { credits: "25,000 Audios", cost: "45 paisa", price: 11250 },
    { credits: "50,000 Audios", cost: "43 paisa", price: 21500 },
    { credits: "1 Lakh Audios", cost: "42 paisa", price: 42000 },
    { credits: "2 Lakh Audios", cost: "41 paisa", price: 82000 },
    { credits: "3 Lakh Audios", cost: "40 paisa", price: 120000 },
    { credits: "5 Lakh Audios", cost: "38 paisa", price: 190000 },
  ];

  return (
    <>
      <MKBox position="fixed" top="0" width="100%" zIndex={10}>
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

      <div className="container" style={{ paddingTop: "100px" }}>
        {!showSMSOnly && !showImagesOnly && !showLinksOnly && !showAudioOnly ? (
          <>
            <div className="row mb-4">
              <div className="col-lg-6 col-md-12">
                <PricingTable title="Whatsapp SMS Pricing Table" data={smsData} creditLabel="SMS" />
              </div>
              <div className="col-lg-6 col-md-12">
                <PricingTable title="Image Pricing Table" data={imageData} creditLabel="Image" />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-6 col-md-12">
                <PricingTable title="Links Pricing Table" data={linksData} creditLabel="Links" />
              </div>
              <div className="col-lg-6 col-md-12">
                <PricingTable title="Audio Pricing Table" data={audioData} creditLabel="Audio" />
              </div>
            </div>
          </>
        ) : showSMSOnly ? (
          <PricingTable title="Whatsapp SMS Pricing Table" data={smsData} creditLabel="SMS" />
        ) : showImagesOnly ? (
          <PricingTable title="Image Pricing Table" data={imageData} creditLabel="Image" />
        ) : showLinksOnly ? (
          <PricingTable title="Links Pricing Table" data={linksData} creditLabel="Links" />
        ) : (
          <PricingTable title="Audio Pricing Table" data={audioData} creditLabel="Audio" />
        )}
      </div>

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
