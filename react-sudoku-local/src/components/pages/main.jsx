import { Button, colors, Container, CssBaseline, Divider, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Icon } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { useEffect, useRef, useState } from "react";
import StartGameOverlay from "../overlays/startGameOverlay";
import { Sudoku } from "../../utility/sudokuGenerator";
import { useNavigate } from "react-router-dom";
import HelpOverlay from "../overlays/helpOverlay";
import SudokuBoard from "../puzzleBoard/sudoku";
import InformationBar from "../infoBar";
import GameOverOverlay from "../overlays/gameOverOverlay";
import GameWinOverlay from "../overlays/gameWinOverlay";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MainPage = () => {

  // const initgrid = Array(9).fill("").map(() => Array(9).fill(''));
  const navigate = useNavigate();
  const [puzzleObj, setPuzzleObj] = useState(null);
  const [inputBox, setInputBox] = useState(false);
  const [helpBox, setHelpBox] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  // const [activeGrid, setActiveGrid] = useState(initgrid);
  const [lifeCount, setLifeCount] = useState(() => {
    const count = sessionStorage.getItem("lifeCount");
    return count ? Number(count) : 5;
  });

  const [seconds, setSeconds] = useState(() => {
    // Get initial timer value from sessionStorage or default to 0
    const savedTime = sessionStorage.getItem("timer");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Retrieve the string from sessionStorage
  const dataStr = sessionStorage.getItem('puzzleObj');

  const handleStart = (values) => {
    let sudoku = new Sudoku(values.grid, values.difficulty);
    let val = sudoku.fillValues();

    cleanSessionStorage();
    setLifeCount(5);

    if (val) {
      const jsonObj = sudoku.getPuzzleObject();
      const myDataString = JSON.stringify(jsonObj);
      sessionStorage.setItem('puzzleObj', myDataString);
      const puzzleStr = JSON.stringify(jsonObj.puzzle)
      sessionStorage.setItem('activeGrid', puzzleStr);
      setPuzzleObj(jsonObj);
      // setLifeCount(5);
    }

    setInputBox(oldState => false);
    setIsCompleted(oldState => false);
    window.location.reload(false);
  }

  const closeHelp = () => {
    setHelpBox(oldState => false);
  };

  const cleanSessionStorage = () => {
    sessionStorage.removeItem('puzzleObj');
    sessionStorage.removeItem('activeGrid');
    // sessionStorage.removeItem('lifeCount');
    sessionStorage.removeItem("timer");
  }

  // Handle button click to select a number
  const handleNumberClick = (number) => {
    setSelectedNumber(number); // Set the selected number
  };

  const newGame = () => {
    sessionStorage.removeItem('puzzleObj');
    sessionStorage.removeItem('activeGrid');
    sessionStorage.removeItem('lifeCount');
    // sessionStorage.setItem("lifeCount", 5);
    setLifeCount(5);
    sessionStorage.removeItem("timer");
    setInputBox(oldState => true);
    setIsCompleted(oldState => false);
    resetTimer();
  };

  const resetGame = () => {
    sessionStorage.removeItem('activeGrid');
    sessionStorage.removeItem("lifeCount");
    // sessionStorage.setItem("lifeCount", 5);
    resetTimer();
    window.location.reload(false);
  }

  // Save the current time in sessionStorage every time it changes
  // useEffect(() => {
  //   sessionStorage.setItem("timer", seconds);
  //   // sessionStorage.setItem("lifeCount", lifeCount);
  // }, [seconds]);

  // Timer functionality
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          let val = prevSeconds + 1;
          sessionStorage.setItem("timer", val);
          return val;
        });
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);


  const handlePauseResume = (val) => {
    if (val == 'toggle') {
      setIsActive(!isActive);
    } else {
      setIsActive(val);
    }

  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    sessionStorage.removeItem("timer");
  };

  useEffect(() => {
    if (dataStr) {
      // Convert the string back to a JSON object
      const dataObj = JSON.parse(dataStr);
      // console.log(dataObj);
      setPuzzleObj(dataObj);
      // resetTimer();
      setIsActive(true);
      // setLifeCount(5);
    } else {
      setInputBox(oldState => true);
    }
  }, [dataStr]);

  return <>
    <Container maxWidth="xl" disableGutters display='flex' sx={{ height: '100vh', width: '100vw', alignItems: 'start', justifyContent: 'center', overflow: "auto", backgroundColor: '#f9f5fc' }}>
      {puzzleObj && <>
        {/* <Grid container maxWidth="xl" display='flex' sx={{ height: '100%', width: '100%', backgroundColor: '#f9f5fc', alignItems: 'start', justifyContent: 'center' }} > */}
          <Grid display='flex' sx={{ /* marginTop: 2, */ alignItems: 'start', justifyContent: 'space-around', backgroundColor: '#A594F9', width: '100%' }} >
            <Typography variant="h4" component="h5">
              SUDOKU
            </Typography>
            <Grid display='flex' sx={{ justifyContent: 'end', width: '20%' }}>
              <Icon component={LogoutRoundedIcon} onClick={() => { navigate('/'); }} color="inherit" fontSize="large" />
              {/* <Icon component={HelpOutlineRoundedIcon} onClick={() => { setHelpBox(oldState => true) }} color="primary" fontSize="large" /> */}
            </Grid>
          </Grid>

          <InformationBar lifeCount={lifeCount} setLifeCount={setLifeCount} puzzleObj={puzzleObj} seconds={seconds} />

          <Grid display='flex' sx={{ flexDirection: "column", alignItems: "center", backgroundColor: '#f9f5fc', width: '100%' }} >

            <Grid display='flex' sx={{ flexDirection: "coulmn", justifyContent: 'center', alignItems: "center", backgroundColor: '#f9f5fc', width: '100%' }}>
              <SudokuBoard allData={puzzleObj} selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} lifeCount={lifeCount} setLifeCount={setLifeCount} isCompleted={isCompleted} setIsCompleted={setIsCompleted} />
            </Grid>


          </Grid>
          <Grid container display='flex' spacing={1} sx={{ flexDirection: "column", alignItems: "center", backgroundColor: '#CDC1FF', width: '100%' }} >
            <Grid display='flex' sx={{ alignItems: "center", justifyContent: 'space-evenly', width: '60%', margin: 1, flexWrap: "wrap" }}>

              {numbers.map((num, idx) => (<Button key={num} variant="contained" color={num == selectedNumber ? 'inherit' : 'secondary'} value={num} onClick={(e) => { handleNumberClick(e.target.value); }} >
                {num}
              </Button>))
              }

            </Grid>
            <Grid display='flex' sx={{ alignItems: "center", justifyContent: 'space-around', width: '100%', backgroundColor: '#A594F9' }}>

              <Grid display='flex' sx={{ alignItems: "start", justifyContent: 'space-evenly', width: '60%', margin: 1, flexWrap: "wrap" }}>

                <Button variant="contained" color="success" onClick={() => { newGame() }} >
                  New Game
                </Button>
                <Button variant="contained" color="error" onClick={resetGame} >
                  Restart
                </Button>
                <Button variant="contained" color={isActive ? "warning" : "inherit"} onClick={() => { handlePauseResume('toggle'); }} >
                  {isActive ? "Pause" : "Resume"}
                </Button>
              </Grid>

            </Grid>
          </Grid>
        {/* </Grid> */}
        </>}

      {inputBox && <StartGameOverlay open={inputBox} onStart={handleStart} />}
      {helpBox && <HelpOverlay open={helpBox} onClose={closeHelp} />}
      {lifeCount == 0 && puzzleObj && <GameOverOverlay open={lifeCount == 0} newGame={newGame} resetGame={resetGame} seconds={seconds} handlePauseResume={handlePauseResume} />}
      {isCompleted && lifeCount > 0 && <GameWinOverlay open={(isCompleted && lifeCount > 0)} newGame={newGame} resetGame={resetGame} seconds={seconds} handlePauseResume={handlePauseResume} />}

    </Container >
  </>;
}

export default MainPage;


/**
 * {difficulty: 'easy', emptyCell: 38, solution: Array(9), puzzle: Array(9)}
difficulty
: 
"easy"
emptyCell
: 
38
puzzle
: 
Array(9)
0
: 
(9) [1, 4, 0, 0, 5, 3, 6, 0, 0]
1
: 
(9) [0, 8, 0, 0, 4, 7, 3, 0, 0]
2
: 
(9) [5, 0, 3, 6, 0, 0, 1, 2, 0]
3
: 
(9) [4, 2, 0, 9, 3, 1, 0, 8, 6]
4
: 
(9) [7, 3, 0, 0, 0, 2, 9, 0, 0]
5
: 
(9) [6, 9, 1, 0, 0, 0, 0, 0, 0]
6
: 
(9) [0, 0, 0, 8, 1, 0, 0, 6, 3]
7
: 
(9) [0, 1, 0, 0, 7, 0, 8, 4, 0]
8
: 
(9) [8, 6, 4, 3, 2, 9, 0, 1, 0]
length
: 
9
[[Prototype]]
: 
Array(0)
solution
: 
Array(9)
0
: 
(9) [1, 4, 9, 2, 5, 3, 6, 7, 8]
1
: 
(9) [2, 8, 6, 1, 4, 7, 3, 9, 5]
2
: 
(9) [5, 7, 3, 6, 9, 8, 1, 2, 4]
3
: 
(9) [4, 2, 5, 9, 3, 1, 7, 8, 6]
4
: 
(9) [7, 3, 8, 4, 6, 2, 9, 5, 1]
5
: 
(9) [6, 9, 1, 7, 8, 5, 4, 3, 2]
6
: 
(9) [9, 5, 7, 8, 1, 4, 2, 6, 3]
7
: 
(9) [3, 1, 2, 5, 7, 6, 8, 4, 9]
8
: 
(9) [8, 6, 4, 3, 2, 9, 5, 1, 7]
length
: 
9
 */



/**
 * <Grid display='flex' sx={{ alignItems: "center", justifyContent: 'space-around', width: '130%', backgroundColor: '#fecd4f' }}>

          <Grid display='flex' sx={{ alignItems: "center", justifyContent: 'space-evenly', marginTop: 1, width: '60%', backgroundColor: '#cdeabf', flexWrap: "wrap" }}>

            <Grid display='flex' sx={{ justifyContent: 'center', width: '20%' }}>
              <Typography variant="subtitle1" component="span">
                Life:
              </Typography>
              {lifeCount > 0 && <>{Array(lifeCount).fill('').map((item, idx) => (<Icon key={idx} component={FavoriteIcon} color="error" fontSize="medium" />))}</>}
            </Grid>
            <Grid display='flex' sx={{ justifyContent: 'start', width: '20%' }}>
              <Typography variant="subtitle1" component="span">
                Difficulty Level: {puzzleObj?.difficulty}
              </Typography>
            </Grid>
            <Grid display='flex' sx={{ justifyContent: 'center', width: '20%' }}>
              <Typography variant="subtitle1" component="span">
                Time: {'0' + Math.floor(seconds / 60)}:{('0' + (seconds % 60)).slice(-2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
 */