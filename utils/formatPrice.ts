const formatPrice = (price: number): string => {
  return `Rs: ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export default formatPrice;
