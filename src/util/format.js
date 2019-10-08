// format is a function of Intl.NumberFormat(), you can use it by adding a .format
// in the end, or desestruct it to {} before the equal.
// It was used ad desestructed function and renomed to formatPrice

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
