/** Exercise 01 - Coins * */

// Add your function here
const calculateChange = function calculateChange(amount) {
  if (!Number.isFinite(amount) || amount < 0) {
    return `$${amount} ==> Error: invalid amount`;
  }
  if (amount > 100) {
    return `$${amount} ==> Error: the number is too large`;
  }

  const coins = [
    { value: 100, singular: 'dollar', plural: 'dollars' },
    { value: 25, singular: 'quarter', plural: 'quarters' },
    { value: 10, singular: 'dime', plural: 'dimes' },
    { value: 5, singular: 'nickel', plural: 'nickels' },
    { value: 1, singular: 'penny', plural: 'pennies' },
  ];
  const result = [];
  let cents = Math.round(amount * 100);

  coins.forEach((coin) => {
    const count = Math.floor(cents / coin.value);
    cents %= coin.value;
    if (count > 0) {
      const name = count === 1 ? coin.singular : coin.plural;
      result.push(`${count} ${name}`);
    }
  });

  return `$${amount} ==> ${result.length > 0 ? result.join(', ') : '0 pennies'}`;
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Additional test cases

// verifies the fallback output
console.log(calculateChange(0));
// $0 ==> 0 pennies

// verifies singular naming
console.log(calculateChange(0.01));
// $0.01 ==> 1 penny

// verifies correct coin distribution
console.log(calculateChange(0.99));
// $0.99 ==> 3 quarters, 2 dimes, 4 pennies

// verifies no unnecessary smaller denominations
console.log(calculateChange(1));
// $1 ==> 1 dollar

// verifies input validation
console.log(calculateChange(-1));
// $-1 ==> Error: invalid amount

// verifies the upper boundary
console.log(calculateChange(100));
// $100 ==> 100 dollars
