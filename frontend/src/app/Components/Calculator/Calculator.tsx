import { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value: string) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{input || '0'}</div>
      <div className={styles.buttonsGrid}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', 'C', '=', '+'].map((btn) => (
          <Button
            key={btn}
            onClick={() => handleClick(btn)}
            className={`${styles.calculatorButton} ${['/', '*', '-', '+', '='].includes(btn) ? styles.operatorButton : ''}`}
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  );
}
