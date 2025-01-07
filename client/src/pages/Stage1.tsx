import { useState } from 'react';
import { useDrop } from 'react-dnd';
import '../style/stage1Style.css';
import Word from '../components/Word';

type WordItem = {
  id: number;
  value: string;
};

const WORDS_LIST: WordItem[] = [
  { id: 1, value: 'תאריך' },
  { id: 2, value: 'לכבוד' },
  { id: 3, value: 'ותק' },
];

function Stage1() {
  const [board, setBoard] = useState<WordItem[]>([]);

  const [{ isOver }, drop] = useDrop<{ id: number; value: string }, void, { isOver: boolean }>
  ({
    accept: 'WORD',
    drop: (item) => addWordToBoard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addWordToBoard = (item: { id: number; value: string }) => {
    if (!board.some((word) => word.id === item.id)) {
      setBoard((prevBoard) => [...prevBoard, item]);
    }
  };

  return (
    <div>
      <h1>להשלים את התלוש</h1>
      <p>בחרו מילה מתוך בנק המילים</p>
      <p>והתאימו אותם למיקום הנכון בתלוש השכר</p>

      <div className="payslip-container">
        <div
          ref={drop} // Attach the drop reference
          className="payslip-board"
          style={{
            border: isOver ? '2px dashed green' : '2px solid black',
            minHeight: '100px',
            padding: '10px',
          }}
        >
          {board.map((word) => (
            <div key={word.id} className="dropped-word">
              {word.value}
            </div>
          ))}
        </div>
      </div>

      <div className="Words-bank-container">
        <p>בנק מילים</p>
        {WORDS_LIST.map((word) => (
          <Word key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
}

export default Stage1;
