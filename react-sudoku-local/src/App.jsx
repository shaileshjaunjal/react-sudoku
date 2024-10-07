
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/home';
import ErrorPage from './components/pages/error';
import MainPage from './components/pages/main';
import Loading from './components/pages/loader';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/gameboard",
    element: <MainPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

function App() {

  return (<RouterProvider /* sx={{ backgroundColor: '#fedfwsq' }} */ router={router} fallbackElement={<Loading />} />);
}

export default App


/**
 * 
 *  
  <div><p>SUDOKU</p></div>
  <button onClick={HandleGeneratePuzzle}> Generate</button> 
      
 */
