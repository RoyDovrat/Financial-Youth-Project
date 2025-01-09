import { useState } from 'react';
import { useDrop } from 'react-dnd';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../style/stage1Style.css';
import Word from '../components/Word';

const STAGE_NUMBER = 2
const TOTAL_STAGES = 3
const PROGRESS = (STAGE_NUMBER / TOTAL_STAGES) * 100;

type WordItem = {
  id: number;
  value: string;
};

const INITIAL_WORDS_LIST: WordItem[] = [
  { id: 1, value: 'פרטי החברה' },
  { id: 2, value: 'תאריך' },
  { id: 3, value: 'לכבוד' },
  { id: 4, value: 'שם מלא עובד' },
  { id: 5, value: 'כתובת' },
  { id: 6, value: 'פרטים אישיים' },
  { id: 7, value: 'ת"ז עובד' },
];

function Stage2() {
  const [wordBank, setWordBank] = useState<WordItem[]>(INITIAL_WORDS_LIST);
  const [slots, setSlots] = useState<(WordItem | null)[]>([null, null, null, null, null, null, null]);

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

      {/* Progress Bar with Label */}
      <Box sx={{ width: '100%', margin: '30px 0' }}>
        <Typography variant="body2" component="div" align="left" gutterBottom>
          {STAGE_NUMBER} / {TOTAL_STAGES}
        </Typography>
        <LinearProgress variant="determinate" value={PROGRESS} />
      </Box>

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
        <div className='words-container'>
          {wordBank.map((word) => (
            <Word key={word.id} word={word} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Stage2;
