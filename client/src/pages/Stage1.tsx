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
  const [employeeBasicDetails, setEmployeeBasicDetails] = useState<(WordItem | null)[]>([null, null]); 

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
    <div className='page-stage1'>
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
                className={`payslip-slot slot-${index}`}
               
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
