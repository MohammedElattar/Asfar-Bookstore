import products from "./products.json";

export const getPage = (page) => {
  // const books = products.filter(
  //   (e) => e.index >= (page - 1) * 20 && e.index < page * 20
  // );
  return products.slice((page - 1) * 20, page * 20);
};

export const getAll = () => {
  return products;
};
