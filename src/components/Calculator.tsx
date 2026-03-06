'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import styles from './Calculator.module.css';
import { calculate, formatDisplay } from '../lib/calculator';

interface CalculatorProps {
  onCalculation?: (expression: string, result: string) => void;
}

export default function Calculator({ onCalculation }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);

  const handleNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
      setJustCalculated(false);
    } else {
      if (justCalculated) {
        setDisplay(num);
        setExpression('');
        setJustCalculated(false);
      } else {
        setDisplay(prev => (prev === '0' ? num : prev.length >= 15 ? prev : prev + num));
      }
    }
  }, [waitingForOperand, justCalculated]);

  const handleOperator = useCallback((op: string) => {
    const current = display;

    if (operator && !waitingForOperand && !justCalculated) {
      const result = calculate(expression, operator, current, previousValue!);
      if (result === 'Error') {
        setDisplay('Error');
        setExpression('');
        setOperator(null);
        setPreviousValue(null);
        setWaitingForOperand(false);
        setJustCalculated(false);
        return;
      }
      setDisplay(result);
      setPreviousValue(result);
      const opSymbol = op === '*' ? '×' : op === '/' ? '÷' : op;
      setExpression(`${result} ${opSymbol}`);
    } else {
      setPreviousValue(current);
      const opSymbol = op === '*' ? '×' : op === '/' ? '÷' : op;
      setExpression(`${current} ${opSymbol}`);
    }

    setOperator(op);
    setWaitingForOperand(true);
    setJustCalculated(false);
  }, [display, expression, operator, previousValue, waitingForOperand, justCalculated]);

  const handleEquals = useCallback(async () => {
    if (!operator || previousValue === null) return;

    const current = display;
    const result = calculate(expression, operator, current, previousValue);
    const opSymbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
    const fullExpression = `${previousValue} ${opSymbol} ${current}`;

    setDisplay(result);
    setExpression(`${fullExpression} =`);
    setOperator(null);
    setPreviousValue(null);
    setWaitingForOperand(false);
    setJustCalculated(true);

    if (result !== 'Error' && onCalculation) {
      try {
        await onCalculation(fullExpression, result);
      } catch (e) {
        console.error('Failed to save calculation', e);
      }
    }
  }, [display, expression, operator, previousValue, onCalculation]);

  const handleClear = useCallback(() => {
    if (display !== '0' && !justCalculated) {
      setDisplay('0');
    } else {
      setDisplay('0');
      setExpression('');
      setOperator(null);
      setPreviousValue(null);
      setWaitingForOperand(false);
      setJustCalculated(false);
    }
  }, [display, justCalculated]);

  const handleToggleSign = useCallback(() => {
    setDisplay(prev => {
      if (prev === '0' || prev === 'Error') return prev;
      return prev.startsWith('-') ? prev.slice(1) : '-' + prev;
    });
  }, []);

  const handlePercent = useCallback(() => {
    setDisplay(prev => {
      const val = parseFloat(prev);
      if (isNaN(val)) return prev;
      return String(val / 100);
    });
  }, []);

  const handleDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  }, [display, waitingForOperand]);

  const handleBackspace = useCallback(() => {
    if (justCalculated || display === 'Error') {
      setDisplay('0');
      setExpression('');
      setOperator(null);
      setPreviousValue(null);
      setWaitingForOperand(false);
      setJustCalculated(false);
      return;
    }
    setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  }, [display, justCalculated]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
      else if (e.key === '+') handleOperator('+');
      else if (e.key === '-') handleOperator('-');
      else if (e.key === '*') handleOperator('*');
      else if (e.key === '/') { e.preventDefault(); handleOperator('/'); }
      else if (e.key === 'Enter' || e.key === '=') handleEquals();
      else if (e.key === 'Backspace') handleBackspace();
      else if (e.key === 'Escape') handleClear();
      else if (e.key === '.') handleDecimal();
      else if (e.key === '%') handlePercent();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumber, handleOperator, handleEquals, handleBackspace, handleClear, handleDecimal, handlePercent]);

  const hasValue = display !== '0';

  return (
    <div className={styles.calculator}>
      <Display expression={expression} value={formatDisplay(display)} />
      <ButtonGrid
        onNumber={handleNumber}
        onOperator={handleOperator}
        onEquals={handleEquals}
        onClear={handleClear}
        onToggleSign={handleToggleSign}
        onPercent={handlePercent}
        onDecimal={handleDecimal}
        onBackspace={handleBackspace}
        hasValue={hasValue}
      />
    </div>
  );
}
