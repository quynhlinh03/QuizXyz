import React, { Fragment } from 'react';
import Header from './components/Layout/Header/Header';
import DataQuiz from './page/QuizPage/DataQuizPage'

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <DataQuiz></DataQuiz>
      </main>
    </Fragment>
  );
}

export default App;
