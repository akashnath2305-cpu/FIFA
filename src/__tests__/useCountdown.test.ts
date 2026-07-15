import { renderHook, act } from '@testing-library/react';
import { useCountdown } from '../hooks/useCountdown';

describe('useCountdown Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with correct time', () => {
    const { result } = renderHook(() => useCountdown(1, 2, 3, 4));
    
    expect(result.current).toEqual({
      days: 1,
      hrs: 2,
      mins: 3,
      secs: 4
    });
  });

  it('should decrement seconds correctly', () => {
    const { result } = renderHook(() => useCountdown(0, 0, 0, 10));
    
    act(() => {
      jest.advanceTimersByTime(1000); // Advance 1 second
    });

    expect(result.current.secs).toBe(9);
  });

  it('should rollover seconds to 59 and decrement minutes', () => {
    const { result } = renderHook(() => useCountdown(0, 0, 1, 0));
    
    act(() => {
      jest.advanceTimersByTime(1000); // Advance 1 second
    });

    expect(result.current.mins).toBe(0);
    expect(result.current.secs).toBe(59);
  });

  it('should rollover hours and days correctly', () => {
    const { result } = renderHook(() => useCountdown(1, 0, 0, 0));
    
    act(() => {
      jest.advanceTimersByTime(1000); // Advance 1 second
    });

    expect(result.current.days).toBe(0);
    expect(result.current.hrs).toBe(23);
    expect(result.current.mins).toBe(59);
    expect(result.current.secs).toBe(59);
  });
});
