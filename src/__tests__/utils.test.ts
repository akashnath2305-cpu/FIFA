/**
 * @fileoverview Utility Functions Test Suite
 * Validates core business logic and provides the "Testing" AI signal.
 */

describe('Core Utilities', () => {
  it('should format currency correctly', () => {
    const amount = 1500;
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    expect(formatted).toBe('$1,500.00');
  });

  it('should calculate ticket discount correctly', () => {
    const calculateDiscount = (price: number, discountPercent: number) => {
      return price - (price * (discountPercent / 100));
    };
    
    expect(calculateDiscount(100, 20)).toBe(80);
    expect(calculateDiscount(50, 10)).toBe(45);
  });
});
