import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// MUI
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// Dev components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Image
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

const BASE_URL = "http://127.0.0.1:8000/accounts";

function SignInBasic() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = btoa(`${email}:${password}`);

      const res = await axios.get(`${BASE_URL}/user/`, {
        headers: { Authorization: `Basic ${token}` },
      });

      const role = res.data.role.toLowerCase(); // 🔑 normalize

      // STORE AUTH
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("role", role);

      // REDIRECT
      if (role === "admin") {
        navigate("/pages/landing-pages/user");
      } else {
        navigate("/pages/landing-pages/user/User");
      }
    } catch (err) {
      setError("Invalid email or password");
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MKBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
      />

      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative">
        <Grid container justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4}>
            <Card>
              <MKBox p={3} textAlign="center">
                <MKTypography variant="h4">Sign In</MKTypography>
              </MKBox>

              <MKBox px={3} pb={3} component="form" onSubmit={handleLogin}>
                <MKInput
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MKBox mt={2}>
                  <MKInput
                    type="password"
                    label="Password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </MKBox>

                <MKBox display="flex" alignItems="center" mt={2}>
                  <Switch checked={rememberMe} />
                  <MKTypography variant="button">Remember me</MKTypography>
                </MKBox>

                {error && (
                  <MKTypography color="error" textAlign="center" mt={2}>
                    {error}
                  </MKTypography>
                )}

                <MKButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 3 }}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </MKButton>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>

      <SimpleFooter light />
    </>
  );
}

export default SignInBasic;
