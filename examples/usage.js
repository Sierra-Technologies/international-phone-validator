// examples/usage.js
import PhoneValidator from '../src/index.js';

const validator = new PhoneValidator();

console.log('=== Phone Number Validator Examples ===\n');

// Example 1: Basic validation
console.log('1. Basic Validation:');
const result1 = validator.validate('+232 25 123 456', 'SL');
console.log('Input: +232 25 123 456 (Sierra Leone)');
console.log('Valid:', result1.valid);
console.log('Country:', result1.country);
console.log('Formatted:', result1.formatted);
console.log('National:', result1.nationalFormat);
console.log();log('Valid:', result1.valid);
console.log('Country:', result1.country);
console.log('Formatted:', result1.formatted);
console.log('National:', result1.nationalFormat);
console.log();

// Example 2: Auto country detection
console.log('2. Auto Country Detection:');
const numbers = [
  '+232 25 123 456',    // Sierra Leone
  '+234 803 123 4567',  // Nigeria
  '+233 24 123 4567',   // Ghana
  '+1 555 123 4567',    // US
  '+44 7700 900123',    // UK
  '+49 30 12345678'     // Germany
];

numbers.forEach(number => {
  const result = validator.validate(number);
  const countryName = validator.getCountryName(result.country);
  console.log(`${number} -> ${countryName} (${result.valid ? 'Valid' : 'Invalid'})`);
});
console.log();

// Example 3: Different input formats (Sierra Leone)
console.log('3. Different Input Formats (Sierra Leone):');
const formats = [
  '25123456',
  '025 123 456',
  '025-123-456',
  '+232 25 123 456',
  '23225123456'
];

formats.forEach(format => {
  const result = validator.validate(format, 'SL');
  console.log(`${format.padEnd(20)} -> ${result.valid ? result.formatted : 'Invalid'}`);
});
console.log();

// Example 4: Invalid numbers
console.log('4. Invalid Numbers:');
const invalidNumbers = [
  { phone: '123', country: 'US' },
  { phone: 'abc-def-ghij', country: 'US' },
  { phone: '+999 123 456 789', country: null },
  { phone: '', country: 'US' }
];

invalidNumbers.forEach(({ phone, country }) => {
  const result = validator.validate(phone, country);
  console.log(`"${phone}" -> ${result.error}`);
});
console.log();

// Example 5: Batch validation
console.log('5. Batch Validation:');
const batchNumbers = [
  '+232 25 123 456',    // Sierra Leone
  { phone: '+234 803 123 4567', country: 'NG' }, // Nigeria
  '+233 24 123 4567',   // Ghana
  '555-123-4567',       // Will fail without country
  '+44 7700 900123'     // UK
];

const batchResults = validator.validateBatch(batchNumbers);
batchResults.forEach((result, index) => {
  const input = typeof batchNumbers[index] === 'string' 
    ? batchNumbers[index] 
    : `${batchNumbers[index].phone} (${batchNumbers[index].country})`;
  
  const countryName = result.country ? validator.getCountryName(result.country) : 'Unknown';
  console.log(`${input} -> ${result.valid ? 'Valid' : 'Invalid'} ${countryName}`);
});
console.log();

// Example 6: Supported countries
console.log('6. Supported Countries:');
const countries = validator.getSupportedCountries();
console.log(`Total supported countries: ${countries.length}`);
countries.slice(0, 5).forEach(country => {
  console.log(`${country.name} (${country.code}): +${country.callingCode} - ${country.format}`);
});
console.log('...');
console.log();

// Example 7: Performance test
console.log('7. Performance Test:');
const testNumbers = Array(1000).fill('+1 555 123 4567');

const start = Date.now();
const perfResults = validator.validateBatch(testNumbers);
const duration = Date.now() - start;

console.log(`Validated ${testNumbers.length} numbers in ${duration}ms`);
console.log(`Average: ${(duration / testNumbers.length).toFixed(3)}ms per number`);
console.log(`Valid numbers: ${perfResults.filter(r => r.valid).length}`);
console.log();

// Example 8: Real-world scenarios
console.log('8. Real-world Scenarios:');

// Customer registration form
function validateCustomerPhone(phone, country) {
  const result = validator.validate(phone, country);
  
  if (result.valid) {
    const countryName = validator.getCountryName(result.country);
    console.log(`✅ Phone registered: ${result.internationalFormat} (${countryName})`);
    return { success: true, phone: result.internationalFormat };
  } else {
    console.log(`❌ Invalid phone: ${result.error}`);
    return { success: false, error: result.error };
  }
}

const customerPhones = [
  { phone: '025 123 456', country: 'SL' },      // Sierra Leone
  { phone: '0803 123 4567', country: 'NG' },    // Nigeria
  { phone: '024 123 4567', country: 'GH' },     // Ghana
  { phone: '(555) 123-4567', country: 'US' },   // US
  { phone: '123', country: 'SL' }               // Invalid Sierra Leone
];

customerPhones.forEach(({ phone, country }) => {
  const countryName = validator.getCountryName(country);
  console.log(`Customer phone: "${phone}" (${countryName})`);
  validateCustomerPhone(phone, country);
  console.log();
});

console.log('=== Examples completed ===');