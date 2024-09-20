import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className={styles.calculatorWrapper}>
      <Card className={styles.calculator}>
        <CardContent>
          <input
            className={styles.display}
            type="text"
            value={input}
            readOnly
          />
          <div className={styles.buttonsGrid}>
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', 'C', '=', '+'].map((btn) => (
              <Button key={btn} onClick={() => handleClick(btn)} variant="outline" className={styles.button}>
                {btn}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
