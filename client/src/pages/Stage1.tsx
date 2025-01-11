import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useRef, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../style/stage1Style.scss';
import Word from '../components/Word';
import employeeAndEmployerDetails from '../images/EmployeeAndEmployerDetails.png';
import payments from '../images/payments.png';
import mandatoryDeductions from '../images/mandatory deductions.png';
import additionalData from '../images/additional data.png';
import salary from '../images/salary.png';
import deductionsAllowed from '../images/deductions allowed.png';
import payment from '../images/payment.png';
import victory from '../images/victory.avif';


const STAGE_NUMBER = 1
const TOTAL_STAGES = 3
const PROGRESS = (STAGE_NUMBER / TOTAL_STAGES) * 100;

type WordItem = {
  id: number;
  value: string;
};

const INITIAL_WORDS_LIST: WordItem[] = [
  { id: 1, value: 'פרטי עובד ומעביד' },
  { id: 2, value: 'נתונים נוספים' },
  { id: 3, value: 'ניכויים (חובה)' },
  { id: 4, value: 'תשלומים (שכר והחזרי הוצאות)' },
  { id: 5, value: 'התשלום' },
  { id: 6, value: 'ניכויים (רשות)' },
];

function Stage1() {
  const [wordBank, setWordBank] = useState<WordItem[]>(INITIAL_WORDS_LIST);
  const [slots, setSlots] = useState<(WordItem | null)[]>([null, null, null, null, null, null]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slots.some((slot) => slot === null)) {
      open();
    }
  }, [slots]);

  const createDrop = (index: number) =>
    useDrop<{ id: number; value: string }, void, { isOver: boolean }>
      ({
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
    }
  };

  //pop-up
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialogRef.current?.showModal();

  };
  const closeAndNextStage = () => {
    navigate('/stage2');

  };

  const closeAndCurrentStage = () => {
    dialogRef.current?.close();
    setSlots([null, null, null, null, null, null]);
    setWordBank(INITIAL_WORDS_LIST)
  };


  const dialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName == "DIALOG") {
      close();
    }
  };

  return (
    <div className='page-stage1'>
      <div className='start'>
        <div>
          <h1 className='title'>להשלים את התלוש</h1>
          <p className='instructions'>בחרו מילה מתוך בנק המילים</p>
          <p className='instructions'>והתאימו אותם למיקום הנכון בתלוש השכר</p>
        </div>

        {/* progress bar */}
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
      </div>
      
      <div className="payslip-container">
        <div className="payslip-board">
          {/*images of payslip */}
          <img src={employeeAndEmployerDetails} alt="Employee and Employer Details" className="employee-details-image" />
          <img src={payments} alt="payments" className="payments-image" />
          <img src={mandatoryDeductions} alt="mandatoryDeductions" className="mandatoryDeductions-image" />
          <img src={additionalData} alt="additionalData" className="additionalData-image" />
          <img src={salary} alt="salary" className="salary-image" />
          <img src={deductionsAllowed} alt="deductionsAllowed" className="deductionsAllowed-image" />
          <img src={payment} alt="payment" className="payment-image" />

          {/*areas to drop the suitable words */}
          {slots.map((slot, index) => {
            const [{ isOver }, dropRef] = createDrop(index);
            return (
              <div key={index} ref={dropRef} className={`payslip-slot slot-${index}`} >
                {slot ? (<div className="word-container">{slot.value}</div>) : ('')}
              </div>
            );
          })}

        </div>
      </div>

      {/*words bank */}
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

    </div>
  );
}

export default Stage1;
