import { colors, Container, CssBaseline, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import gameLogo from '/gameLogo.png';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { Icon } from '@mui/material';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const HomePage = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    // Handle button click here
    // alert("button clicked");
    navigate("/gameboard");
  };

  useEffect(() => {
    sessionStorage.removeItem('puzzleObj');
    sessionStorage.removeItem('activeGrid');
    sessionStorage.removeItem('activeGrid');
    sessionStorage.removeItem("lifeCount");
  }, []);

  return <>

    <Container maxWidth="false" sx={{ height: '100vh', width: '100vw', backgroundColor: '#cfe8fa' }}>
      <Grid container display='flex' spacing={6} sx={{ flexDirection: 'column', backgroundColor: '#cfe8fa', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }} >
        <Grid xs={12} sm={12} md={12} lg={12}  >
          {/**
           * style={{
        backgroundImage: 'url(/bgImg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
           */}
          <motion.img
            src={gameLogo}
            alt="game logo"
            initial={{ opacity: 0, y: -300, border: '2px' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12}  >
          <motion.button
            whileHover={{ scale: 1.2, backgroundColor: '#f0e6c7', color: '#0066ff', transition: 0.5 }}
            whileTap={{ scale: 0.9, backgroundColor: '#f0e6c7' }}
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3 }}
            style={{
              backgroundColor: '#f5d167', // Set the background color  //yellow - #f5d167
              border: 'none', // Remove default button border
              padding: '10px 20px', // Add padding to the button
              display: 'flex', // Use flexbox for alignment
              alignItems: 'center', // Center items vertically
              gap: '0.5rem', // Space between icon and text
              cursor: 'pointer', // Change cursor on hover
            }}
            onClick={handleClick}
          >
            <Icon component={PlayCircleOutlineRoundedIcon} color="primary" fontSize="large" />
            <Typography variant="subtitle1" component="span">
              START
            </Typography>

          </motion.button>
        </Grid>
      </Grid>
    </Container>
  </>;
}

export default HomePage;
