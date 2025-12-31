// @mui material components
// import { Box, Typography } from "@mui/material";

// @mui icons
import GroupsIcon from "@mui/icons-material/Groups";
import BookIcon from "@mui/icons-material/Book";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LoginIcon from "@mui/icons-material/Login";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SmsIcon from "@mui/icons-material/Sms";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import Blog from "layouts/pages/landing-pages/blog";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import Prices from "layouts/pages/landing-pages/prices";
import Author from "layouts/pages/landing-pages/author";
import SignIn from "layouts/pages/authentication/sign-in";
import BookDemo from "pages/LandingPages/BookDemo";
import Sms from "pages/LandingPages/Author/sms";
import WhatsApp from "pages/LandingPages/Author/whatsapp";
import UserAdd from "pages/LandingPages/Users";
import AddUser from "pages/LandingPages/Users/AddUser";

const routes = [
  {
    name: "About Us",
    icon: <GroupsIcon sx={{ color: "primary.main", fontSize: 28 }} />,
    route: "/pages/landing-pages/about-us",
    component: <AboutUs />,
    displayInNavbar: true,
  },
  {
    name: "Blog",
    icon: <BookIcon sx={{ color: "secondary.main", fontSize: 28 }} />,
    route: "/pages/landing-pages/blog",
    component: <Blog />,
    displayInNavbar: true,
  },
  {
    name: "Services",
    icon: <MiscellaneousServicesIcon sx={{ color: "#f57c00", fontSize: 28 }} />,
    component: <Author />,
    displayInNavbar: true,
    collapse: [
      {
        name: "WhatsApp SMS",
        icon: <SmsIcon sx={{ color: "#4caf50", fontSize: 26 }} />,
        route: "/pages/landing-pages/about-us/sms",
        component: <Sms />,
      },
      {
        name: "WhatsApp API",
        icon: <WhatsAppIcon sx={{ color: "#25D366", fontSize: 26 }} />,
        route: "/pages/landing-pages/about-us/whatsapp",
        component: <WhatsApp />,
      },
    ],
  },
  {
    name: "Contact Us",
    icon: <ContactMailIcon sx={{ color: "#1976d2", fontSize: 28 }} />,
    route: "/pages/landing-pages/contact-us",
    component: <ContactUs />,
    displayInNavbar: true,
  },
  {
    name: "Prices",
    icon: <CurrencyRupeeIcon sx={{ color: "#9c27b0", fontSize: 28 }} />,
    route: "/pages/landing-pages/prices",
    component: <Prices />,
    displayInNavbar: true,
  },
  {
    name: "Sign In",
    icon: <LoginIcon sx={{ color: "#d32f2f", fontSize: 28 }} />,
    route: "/pages/authentication/sign-in",
    component: <SignIn />,
    displayInNavbar: true,
  },
  {
    name: "useradd",
    icon: <LoginIcon sx={{ color: "#d32f2f", fontSize: 28 }} />,
    route: "/pages/landing-pages/user",
    component: <UserAdd />,
    displayInNavbar: false, // <-- Hide in navbar
  },
  {
    name: "newuser",
    icon: <LoginIcon sx={{ color: "#d32f2f", fontSize: 28 }} />,
    route: "/pages/landing-pages/user/AddUser",
    component: <AddUser />,
    displayInNavbar: false, // <-- Hide in navbar
  },
  {
    route: "/pages/landing-pages/BookDemo",
    component: <BookDemo />,
    action: {
      type: "external | internal",
      route: "/pages/landing-pages/BookDemo",
      label: "BOOK A DEMO",
      color: "info",
    },
    displayInNavbar: false, // Optional
  },
];

export default routes;
