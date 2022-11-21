import products from "./products.json";

export const getPage = (page) => {
  return products.slice((page - 1) * 20, page * 20);
};

export const getAll = () => {
  return products;
};

export const getProduct = (title) => {
  return products.find((e) => e.titleEn === title);
};
