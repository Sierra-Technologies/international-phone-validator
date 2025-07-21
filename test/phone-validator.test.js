// tests/phone-validator.test.js
import PhoneValidator from '../src/index.js';

describe('PhoneValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new PhoneValidator();
  });

  describe('clean()', () => {
    test('should remove all non-digit characters except +', () => {
      expect(validator.clean('+1 (555) 123-4567')).toBe('+15551234567');
      expect(validator.clean('555.123.4567')).toBe('5551234567');
      expect(validator.clean('555 123 4567')).toBe('5551234567');
      expect(validator.clean('')).toBe('');
      expect(validator.clean(null)).toBe('');
    });
  });

  describe('detectCountry()', () => {
    test('should detect Sierra Leone numbers', () => {
      expect(validator.detectCountry('+232 25 123 456')).toBe('SL');
      expect(validator.detectCountry('+23225123456')).toBe('SL');
    });

    test('should detect Nigerian numbers', () => {
      expect(validator.detectCountry('+234 803 123 4567')).toBe('NG');
      expect(validator.detectCountry('+2348031234567')).toBe('NG');
    });

    test('should detect US numbers', () => {
      expect(validator.detectCountry('+1 555 123 4567')).toBe('US');
      expect(validator.detectCountry('+15551234567')).toBe('US');
    });

    test('should detect UK numbers', () => {
      expect(validator.detectCountry('+44 7700 900123')).toBe('UK');
      expect(validator.detectCountry('+447700900123')).toBe('UK');
    });

    test('should detect German numbers', () => {
      expect(validator.detectCountry('+49 30 12345678')).toBe('DE');
      expect(validator.detectCountry('+493012345678')).toBe('DE');
    });

    test('should return null for unknown formats', () => {
      expect(validator.detectCountry('123456')).toBe(null);
      expect(validator.detectCountry('555-1234')).toBe(null);
    });
  });

  describe('validate()', () => {
    test('should validate Sierra Leone phone numbers', () => {
      const result = validator.validate('+232 25 123 456', 'SL');
      expect(result.valid).toBe(true);
      expect(result.country).toBe('SL');
      expect(result.formatted).toBe('+232 25 123 456');
    });

    test('should validate Nigerian phone numbers', () => {
      const result = validator.validate('+234 803 123 4567', 'NG');
      expect(result.valid).toBe(true);
      expect(result.country).toBe('NG');
    });

    test('should validate Ghanaian phone numbers', () => {
      const result = validator.validate('+233 24 123 4567', 'GH');
      expect(result.valid).toBe(true);
      expect(result.country).toBe('GH');
    });

    test('should validate US phone numbers', () => {
      const result = validator.validate('+1 (555) 123-4567', 'US');
      expect(result.valid).toBe(true);
      expect(result.country).toBe('US');
      expect(result.formatted).toBe('+1 (555) 123-4567');
    });

    test('should validate UK phone numbers', () => {
      const result = validator.validate('+44 7700 900123', 'UK');
      expect(result.valid).toBe(true);
      expect(result.country).toBe('UK');
    });

    test('should auto-detect country when not provided', () => {
      const result1 = validator.validate('+232 25 123 456');
      expect(result1.valid).toBe(true);
      expect(result1.country).toBe('SL');
      
      const result2 = validator.validate('+1 555 123 4567');
      expect(result2.valid).toBe(true);
      expect(result2.country).toBe('US');
    });

    test('should return error for invalid numbers', () => {
      const result1 = validator.validate('123', 'US');
      expect(result1.valid).toBe(false);
      expect(result1.error).toBeTruthy();
      
      const result2 = validator.validate('123', 'SL');
      expect(result2.valid).toBe(false);
      expect(result2.error).toBeTruthy();
    });

    test('should return error for empty input', () => {
      const result = validator.validate('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Phone number is required');
    });

    test('should return error for unsupported country', () => {
      const result = validator.validate('123456789', 'XX');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('not supported');
    });
  });

  describe('formatInternational()', () => {
    test('should format Sierra Leone numbers internationally', () => {
      expect(validator.formatInternational('25123456', 'SL')).toBe('+232 25 123 456');
      expect(validator.formatInternational('+232 25 123 456', 'SL')).toBe('+232 25 123 456');
    });

    test('should format Nigerian numbers internationally', () => {
      const formatted = validator.formatInternational('+234 803 123 4567', 'NG');
      expect(formatted).toBe('+234 803 123 4567');
    });

    test('should format US numbers internationally', () => {
      expect(validator.formatInternational('5551234567', 'US')).toBe('+1 (555) 123-4567');
      expect(validator.formatInternational('+1 555 123 4567', 'US')).toBe('+1 (555) 123-4567');
    });

    test('should format UK numbers internationally', () => {
      const formatted = validator.formatInternational('+44 7700 900123', 'UK');
      expect(formatted).toMatch(/^\+44 \d{4} \d{3} \d{3}$/);
    });

    test('should format German numbers internationally', () => {
      const formatted = validator.formatInternational('+49 30 12345678', 'DE');
      expect(formatted).toBe('+49 301 2345678');
    });
  });

  describe('formatNational()', () => {
    test('should format Sierra Leone numbers nationally', () => {
      expect(validator.formatNational('+232 25 123 456', 'SL')).toBe('025 123 456');
      expect(validator.formatNational('25123456', 'SL')).toBe('025 123 456');
    });

    test('should format Nigerian numbers nationally', () => {
      const formatted = validator.formatNational('+234 803 123 4567', 'NG');
      expect(formatted).toBe('0803 123 4567');
    });

    test('should format US numbers nationally', () => {
      expect(validator.formatNational('+1 555 123 4567', 'US')).toBe('(555) 123-4567');
      expect(validator.formatNational('5551234567', 'US')).toBe('(555) 123-4567');
    });

    test('should format UK numbers nationally', () => {
      const formatted = validator.formatNational('+44 7700 900123', 'UK');
      expect(formatted).toMatch(/^0\d{4} \d{3} \d{3}$/);
    });

    test('should format German numbers nationally', () => {
      const formatted = validator.formatNational('+49 30 12345678', 'DE');
      expect(formatted).toBe('0301 2345678');
    });
  });

  describe('getSupportedCountries()', () => {
    test('should return array of supported countries', () => {
      const countries = validator.getSupportedCountries();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
      
      const slCountry = countries.find(c => c.code === 'SL');
      expect(slCountry).toBeDefined();
      expect(slCountry.name).toBe('Sierra Leone');
      expect(slCountry.callingCode).toBe('232');
      expect(slCountry.format).toBeTruthy();
      
      const usCountry = countries.find(c => c.code === 'US');
      expect(usCountry).toBeDefined();
      expect(usCountry.name).toBe('United States');
      expect(usCountry.callingCode).toBe('1');
      expect(usCountry.format).toBeTruthy();
    });
  });

  describe('validateBatch()', () => {
    test('should validate array of phone numbers', () => {
      const phones = [
        '+232 25 123 456',    // Sierra Leone
        '+1 555 123 4567',    // US
        { phone: '+44 7700 900123', country: 'UK' },
        { phone: '+234 803 123 4567', country: 'NG' }, // Nigeria
        'invalid',
        '+49 30 12345678'
      ];

      const results = validator.validateBatch(phones);
      expect(results).toHaveLength(6);
      expect(results[0].valid).toBe(true);
      expect(results[0].country).toBe('SL');
      expect(results[1].valid).toBe(true);
      expect(results[1].country).toBe('US');
      expect(results[2].valid).toBe(true);
      expect(results[2].country).toBe('UK');
      expect(results[3].valid).toBe(true);
      expect(results[3].country).toBe('NG');
      expect(results[4].valid).toBe(false);
      expect(results[5].valid).toBe(true);
    });

    test('should handle invalid input formats', () => {
      const phones = [null, undefined, 123, {}];
      const results = validator.validateBatch(phones);
      
      results.forEach(result => {
        expect(result.valid).toBe(false);
      });
    });
  });

  describe('Edge cases', () => {
    test('should handle Sierra Leone numbers with different separators', () => {
      const formats = [
        '25123456',        // Just the number
        '025 123 456',     // National with leading 0
        '25-123-456',      // With dashes
        '25.123.456',      // With dots  
        '25 123 456',      // With spaces
        '025/123/456'      // With slashes
      ];

      formats.forEach(format => {
        const result = validator.validate(format, 'SL');
        if (!result.valid) {
          console.log(`Failed format: "${format}" - Error: ${result.error}`);
        }
        expect(result.valid).toBe(true);
      });
    });

    test('should handle US numbers with different separators', () => {
      const formats = [
        '555-123-4567',
        '555.123.4567',
        '555 123 4567',
        '(555) 123-4567',
        '555/123/4567'
      ];

      formats.forEach(format => {
        const result = validator.validate(format, 'US');
        expect(result.valid).toBe(true);
      });
    });

    test('should handle numbers with country codes in different formats', () => {
      const formats = [
        '+1 555 123 4567',
        '1 555 123 4567',
        '15551234567'
      ];

      formats.forEach(format => {
        const country = validator.detectCountry(format);
        expect(country).toBe('US');
      });
    });
  });

  describe('Performance', () => {
    test('should handle large batch validation efficiently', () => {
      const phones = Array(1000).fill('+1 555 123 4567');
      
      const start = Date.now();
      const results = validator.validateBatch(phones);
      const duration = Date.now() - start;

      expect(results).toHaveLength(1000);
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
      expect(results.every(r => r.valid)).toBe(true);
    });
  });
});