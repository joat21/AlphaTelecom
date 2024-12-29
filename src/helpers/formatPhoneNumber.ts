export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 11) return phone;

  return cleaned.replace(
    /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/,
    '+$1 ($2) $3-$4-$5'
  );
};
