import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stage1 from './pages/Stage1'
import Stage2 from './pages/Stage2';
import "./App.scss";
import Stage3 from './pages/Stage3';

function App() {

  return (
    <>
      {/* <DndProvider backend={HTML5Backend}>
        <Stage1 />
      </DndProvider>*/}
      <main>
        <BrowserRouter>
          <DndProvider backend={HTML5Backend}>
            <Routes>
              <Route path="/" element={<Stage1 />} />
              <Route path="/stage2" element={<Stage2 />} />
              <Route path="/stage3" element={<Stage3 />} />
            </Routes>
          </DndProvider>
        </BrowserRouter>
      </main>

    </>
  )
}

export default App
