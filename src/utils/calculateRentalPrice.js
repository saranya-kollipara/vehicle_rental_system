export const calculateRentalPrice = (pricePerDay, pickupDate, returnDate) => {
  const numericPrice = parseFloat(pricePerDay) || 0;
  
  if (!numericPrice || !pickupDate || !returnDate) {
    return {
      days: 0,
      rentalAmount: 0,
      taxAmount: 0,
      totalAmount: 0
    };
  }

  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  
  // Calculate difference in milliseconds
  const diffTime = Math.max(0, end.getTime() - start.getTime());
  // Convert to days (at least 1 day if dates are valid)
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const rentalAmount = numericPrice * diffDays;
  const taxAmount = Math.round(rentalAmount * 0.18 * 100) / 100; // 18% GST
  const totalAmount = rentalAmount + taxAmount;

  return {
    days: diffDays,
    rentalAmount,
    taxAmount,
    totalAmount
  };
};
