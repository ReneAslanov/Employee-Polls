import './App.css';
import Home from './components/Home';
import Login from "./components/Login.js";
import { Route, Routes } from "react-router-dom";
import New from './components/New';
import Poll from './components/Poll';
import { Fragment, useEffect } from "react";
import Leaderboard from './components/Leaderboard';
import {_getUsers, _getQuestions} from "./utils/_DATA"
import { useDispatch } from 'react-redux';
import { setQuestions } from './actions/questions';
import { receiveUsers } from "./actions/shared"
import ErrorPage from './components/ErrorPage';

function App() {

  const dispatch = useDispatch();
  function handleInitialData()
  {
    _getQuestions().then(data => dispatch(setQuestions(data)));
    _getUsers().then(data => dispatch(receiveUsers(data)));
  }

  useEffect(() => {
    handleInitialData();
  });

  return (
    <Fragment>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route exact path='/' element={<Login />} />
        <Route path='/add' element={<New />} />
        <Route path='/question/:id' element={<Poll />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
