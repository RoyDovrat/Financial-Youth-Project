import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Stage1 from './pages/Stage1'

function App() {

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Stage1 />
      </DndProvider>


    </>
  )
}

export default App
