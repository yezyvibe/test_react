export const comma = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
