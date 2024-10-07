import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { OverlayContainer, OverlayContent } from "./overlay";
import { useState } from "react";


const StartGameOverlay = ({ open, onStart }) => {
    if (!open) return null;

    const [obj, setObj] = useState({ grid: 9, difficulty: '' });

    const handleChange = (e) => {

        setObj(oldObj => ({ ...oldObj, difficulty: e.target.value }));

    };

    const handleStart = () => {
        // e.preventDefault();
        if (obj.difficulty !== '') {
            onStart(obj);
        }
    };

    const handleDemo = () => {
        onStart({ grid: 9, difficulty: 'Demo' });
    }


    return (
        <OverlayContainer>
            <OverlayContent>
                <Box component="section" sx={{ marginTop: 2, p: 2, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Box sx={{ marginTop: 1 }}>
                        <Typography variant="h5" component="h6">
                            SUDOKU
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: 1 }}>
                        <Typography variant="subtitle1" component="span">
                            Select difficulty level
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: 1 }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Difficulty</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={obj.difficulty}
                                onChange={handleChange}
                                autoWidth
                                label="Difficulty"
                            >
                                <MenuItem value={"Easy"}>Easy</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"Hard"}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display="flex" sx={{ marginTop: 1, justifyContent: "space-evenly" }}>
                        <Button onClick={handleStart} variant="contained" color="success">
                            Start Game
                        </Button>
                        <Button onClick={handleDemo} variant="contained" color="warning">
                            Start Demo
                        </Button>
                    </Box>
                </Box>
            </OverlayContent>
        </OverlayContainer>
    );

}

export default StartGameOverlay