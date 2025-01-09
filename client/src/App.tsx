import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stage1 from './pages/Stage1'
import Stage2 from './pages/Stage2';

function App() {

  return (
    <>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route path="/" element={<Stage1 />} />
            <Route path="/stage2" element={<Stage2 />} />
          </Routes>
        </DndProvider>
      </BrowserRouter>


    </>
  )
}

export default App
