import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import styles from './Calculator.module.css'; // This is a CSS module

export default function Calculator() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleClick = (value: string) => {
    if (value === 'C') {
      setInput('');
      setError(false);
    } else if (value === '=') {
      try {
        setInput(eval(input).toString()); // Replace eval if needed
      } catch {
        setInput('Error');
        setError(true);
      }
    } else if (!error) {
      setInput(input + value);
    }
  };

  return (
    <div className={styles.calculatorWrapper}>
      <Card className={styles.calculator}>
        <CardContent>
          <input
            className={`${styles.calculatorDisplay} ${error ? styles.error : ''}`}
            type="text"
            value={input}
            readOnly
          />
          <div className={styles.buttonsGrid}>
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', 'C', '=', '+'].map((btn) => (
              <Button
                key={btn}
                onClick={() => handleClick(btn)}
                variant="outline"
                className={styles.calculatorButton}
                disabled={error && !['C'].includes(btn)} // Disable buttons during error except clear
              >
                {btn}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
