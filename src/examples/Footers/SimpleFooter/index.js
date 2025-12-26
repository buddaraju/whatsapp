import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

// Dev Infotech components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Dev Infotech base styles
import typography from "assets/theme/base/typography";

function SimpleFooter({ links, light }) {
  const { size } = typography;

  const renderLinks = () =>
    links.map((link, key) => (
      <MKBox
        key={link.name}
        component="li"
        pl={key === 0 ? 0 : 2}
        pr={key === links.length - 1 ? 0 : 2}
        lineHeight={1}
      >
        {/* Removed target="_blank" so it opens in same tab */}
        <Link href={link.href}>
          <MKTypography variant="button" fontWeight="regular" color={light ? "white" : "text"}>
            {link.name}
          </MKTypography>
        </Link>
      </MKBox>
    ));

  return (
    <Container>
      <MKBox
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <MKBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color={light ? "white" : "text"}
          fontSize={size.sm}
        >
          © {new Date().getFullYear()} Dev Infotech. All rights reserved.
        </MKBox>

        <MKBox
          component="ul"
          sx={({ breakpoints }) => ({
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            listStyle: "none",
            mt: 3,
            mb: 0,
            p: 0,
            [breakpoints.up("lg")]: {
              mt: 0,
            },
          })}
        >
          {renderLinks()}
        </MKBox>
      </MKBox>
    </Container>
  );
}

// Default props
SimpleFooter.defaultProps = {
  links: [
    { href: "/", name: "Home" },
    { href: "/pages/landing-pages/about-us", name: "About Us" },
    { href: "/pages/landing-pages/contact-us", name: "Contact Us" },
    { href: "/", name: "License" },
  ],
  light: false,
};

// PropTypes
SimpleFooter.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  light: PropTypes.bool,
};

export default SimpleFooter;
