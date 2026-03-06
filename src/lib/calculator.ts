export function calculate(expression: string, operator: string, currentValue: string, previousValue: string): string {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) return currentValue;

  let result: number;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) return 'Error';
      result = prev / current;
      break;
    default:
      return currentValue;
  }

  // Handle floating point precision
  const rounded = parseFloat(result.toPrecision(12));
  return String(rounded);
}

export function formatDisplay(value: string): string {
  if (value === 'Error') return value;
  if (value === '') return '0';

  const num = parseFloat(value);
  if (isNaN(num)) return value;

  // If the value has a decimal point, preserve it
  if (value.includes('.')) {
    const parts = value.split('.');
    const intPart = parseInt(parts[0]).toLocaleString();
    return `${intPart}.${parts[1]}`;
  }

  return num.toLocaleString();
}

export function buildExpression(previousValue: string, operator: string, currentValue: string): string {
  const opSymbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
  return `${previousValue} ${opSymbol} ${currentValue}`;
}
