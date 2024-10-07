import { Box, Button, Typography } from "@mui/material";
import { OverlayContainer, OverlayContent } from "./overlay";
import { useEffect } from "react";


const GameWinOverlay = ({ open, resetGame, newGame, children, seconds, handlePauseResume }) => {
    if (!open) return null;

    handlePauseResume(false);
    return (
        <OverlayContainer>
            <OverlayContent display='flex' sx={{ p: 2, alignItems: 'center', justifyContent: 'space-around' }} >
                <Box component="section" sx={{ p: 2, alignItems: 'center', justifyContent: 'space-around' }}>
                    <Box>
                        <Typography variant="h5" component="h6">
                            SUDOKU
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h3" component="h5">
                            GAME OVER
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="warning" component="h6">
                            You Won
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" component="h3">
                            Want to play again?
                        </Typography>
                    </Box>
                    <Box display='flex' sx={{ marginTop: 2, alignItems: 'center', justifyContent: 'space-around' }}>
                        <Button onClick={() => { newGame() }} color="success" variant="contained" >
                            New Game
                        </Button>
                        <Button onClick={resetGame} color="error" variant="contained" >
                            Restart
                        </Button>
                    </Box>
                </Box>
            </OverlayContent>
        </OverlayContainer>
    );

}

export default GameWinOverlay