import { useState } from 'react';
import { useDrop } from 'react-dnd';
import '../style/stage1Style.css';
import Word from '../components/Word';

type WordItem = {
  id: number;
  value: string;
};

const INITIAL_WORDS_LIST: WordItem[] = [
  { id: 1, value: 'תאריך' },
  { id: 2, value: 'לכבוד' },
  { id: 3, value: 'ותק' },
];

function Stage1() {
  const [board, setBoard] = useState<WordItem[]>([]);
  const [wordBank, setWordBank] = useState<WordItem[]>(INITIAL_WORDS_LIST);

  const [{ isOver }, drop] = useDrop<
    { id: number; value: string },
    void,
    { isOver: boolean }
  >({
    accept: 'WORD',
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleDrop = (item: { id: number; value: string }) => {
    // Add the word to the board if it doesn't already exist there
    if (!board.some((word) => word.id === item.id)) {
      setBoard((prevBoard) => [...prevBoard, item]);
    }

    // Remove the word from the word bank
    setWordBank((prevBank) => prevBank.filter((word) => word.id !== item.id));
  };

  return (
    <div>
      <h1>להשלים את התלוש</h1>
      <p>בחרו מילה מתוך בנק המילים</p>
      <p>והתאימו אותם למיקום הנכון בתלוש השכר</p>

      <div className="payslip-container">
        <div
          ref={drop}
          className="payslip-board"
          style={{
            border: isOver ? '2px dashed green' : '2px solid black',
            minHeight: '100px',
            padding: '10px',
          }}
        >
          {board.map((word) => (
            <div key={word.id} className="word-container">
              {word.value}
            </div>
          ))}
        </div>
      </div>

      <div className="Words-bank-container">
        <p>בנק מילים</p>
        {wordBank.map((word) => (
          <Word key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
}

export default Stage1;
