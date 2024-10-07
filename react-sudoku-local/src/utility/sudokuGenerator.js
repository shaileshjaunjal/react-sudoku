export class Sudoku {
  // Constructor
  constructor(N, lvl) {
    this.N = N; // N=9 for 9 x 9
    this.K = getNumberOfCells(lvl); // difficulty level
    // Compute square root of N
    const SRNd = Math.sqrt(N);
    this.SRN = Math.floor(SRNd);

    // Initialize all entries as false to indicate
    // that there are no edges initially ( solution matrix)
    this.mat = Array.from(
      {
        length: N,
      },
      () =>
        Array.from(
          {
            length: N,
          },
          () => 0
        )
    );

    // final puzzle matrix
    this.fmat = Array.from(
      {
        length: N,
      },
      () =>
        Array.from(
          {
            length: N,
          },
          () => 0
        )
    );

    //initialize json object
    this.dataObject = { difficulty: lvl, emptyCell: this.K };
  }

  // Sudoku Generator
  fillValues() {
    // Fill the diagonal of SRN x SRN matrices
    this.fillDiagonal();

    // Fill remaining blocks
    this.fillRemaining(0, this.SRN);
    let sol = { solution: this.fmat };
    Object.assign(this.dataObject, sol);

    // Remove Randomly K digits to make game
    this.removeKDigits();
    let puz = { puzzle: this.mat };
    Object.assign(this.dataObject, puz);

    return true;
  }

  // Fill the diagonal SRN number of SRN x SRN matrices
  fillDiagonal() {
    for (let i = 0; i < this.N; i += this.SRN) {
      // for diagonal box, start coordinates->i==j
      this.fillBox(i, i);
    }
  }

  // Returns false if given 3 x 3 block contains num.
  unUsedInBox(rowStart, colStart, num) {
    for (let i = 0; i < this.SRN; i++) {
      for (let j = 0; j < this.SRN; j++) {
        if (this.mat[rowStart + i][colStart + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  // Fill a 3 x 3 matrix.
  fillBox(row, col) {
    let num = 0;
    for (let i = 0; i < this.SRN; i++) {
      for (let j = 0; j < this.SRN; j++) {
        while (true) {
          num = this.randomGenerator(this.N);
          if (this.unUsedInBox(row, col, num)) {
            break;
          }
        }
        this.mat[row + i][col + j] = num;
        this.fmat[row + i][col + j] = num; // modified
      }
    }
  }

  // Random generator
  randomGenerator(num) {
    return Math.floor(Math.random() * num + 1);
  }

  // Check if safe to put in cell
  checkIfSafe(i, j, num) {
    return (
      this.unUsedInRow(i, num) &&
      this.unUsedInCol(j, num) &&
      this.unUsedInBox(i - (i % this.SRN), j - (j % this.SRN), num)
    );
  }

  // check in the row for existence
  unUsedInRow(i, num) {
    for (let j = 0; j < this.N; j++) {
      if (this.mat[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  // check in the row for existence
  unUsedInCol(j, num) {
    for (let i = 0; i < this.N; i++) {
      if (this.mat[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  // A recursive function to fill remaining
  // matrix
  fillRemaining(i, j) {
    // Check if we have reached the end of the matrix
    if (i === this.N - 1 && j === this.N) {
      return true;
    }

    // Move to the next row if we have reached the end of the current row
    if (j === this.N) {
      i += 1;
      j = 0;
    }

    // Skip cells that are already filled
    if (this.mat[i][j] !== 0) {
      return this.fillRemaining(i, j + 1);
    }

    // Try filling the current cell with a valid value
    for (let num = 1; num <= this.N; num++) {
      if (this.checkIfSafe(i, j, num)) {
        this.mat[i][j] = num;
        this.fmat[i][j] = num; //modified
        if (this.fillRemaining(i, j + 1)) {
          return true;
        }
        this.mat[i][j] = 0;
        this.fmat[i][j] = 0; //modified
      }
    }
    // No valid value was found, so backtrack
    return false;
  }

  // Print sudoku
  printSudoku() {
    for (let i = 0; i < this.N; i++) {
      console.log(this.mat[i].join(" "));
    }
  }

  // Remove the K no. of digits to
  // complete game
  removeKDigits() {
    let count = this.K;
    while (count !== 0) {
      // extract coordinates i and j
      let i = Math.floor(Math.random() * this.N);
      let j = Math.floor(Math.random() * this.N);
      if (this.mat[i][j] !== 0) {
        count--;
        this.mat[i][j] = 0;
      }
    }

    return;
  }

  // To return json object
  getPuzzleObject() {
    return this.dataObject;
  }
}

// Utitity functions...

// Number of cells which will be kept empty depending upon difficulty level (easy-30 to 40,medium-40 to 50,hard- 50 to 60)
function getNumberOfCells(level) {
  if (level === "Easy") {
    return getRandomInt(30, 40);
  } else if (level === "Medium") {
    return getRandomInt(40, 50);
  } else if (level === "Hard") {
    return getRandomInt(50, 60);
  } else if (level === "Demo") {
    return getRandomInt(1, 5);
  }
  return getRandomInt(30, 60);
}

// Random number generator using range
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * difficulty level by empty cell 
 * 
 * easy - 30 to 40 , medium - 40 to 50 , hard - 50 to 60
 * 
 * driving code
 * 
 * const HandleGeneratePuzzle = () => {
    setIsPuzzleGenerated(oldState => false);
    let N = 9  // For 9 * 9 grid
    let K = 40 //number of cell to removed
    let sudoku = new Sudoku(N, 'easy');
    let val = sudoku.fillValues();
    setIsPuzzleGenerated(oldState => val);
    // sudoku.printSudoku();
    if (val) {
      console.log(sudoku.getPuzzleObject());
    }
  }
 */
