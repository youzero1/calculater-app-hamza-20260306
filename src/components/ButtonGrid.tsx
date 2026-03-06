'use client';

import React from 'react';
import Button from './Button';
import styles from './ButtonGrid.module.css';

interface ButtonGridProps {
  onNumber: (num: string) => void;
  onOperator: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onToggleSign: () => void;
  onPercent: () => void;
  onDecimal: () => void;
  onBackspace: () => void;
  hasValue: boolean;
}

export default function ButtonGrid({
  onNumber,
  onOperator,
  onEquals,
  onClear,
  onToggleSign,
  onPercent,
  onDecimal,
  onBackspace,
  hasValue,
}: ButtonGridProps) {
  return (
    <div className={styles.grid}>
      {/* Row 1 */}
      <Button label={hasValue ? 'C' : 'AC'} onClick={onClear} variant="function" />
      <Button label="+/-" onClick={onToggleSign} variant="function" />
      <Button label="%" onClick={onPercent} variant="function" />
      <Button label="÷" onClick={() => onOperator('/')} variant="operator" />

      {/* Row 2 */}
      <Button label="7" onClick={() => onNumber('7')} />
      <Button label="8" onClick={() => onNumber('8')} />
      <Button label="9" onClick={() => onNumber('9')} />
      <Button label="×" onClick={() => onOperator('*')} variant="operator" />

      {/* Row 3 */}
      <Button label="4" onClick={() => onNumber('4')} />
      <Button label="5" onClick={() => onNumber('5')} />
      <Button label="6" onClick={() => onNumber('6')} />
      <Button label="-" onClick={() => onOperator('-')} variant="operator" />

      {/* Row 4 */}
      <Button label="1" onClick={() => onNumber('1')} />
      <Button label="2" onClick={() => onNumber('2')} />
      <Button label="3" onClick={() => onNumber('3')} />
      <Button label="+" onClick={() => onOperator('+')} variant="operator" />

      {/* Row 5 */}
      <Button label="0" onClick={() => onNumber('0')} variant="zero" />
      <Button label="." onClick={onDecimal} />
      <Button label="=" onClick={onEquals} variant="equals" />
    </div>
  );
}
