import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import MKTypography from "components/MKTypography";

import logoCT from "assets/images/logo-ct-dark.png";
import "./pages/Presentation/app.css";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Dev Infotech",
    image: logoCT,
    route: "/",
  },

  socials: [{ icon: <FacebookIcon /> }, { icon: <TwitterIcon /> }],

  menus: [
    {
      name: "company",
      items: [
        { name: "Home", route: "/", className: "font" },
        { name: "About Us", route: "/pages/landing-pages/about-us", className: "font" },
      ],
    },
    {
      name: "resources",
      items: [
        { name: "Blog", route: "/", className: "font" },
        { name: "Docs", route: "/", className: "font" },
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "Contact", route: "/pages/landing-pages/contact-us", className: "font" },
        { name: "FAQ", route: "/", className: "font" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "Privacy Policy", route: "/", className: "font" },
        { name: "Terms & Conditions", route: "/", className: "font" },
      ],
    },
  ],

  copyright: (
    <MKTypography variant="button" fontWeight="regular" className="font">
      All rights reserved. Copyright © {date} Dev Infotech
    </MKTypography>
  ),
};
