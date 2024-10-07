import { Box } from "@mui/material"

const Board = ({ allData, grid, isColored, handleInputClick, selectedNumber }) => {



    return (
        <> {grid.map((row, rowIdx) =>
        (row.map((col, colIdx) => (
            <Box
                key={`${rowIdx}-${colIdx}`}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <input
                    type="number" // Number input
                    value={grid[rowIdx][colIdx] !== 0 ? grid[rowIdx][colIdx] : ''} // Display value from the grid
                    onClick={() => handleInputClick(rowIdx, colIdx)} // Handle input click
                    onChange={(e) => e.preventDefault()} // Prevent manual typing in the 
                    min={1} // Minimum value
                    max={9} // Maximum value                    
                    // readOnly={grid[rowIdx][colIdx] !== 0 && Number(allData.solution[rowIdx][colIdx]) !== Number(grid[rowIdx][colIdx])}
                    readOnly={true}
                    style={{
                        width: '100%', // Make the input take full space inside its box
                        height: '100%',
                        textAlign: "center", // Center the text
                        fontSize: "calc(1.2rem + 0.5vw)", // Responsive font size based on viewport
                        caretColor: "transparent", // Hide caret                       
                        border: `${((Number(allData.solution[rowIdx][colIdx]) == Number(grid[rowIdx][colIdx])) || Number(grid[rowIdx][colIdx]) == 0) ? "1px solid black" : "2px solid red"}`,
                        backgroundColor: isColored(rowIdx, colIdx) ? "#e2dbff" : "#fffff",
                        // backgroundColor: isColored(rowIdx, colIdx) ? "#e0e0e0" : "#fff", // black and white
                        boxSizing: "border-box",

                    }}
                />

            </Box>
        )))
        )}</>
    )
}

export default Board