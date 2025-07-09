import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharacterSheet from './components/CharacterSheet';
import CharacterView from './components/CharacterView'; // 新規作成予定
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CharacterSheet />} />
        <Route path="/view" element={<CharacterView />} />
      </Routes>
    </div>
  );
}

export default App;
