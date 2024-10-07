import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Redirect to home page or any specific route
  };

  return (<Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    width="100vw"
    bgcolor="background.paper"
    p={3}
  >
    <Typography variant="h1" color="error" gutterBottom>
      404
    </Typography>
    <Typography variant="h4" color="textSecondary" gutterBottom>
      Oops! Something went wrong.
    </Typography>
    <Typography variant="body1" color="textSecondary" mb={3}>
      {/* It might have been removed, had its name changed, or is temporarily unavailable. */}
    </Typography>
    <Button variant="contained" color="primary" onClick={handleGoBack}>
      Go to Home
    </Button>
  </Box>);
}

export default ErrorPage;
