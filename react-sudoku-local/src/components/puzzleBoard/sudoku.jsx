import { Box, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import Board from "./board";


const SudokuBoard = ({ allData, selectedNumber, setSelectedNumber, lifeCount, setLifeCount, isCompleted, setIsCompleted }) => {

  // const initgrid = Array(9).fill("").map(() => Array(9).fill(''));
  const [activeGrid, setActiveGrid] = useState(null);

  // Function to check if the cell belongs to the colored 3x3 grid
  const isColored = (row, col) => {
    const rowSection = Math.floor(row / 3);
    const colSection = Math.floor(col / 3);
    return (rowSection + colSection) % 2 === 0;
  };

  // function to check game is completed or not 
  const isGameFinished = () => {
    for (let i = 0; i < allData?.solution?.length; i++) {
      for (let j = 0; j < allData?.solution[i]?.length; j++) {
        // let val = activeGrid[i][j] == "" ? '0' : activeGrid[i][j];
        if (Number(allData.solution[i][j]) !== Number(activeGrid[i][j])) {
          return false;
        }
      }
    }
    return true;
  }
  // Handle click on input fields to set the selected number in the grid
  const handleInputClick = (row, col) => {

    if (selectedNumber && Number(allData.solution[row][col]) !== Number(activeGrid[row][col])) {
      const newGrid = [...activeGrid];
      newGrid[row][col] = Number(selectedNumber); // Set the selected number
      setActiveGrid(newGrid); // Update the grid state
      const str = JSON.stringify(newGrid)
      sessionStorage.setItem('activeGrid', str);

      if (Number(allData.solution[row][col]) !== Number(selectedNumber)) {

        let count = lifeCount - 1;
        setLifeCount(count);
      }

    } else {

    }
    let val = isGameFinished();
    setIsCompleted(val);
    setSelectedNumber(null);
  };

  useEffect(() => {
    const updatedGrid = sessionStorage.getItem('activeGrid');
    if (updatedGrid) {
      const newData = JSON.parse(updatedGrid);
      setActiveGrid(newData);
    } else {
      const newPuzzle = JSON.stringify(allData.puzzle);
      sessionStorage.setItem('activeGrid', newPuzzle);
      setActiveGrid(allData.puzzle);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("lifeCount", lifeCount);
  }, [lifeCount]);



  return (<>

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {/* Sudoku 9x9 Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)', // Create 9 equally spaced columns
          gridTemplateRows: 'repeat(9, 1fr)', // Create 9 equally spaced rows
          // gap: '0.5px', // Add some space between cells
          width: { xs: '90vw', sm: '80vw', md: '50vw', lg: '40vw' }, // Responsive width
          maxWidth: '450px', // Limit the max width on large screens
          aspectRatio: '1', // Keep the grid square
          maxHeight: '80vw', // Limit max height to avoid overflow
        }}
      >
        {activeGrid && <Board allData={allData} grid={activeGrid} isColored={isColored} handleInputClick={handleInputClick} selectedNumber={selectedNumber} />}

      </Box>
    </Box>


  </>
  )
}

export default SudokuBoard


/**
 * 
 * 
 <Grid container
 spacing={0}
 sx={{
   width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' }, // Responsive width based on screen size
   maxWidth: '450px', // Limit maximum width
   aspectRatio: '1', // Make the grid square
   marginBottom: '20px'
 }}>
 {[...Array(9)].map((_, row) =>
   [...Array(9)].map((_, col) => (
     <Grid item xs={1} key={`${row}-${col}`} sx={{ width: '50px', height: '50px' }}>
       <input
         type="number" // Number input
         value={grid[row][col]} // Display value from the grid
         onClick={() => handleInputClick(row, col)} // Handle input click
         onChange={(e) => e.preventDefault()} // Prevent manual typing in the input
         min={1} // Minimum value
         max={9} // Maximum value
         style={{
           backgroundColor: isColored(row, col) ? "#e0e0e0" : "#fff",
           border: "1px solid black",
           width: "50px",
           height: "50px",
           textAlign: "center", // Center the text
           fontSize: "20px",
           caretColor: "transparent", // Hide caret
         }}
       />
     </Grid>
   ))
 )}
</Grid>
 * 
 */

/**
 * 
 * {grid.map((row, rowIdx) =>
          row.map((col, colIdx) => (
            <Box
              key={`${rowIdx}-${colIdx}`}
              sx={{
                // backgroundColor: isColored(row, col) ? "#e0e0e0" : "#fff",
                // border: "1px solid black",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <input
                type="number" // Number input
                value={grid[rowIdx][colIdx]} // Display value from the grid
                onClick={() => handleInputClick(rowIdx, colIdx)} // Handle input click
                onChange={(e) => e.preventDefault()} // Prevent manual typing in the input
                min="1" // Minimum value
                max="9" // Maximum value
                style={{
                  width: '100%', // Make the input take full space inside its box
                  height: '100%',
                  textAlign: "center", // Center the text
                  fontSize: "calc(1.2rem + 0.5vw)", // Responsive font size based on viewport
                  caretColor: "transparent", // Hide caret
                  border: "1px solid black",
                  backgroundColor: isColored(rowIdx, colIdx) ? "#e0e0e0" : "#fff",
                }}
              />
            </Box>
          ))
        )}
 * 
 */