export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
  return re.test(String(phone).replace(/[\s-]/g, ''));
};

export const validateLoginForm = (data) => {
  const errors = {};
  if (!data.email) {
    errors.email = 'Email address is required.';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.password) {
    errors.password = 'Password is required.';
  } else if (data.password.length < 4) {
    errors.password = 'Password must be at least 4 characters long.';
  }

  return errors;
};

export const validateRegisterForm = (data) => {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters.';
  }

  if (!data.email) {
    errors.email = 'Email address is required.';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.phone) {
    errors.phone = 'Phone number is required.';
  }

  if (!data.password) {
    errors.password = 'Password is required.';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};

export const validateBookingForm = (data) => {
  const errors = {};
  if (!data.customerName || data.customerName.trim().length < 2) {
    errors.customerName = 'Customer name is required.';
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Valid email is required.';
  }
  if (!data.phone) {
    errors.phone = 'Phone number is required.';
  }
  if (!data.pickupLocation) {
    errors.pickupLocation = 'Pickup location is required.';
  }
  if (!data.pickupDate) {
    errors.pickupDate = 'Pickup date is required.';
  }
  if (!data.returnDate) {
    errors.returnDate = 'Return date is required.';
  } else if (data.pickupDate && new Date(data.returnDate) < new Date(data.pickupDate)) {
    errors.returnDate = 'Return date cannot be earlier than pickup date.';
  }

  return errors;
};
