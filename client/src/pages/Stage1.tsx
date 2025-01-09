import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../style/stage1Style.css';
import Word from '../components/Word';
import employeeAndEmployerDetails from '../images/EmployeeAndEmployerDetails.png';
import payments from '../images/payments.png';
import mandatoryDeductions from '../images/mandatory deductions.png';
import additionalData from '../images/additional data.png';
import salary from '../images/salary.png';
import deductionsAllowed from '../images/deductions allowed.png';
import payment from '../images/payment.png';


const STAGE_NUMBER = 1
const TOTAL_STAGES = 3
const PROGRESS = (STAGE_NUMBER / TOTAL_STAGES) * 100;

type WordItem = {
  id: number;
  value: string;
};

const INITIAL_WORDS_LIST: WordItem[] = [
  { id: 1, value: 'פרטי עובד ומעביד' },
  { id: 2, value: 'תאריך' },
  { id: 3, value: 'לכבוד' },
  { id: 4, value: 'שם מלא עובד' },
  { id: 5, value: 'כתובת' },
  { id: 6, value: 'פרטים אישיים' },
  { id: 7, value: 'ת"ז עובד' },
];

function Stage1() {
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
    }
  };

  const handleNextStage = () => {
    navigate('/stage2'); // Navigate to the next stage
  };

  return (
    <div className='page-stage1'>
      <div className='instructions'>
        <h1 className='title'>השלימו את התלוש</h1>
        <p>בחרו מילה מתוך בנק המילים</p>
        <p>והתאימו אותם למיקום הנכון בתלוש השכר</p>
      </div>

      {/* progress bar */}
      <Box sx={{ width: '100%', margin: '30px 0' }}>
        <Typography variant="body2" component="div" align="left" gutterBottom>
          {STAGE_NUMBER} / {TOTAL_STAGES}
        </Typography>
        <LinearProgress variant="determinate" value={PROGRESS} />
      </Box>

      <div className="payslip-container">
        <div className="payslip-board">

          <img src={employeeAndEmployerDetails} alt="Employee and Employer Details" className="employee-details-image" />
          <img src={payments} alt="payments" className="payments-image" />
          <img src={mandatoryDeductions} alt="mandatoryDeductions" className="mandatoryDeductions-image" />
          <img src={additionalData} alt="additionalData" className="additionalData-image" />
          <img src={salary} alt="salary" className="salary-image" />
          <img src={deductionsAllowed} alt="deductionsAllowed" className="deductionsAllowed-image" />
          <img src={payment} alt="payment" className="payment-image" />



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

      <button className="next-stage-button" onClick={handleNextStage}>
        השלב הבא
      </button>
    </div>
  );
}

export default Stage1;
