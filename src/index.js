// src/index.js - Complete Fixed Version
class PhoneValidator {
  constructor() {
    // Country calling codes and patterns
    this.countryCodes = {
      // North America
      'US': { code: '1', pattern: /^(\+?1)?[\s\-\.]?(\([0-9]{3}\)|[0-9]{3})[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/, length: 10, format: '+1 (XXX) XXX-XXXX' },
      'CA': { code: '1', pattern: /^(\+?1)?[\s\-\.]?(\([0-9]{3}\)|[0-9]{3})[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/, length: 10, format: '+1 (XXX) XXX-XXXX' },
      
      // Europe
      'UK': { code: '44', pattern: /^(\+?44)?[\s\-\.]?[0-9]{10,11}$/, length: 10, format: '+44 XXXX XXX XXX' },
      'DE': { code: '49', pattern: /^(\+?49)?[\s\-\.]?[0-9]{10,12}$/, length: 11, format: '+49 XXX XXXXXXXX' },
      'FR': { code: '33', pattern: /^(\+?33)?[\s\-\.]?[0-9]{9,10}$/, length: 10, format: '+33 X XX XX XX XX' },
      'IT': { code: '39', pattern: /^(\+?39)?[\s\-\.]?[0-9]{10,11}$/, length: 10, format: '+39 XXX XXX XXXX' },
      'ES': { code: '34', pattern: /^(\+?34)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+34 XXX XXX XXX' },
      'NL': { code: '31', pattern: /^(\+?31)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+31 X XXXX XXXX' },
      
      // Asia-Pacific
      'AU': { code: '61', pattern: /^(\+?61)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+61 XXX XXX XXX' },
      'IN': { code: '91', pattern: /^(\+?91)?[\s\-\.]?[0-9]{10}$/, length: 10, format: '+91 XXXXX XXXXX' },
      'CN': { code: '86', pattern: /^(\+?86)?[\s\-\.]?[0-9]{11}$/, length: 11, format: '+86 XXX XXXX XXXX' },
      'JP': { code: '81', pattern: /^(\+?81)?[\s\-\.]?[0-9]{10,11}$/, length: 11, format: '+81 XXX XXXX XXXX' },
      'KR': { code: '82', pattern: /^(\+?82)?[\s\-\.]?[0-9]{9,10}$/, length: 10, format: '+82 XX XXXX XXXX' },
      
      // Americas
      'BR': { code: '55', pattern: /^(\+?55)?[\s\-\.]?[0-9]{10,11}$/, length: 11, format: '+55 XX XXXXX-XXXX' },
      'MX': { code: '52', pattern: /^(\+?52)?[\s\-\.]?[0-9]{10}$/, length: 10, format: '+52 XXX XXX XXXX' },
      
      // West Africa - Fixed patterns for better validation
      'SL': { code: '232', pattern: /^(\+?232)?[\s\-\.]?[0-9]{8}$/, length: 8, format: '+232 XX XXX XXX' },
      'NG': { code: '234', pattern: /^(\+?234)?[\s\-\.]?[0-9]{10}$/, length: 10, format: '+234 XXX XXX XXXX' },
      'GH': { code: '233', pattern: /^(\+?233)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+233 XX XXX XXXX' },
      'LR': { code: '231', pattern: /^(\+?231)?[\s\-\.]?[0-9]{7,8}$/, length: 8, format: '+231 XX XXX XXX' },
      'GN': { code: '224', pattern: /^(\+?224)?[\s\-\.]?[0-9]{8,9}$/, length: 9, format: '+224 XXX XXX XXX' },
      'CI': { code: '225', pattern: /^(\+?225)?[\s\-\.]?[0-9]{8}$/, length: 8, format: '+225 XX XX XX XX' },
      'SN': { code: '221', pattern: /^(\+?221)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+221 XX XXX XX XX' },
      'ML': { code: '223', pattern: /^(\+?223)?[\s\-\.]?[0-9]{8}$/, length: 8, format: '+223 XX XX XX XX' },
      'BF': { code: '226', pattern: /^(\+?226)?[\s\-\.]?[0-9]{8}$/, length: 8, format: '+226 XX XX XX XX' },
      'GW': { code: '245', pattern: /^(\+?245)?[\s\-\.]?[0-9]{7}$/, length: 7, format: '+245 XXX XXXX' },
      
      // East Africa
      'KE': { code: '254', pattern: /^(\+?254)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+254 XXX XXX XXX' },
      'TZ': { code: '255', pattern: /^(\+?255)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+255 XXX XXX XXX' },
      'UG': { code: '256', pattern: /^(\+?256)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+256 XXX XXX XXX' },
      'RW': { code: '250', pattern: /^(\+?250)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+250 XXX XXX XXX' },
      'ET': { code: '251', pattern: /^(\+?251)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+251 XXX XXX XXX' },
      
      // Southern Africa
      'ZA': { code: '27', pattern: /^(\+?27)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+27 XX XXX XXXX' },
      'ZW': { code: '263', pattern: /^(\+?263)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+263 XX XXX XXXX' },
      'BW': { code: '267', pattern: /^(\+?267)?[\s\-\.]?[0-9]{8}$/, length: 8, format: '+267 XX XXX XXX' },
      'ZM': { code: '260', pattern: /^(\+?260)?[\s\-\.]?[0-9]{9}$/, length: 9, format: '+260 XX XXX XXXX' }
    };
  }

  /**
   * Clean phone number by removing all non-digit characters except +
   * @param {string} phone - Raw phone number
   * @returns {string} - Cleaned phone number
   */
  clean(phone) {
    if (!phone || typeof phone !== 'string') return '';
    return phone.replace(/[^\d+]/g, '');
  }

  /**
   * Detect country from phone number
   * @param {string} phone - Phone number
   * @returns {string|null} - Country code or null
   */
  detectCountry(phone) {
    const cleaned = this.clean(phone);
    
    // Check for international format
    if (cleaned.startsWith('+')) {
      for (const [country, data] of Object.entries(this.countryCodes)) {
        if (cleaned.startsWith(`+${data.code}`)) {
          const numberPart = cleaned.substring(`+${data.code}`.length);
          if (numberPart.length === data.length || 
              (country === 'UK' && numberPart.length >= 10 && numberPart.length <= 11) ||
              (country === 'DE' && numberPart.length >= 10 && numberPart.length <= 12) ||
              (country === 'BR' && numberPart.length >= 10 && numberPart.length <= 11)) {
            return country;
          }
        }
      }
    }
    
    // Check without + prefix for numbers that might have country code
    for (const [country, data] of Object.entries(this.countryCodes)) {
      if (cleaned.startsWith(data.code)) {
        const numberPart = cleaned.substring(data.code.length);
        if (numberPart.length === data.length || 
            (country === 'UK' && numberPart.length >= 10 && numberPart.length <= 11) ||
            (country === 'DE' && numberPart.length >= 10 && numberPart.length <= 12) ||
            (country === 'BR' && numberPart.length >= 10 && numberPart.length <= 11)) {
          return country;
        }
      }
    }
    
    return null;
  }

  /**
   * Validate phone number for specific country
   * @param {string} phone - Phone number
   * @param {string} country - Country code (optional)
   * @returns {object} - Validation result
   */
  validate(phone, country = null) {
    if (!phone) {
      return { valid: false, error: 'Phone number is required' };
    }

    const cleaned = this.clean(phone);
    
    // Auto-detect country if not provided
    if (!country) {
      country = this.detectCountry(phone);
      if (!country) {
        return { 
          valid: false, 
          error: 'Could not detect country. Please provide country code or use international format.' 
        };
      }
    }

    // Check if country is supported
    const countryKey = country.toUpperCase();
    if (!this.countryCodes[countryKey]) {
      return { 
        valid: false, 
        error: `Country ${country} is not supported` 
      };
    }

    const countryData = this.countryCodes[countryKey];
    
    // Extract just digits for length validation
    const digitsOnly = phone.replace(/[^\d]/g, '');
    
    let isValid = false;
    let normalizedNumber = '';
    
    // Determine if this looks like a valid number for the country
    if (digitsOnly.startsWith(countryData.code)) {
      // Has country code
      const numberPart = digitsOnly.substring(countryData.code.length);
      normalizedNumber = numberPart;
      
      if (countryKey === 'UK') {
        isValid = numberPart.length === 10 || numberPart.length === 11;
      } else if (countryKey === 'DE') {
        isValid = numberPart.length >= 10 && numberPart.length <= 12;
      } else if (countryKey === 'BR') {
        isValid = numberPart.length === 10 || numberPart.length === 11;
      } else if (countryKey === 'LR') {
        isValid = numberPart.length === 7 || numberPart.length === 8;
      } else if (countryKey === 'GN') {
        isValid = numberPart.length === 8 || numberPart.length === 9;
      } else {
        isValid = numberPart.length === countryData.length;
      }
    } else {
      // No country code, check if it's the right length for national number
      normalizedNumber = digitsOnly;
      
      // Handle leading zeros (remove them for validation)
      if (digitsOnly.startsWith('0') && digitsOnly.length > countryData.length) {
        normalizedNumber = digitsOnly.substring(1);
      }
      
      if (countryKey === 'UK') {
        isValid = normalizedNumber.length === 10 || normalizedNumber.length === 11;
      } else if (countryKey === 'DE') {
        isValid = normalizedNumber.length >= 10 && normalizedNumber.length <= 12;
      } else if (countryKey === 'BR') {
        isValid = normalizedNumber.length === 10 || normalizedNumber.length === 11;  
      } else if (countryKey === 'LR') {
        isValid = normalizedNumber.length === 7 || normalizedNumber.length === 8;
      } else if (countryKey === 'GN') {
        isValid = normalizedNumber.length === 8 || normalizedNumber.length === 9;
      } else {
        isValid = normalizedNumber.length === countryData.length;
      }
    }
    
    return {
      valid: isValid,
      country: countryKey,
      cleaned: cleaned,
      formatted: isValid ? this.format(phone, country) : null,
      nationalFormat: isValid ? this.formatNational(phone, country) : null,
      internationalFormat: isValid ? this.formatInternational(phone, country) : null,
      error: isValid ? null : 'Invalid phone number format'
    };
  }

  /**
   * Format phone number in international format
   * @param {string} phone - Phone number
   * @param {string} country - Country code
   * @returns {string} - Formatted phone number
   */
  formatInternational(phone, country) {
    if (!phone || !country) return phone || '';
    
    const cleaned = this.clean(phone);
    const countryKey = country.toUpperCase();
    const countryData = this.countryCodes[countryKey];
    
    if (!countryData) return phone;
    
    let digits = cleaned;
    
    // Remove country code if present
    if (digits.startsWith(`+${countryData.code}`)) {
      digits = digits.substring(`+${countryData.code}`.length);
    } else if (digits.startsWith(countryData.code)) {
      digits = digits.substring(countryData.code.length);
    }
    
    // Remove leading zero if present
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    
    // Format based on country
    switch (countryKey) {
    case 'US':
    case 'CA':
      if (digits.length === 10) {
        return `+${countryData.code} (${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
      }
      break;
    case 'UK':
      return `+${countryData.code} ${digits.slice(0,4)} ${digits.slice(4,7)} ${digits.slice(7)}`;
    case 'DE':
      return `+${countryData.code} ${digits.slice(0,3)} ${digits.slice(3)}`;
    case 'FR':
      if (digits.length === 9) {
        return `+${countryData.code} ${digits.slice(0,1)} ${digits.slice(1,3)} ${digits.slice(3,5)} ${digits.slice(5,7)} ${digits.slice(7)}`;
      }
      break;
    case 'IN':
      return `+${countryData.code} ${digits.slice(0,5)} ${digits.slice(5)}`;
    case 'BR':
      if (digits.length === 11) {
        return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,7)}-${digits.slice(7)}`;
      }
      break;
      
      // West Africa formatting
    case 'SL':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    case 'NG':
      return `+${countryData.code} ${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
    case 'GH':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    case 'LR':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    case 'GN':
      return `+${countryData.code} ${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
    case 'CI':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,4)} ${digits.slice(4,6)} ${digits.slice(6)}`;
    case 'SN':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5,7)} ${digits.slice(7)}`;
    case 'ML':
    case 'BF':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,4)} ${digits.slice(4,6)} ${digits.slice(6)}`;
    case 'GW':
      return `+${countryData.code} ${digits.slice(0,3)} ${digits.slice(3)}`;
        
      // East Africa formatting
    case 'KE':
    case 'TZ':
    case 'UG':
    case 'RW':
    case 'ET':
      return `+${countryData.code} ${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
        
      // Southern Africa formatting
    case 'ZA':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    case 'ZW':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    case 'BW':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    case 'ZM':
      return `+${countryData.code} ${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    default:
      return `+${countryData.code} ${digits}`;
    }
    
    return `+${countryData.code} ${digits}`;
  }

  /**
   * Format phone number in national format
   * @param {string} phone - Phone number
   * @param {string} country - Country code
   * @returns {string} - Formatted phone number
   */
  formatNational(phone, country) {
    if (!phone || !country) return phone || '';
    
    const cleaned = this.clean(phone);
    const countryKey = country.toUpperCase();
    const countryData = this.countryCodes[countryKey];
    
    if (!countryData) return phone;
    
    let digits = cleaned;
    
    // Remove country code and + if present
    if (digits.startsWith(`+${countryData.code}`)) {
      digits = digits.substring(`+${countryData.code}`.length);
    } else if (digits.startsWith(countryData.code)) {
      digits = digits.substring(countryData.code.length);
    }
    
    // Remove leading zero if present
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    
    // Format based on country
    switch (countryKey) {
    case 'US':
    case 'CA':
      if (digits.length === 10) {
        return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
      }
      break;
    case 'UK':
      return `0${digits.slice(0,4)} ${digits.slice(4,7)} ${digits.slice(7)}`;
    case 'DE':
      return `0${digits.slice(0,3)} ${digits.slice(3)}`;
    case 'FR':
      if (digits.length === 9) {
        return `0${digits.slice(0,1)} ${digits.slice(1,3)} ${digits.slice(3,5)} ${digits.slice(5,7)} ${digits.slice(7)}`;
      }
      break;
        
      // West Africa national formatting
    case 'SL':
      return `0${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    case 'NG':
      return `0${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
    case 'GH':
      return `0${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    case 'LR':
      return digits; // Liberia doesn't use leading 0 in national format
    case 'GN':
      return digits.slice(0,3) + ' ' + digits.slice(3,6) + ' ' + digits.slice(6);
    case 'CI':
      return `${digits.slice(0,2)} ${digits.slice(2,4)} ${digits.slice(4,6)} ${digits.slice(6)}`;
    case 'SN':
      return `${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5,7)} ${digits.slice(7)}`;
    case 'ML':
    case 'BF':
      return `${digits.slice(0,2)} ${digits.slice(2,4)} ${digits.slice(4,6)} ${digits.slice(6)}`;
    case 'GW':
      return digits.slice(0,3) + ' ' + digits.slice(3);
        
      // East/Southern Africa national formatting
    case 'KE':
    case 'TZ':
    case 'UG':
    case 'RW':
    case 'ET':
      return `0${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
    case 'ZA':
      return `0${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    case 'ZW':
    case 'BW':
    case 'ZM':
      return digits.slice(0,2) + ' ' + digits.slice(2,5) + ' ' + digits.slice(5);
    default:
      return digits;
    }
    
    return digits;
  }

  /**
   * Format phone number (alias for formatInternational)
   * @param {string} phone - Phone number
   * @param {string} country - Country code
   * @returns {string} - Formatted phone number
   */
  format(phone, country) {
    return this.formatInternational(phone, country);
  }

  /**
   * Get list of supported countries
   * @returns {array} - Array of supported country codes
   */
  getSupportedCountries() {
    return Object.keys(this.countryCodes).map(code => ({
      code,
      name: this.getCountryName(code),
      callingCode: this.countryCodes[code].code,
      format: this.countryCodes[code].format
    }));
  }

  /**
   * Get country name from code
   * @param {string} code - Country code
   * @returns {string} - Country name
   */
  getCountryName(code) {
    const names = {
      // North America
      'US': 'United States',
      'CA': 'Canada',
      
      // Europe
      'UK': 'United Kingdom',
      'DE': 'Germany',
      'FR': 'France',
      'IT': 'Italy',
      'ES': 'Spain',
      'NL': 'Netherlands',
      
      // Asia-Pacific
      'AU': 'Australia',
      'IN': 'India',
      'CN': 'China',
      'JP': 'Japan',
      'KR': 'South Korea',
      
      // Americas
      'BR': 'Brazil',
      'MX': 'Mexico',
      
      // West Africa
      'SL': 'Sierra Leone',
      'NG': 'Nigeria',
      'GH': 'Ghana',
      'LR': 'Liberia',
      'GN': 'Guinea',
      'CI': 'Côte d\'Ivoire',
      'SN': 'Senegal',
      'ML': 'Mali',
      'BF': 'Burkina Faso',
      'GW': 'Guinea-Bissau',
      
      // East Africa
      'KE': 'Kenya',
      'TZ': 'Tanzania',
      'UG': 'Uganda',
      'RW': 'Rwanda',
      'ET': 'Ethiopia',
      
      // Southern Africa
      'ZA': 'South Africa',
      'ZW': 'Zimbabwe',
      'BW': 'Botswana',
      'ZM': 'Zambia'
    };
    return names[code] || code;
  }

  /**
   * Batch validate multiple phone numbers
   * @param {array} phones - Array of phone numbers with optional country codes
   * @returns {array} - Array of validation results
   */
  validateBatch(phones) {
    return phones.map(item => {
      if (typeof item === 'string') {
        return this.validate(item);
      } else if (item && typeof item === 'object' && item.phone) {
        return this.validate(item.phone, item.country);
      } else {
        return { valid: false, error: 'Invalid input format' };
      }
    });
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhoneValidator;
} else if (typeof define === 'function' && define.amd) {
  define([], function() { return PhoneValidator; });
} else if (typeof window !== 'undefined') {
  window.PhoneValidator = PhoneValidator;
}


export default PhoneValidator;