import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { MouseEvent, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../style/Stage2Style.scss';
import Word from '../components/Word';
import victory from '../images/victory.avif';

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
  const [slots, setSlots] = useState<(WordItem | null)[]>([null]);
  const navigate = useNavigate();

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

  //pop-up
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    //dialogRef.current?.show();
  };
  const closeAndNextStage = () => {
    navigate('/stage2');

  };

  const closeAndCurrentStage = () => {
    dialogRef.current?.close();
    setSlots([null])
    setWordBank(INITIAL_WORDS_LIST)
  };


  const dialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName == "DIALOG") {
      close();
    }
  };


  return (
    <div className='page-stage2'>
      <div className='instructions'>
        <h1>להשלים את התלוש</h1>
        <p>בחרו מילה מתוך בנק המילים</p>
        <p>והתאימו אותם למיקום הנכון בתלוש השכר</p>
      </div>

      {/* progress Bar */}
      <Box sx={{ width: '100%', margin: '20px 0' }}>
        <Typography variant="body2" component="div" align="left" gutterBottom sx={{ fontWeight: 'bold', color: '#54177cf2' }}>
          {STAGE_NUMBER} / {TOTAL_STAGES}
        </Typography>
        <LinearProgress variant="determinate" value={PROGRESS}
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#54177cf2',
            },
            backgroundColor: '#d3c0e3f2', // background of the track
          }} />
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
                  <div className="word-container">{slot.value}</div>) :
                  (
                    ''
                  )}

              </div>
            );
          })}


        </div>
      </div>

      <div className="Words-bank-container">
        <p className='bank-title'>בנק מילים</p>
        <div className='words-container'>
          {wordBank.map((word) => (
            <Word key={word.id} word={word} />
          ))}
        </div>

      </div>
      {/*pop-up */}
      <dialog ref={dialogRef} onClick={dialogClick}>
        <div className="dialog-content">
          <div className="dialog-title">!אליפות</div>
          <p className="dialog-message">עברת את השלב</p>
          <img src={victory} alt="victory" className="victory-image" />
          <div className="buttons">
            <button className='nextStage-button' onClick={closeAndNextStage}>שלב הבא</button>
            <button className='currentStage-button' onClick={closeAndCurrentStage}>שחק שוב</button>
          </div>
        </div>

      </dialog>
      <button className="next-stage-button" onClick={open} disabled={slots.some((slot) => slot === null)}>שלב הבא</button>
    </div>
  );
}

export default Stage2;
