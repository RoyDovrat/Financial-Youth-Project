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
  const [wordBank, setWordBank] = useState<WordItem[]>(INITIAL_WORDS_LIST);
  const [slots, setSlots] = useState<(WordItem | null)[]>([null, null, null]);

  // function to create a drop area for each slot
  const createDrop = (index: number) =>
    useDrop<
      { id: number; value: string },
      void,
      { isOver: boolean }
    >({
      accept: 'WORD',
      drop: (item) => handleDrop(item, index),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });


  const handleDrop = (item: { id: number; value: string }, index: number) => {
    if (item.id - 1 === index && !slots[index]) {
      const newSlots = [...slots];
      newSlots[index] = item;
      setSlots(newSlots);

      setWordBank((prevBank) =>
        prevBank.filter((word) => word.id !== item.id)
      );
    } else {
      alert('This word does not belong here!');
    }
  };

  return (
    <div>
      <div className='instructions'>
        <h1>להשלים את התלוש</h1>
        <p>בחרו מילה מתוך בנק המילים</p>
        <p>והתאימו אותם למיקום הנכון בתלוש השכר</p>
      </div>

      <div className="payslip-container">
        <div className="payslip-board">
          {slots.map((slot, index) => {
            const [{ isOver }, dropRef] = createDrop(index);

            return (
              <div
                key={index}
                ref={dropRef}
                className="payslip-slot"
                style={{
                  border: isOver ? '2px dashed green' : '1px solid gray',
                  minHeight: '50px',
                  minWidth: '100px',
                  margin: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: slot ? '#b3afeb' : '#f9f9f9',
                }}
              >
                {slot ? (
                  <div className="word-container">{slot.value}</div>
                ) : (
                  'Drop Here'
                )}
              </div>
            );
          })}
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
