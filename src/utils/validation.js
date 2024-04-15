export const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};

export const validIndianPhoneno = (number) => {
  const indianRegex = /^(?:\+91)?[6-9]\d{9}$/;
  return indianRegex.test(number);
};

export const validOTP = (otp) => {
  var otpRegex = /^\d{4}$/;
  return otpRegex.test(otp);
};

export const remainingWords = (abstract) => {
  const words = abstract.split(/\s+/);
  const currentWordCount = words.length;
  const remainingWords = 50 - currentWordCount;

  return remainingWords;
};

export const validNumberString = (numberString) => /^\d+$/.test(numberString);
