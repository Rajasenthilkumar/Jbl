import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AntdCurrency from './AntdCurrency';

describe('AntdCurrency Component', () => {
  it('should render with default currency and handle value change', () => {
    const handleChange = vi.fn();
    const renderResult = render(
      <AntdCurrency
        onChange={handleChange}
        placeholder="Enter value"
        defaultCurrency="USD"
      />,
    );

    // Check if placeholder is set
    const input = renderResult.container.querySelector('#input-currency');
    expect(input).toBeTruthy();
    if (!input) {
      throw new Error('Input element not found');
    }

    // Simulate changing input value
    fireEvent.change(input, { target: { value: '123' } });
    expect(handleChange).toHaveBeenCalledWith('USD', '123');
  });
});
