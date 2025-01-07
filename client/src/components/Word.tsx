import { useDrag } from 'react-dnd';
import '../style/wordStyle.css';

type WordProps = {
  word: {
    id: number;
    value: string;
  };
};

function Word({ word }: WordProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WORD', // Match the type in Stage1.tsx
    item: { id: word.id, value: word.value }, // Pass both id and value
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="word-container"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: isDragging ? '1px solid purple' : 'none',
      }}
    >
      <p>{word.value}</p>
    </div>
  );
}

export default Word;
