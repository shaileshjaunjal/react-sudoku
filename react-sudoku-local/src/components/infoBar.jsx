import { Box, Icon, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from "framer-motion";


const InformationBar = ({ lifeCount, setLifeCount, puzzleObj, seconds }) => {
    const variants = {
        initial: { opacity: 0, scale: 0 },
        animate: {
            opacity: 1, scale: 1,
            // transition: { delay: 0.2, staggerChildren: 0.1 } },
            transition: { ease: "easeOut", duration: 0.2 }
        }
    };
    return (
        <>
            {/* <Grid display='flex' sx={{ alignItems: "center", justifyContent: 'space-around', width: '130%', backgroundColor: '#fecd4f' }}> */}

            <Grid display='flex' sx={{ alignItems: "bottom", justifyContent: 'space-evenly', width: '100%', height: "auto", backgroundColor: '#CDC1FF' }}>

                <Grid display='flex' sx={{ justifyContent: 'center', width: '30%' }}>
                    <Typography variant="subtitle1" component="span">
                        Life:
                    </Typography>
                    <Grid display='flex' sx={{ justifyContent: 'center' }}>
                        {lifeCount > 0 && <motion.div variants={variants} initial="initial" animate="animate" display="flex" sx={{ justifyContent: 'center' }} > {Array(lifeCount).fill('').map((item, idx) => (<Icon key={idx} component={FavoriteIcon} color="error" fontSize="medium" />))}</motion.div>}
                    </Grid>
                </Grid>
                <Grid display='flex' sx={{ justifyContent: 'center', width: '30%' }}>
                    <Typography variant="subtitle1" component="span">
                        Level: {puzzleObj?.difficulty}
                    </Typography>
                </Grid>
                <Grid display='flex' sx={{ justifyContent: 'center', width: '30%' }}>
                    <Typography variant="subtitle1" component="span">
                        Time: {(Math.floor(seconds / 60) >= 10) ? Math.floor(seconds / 60) : ('0' + Math.floor(seconds / 60))}:{('0' + (seconds % 60)).slice(-2)}
                    </Typography>
                </Grid>
            </Grid>
            {/* </Grid > */}
        </>

    )
}

export default InformationBar

// <motion.div variants={variants} initial="initial" animate="animate" display='flex'> </motion.div>