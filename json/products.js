import products from "./products.json";
import writters from "./writters";
import publishers from "./publishers";
import categories from "./categories";
export const getPage = (page) => {
  return products.slice((page - 1) * 20, page * 20);
};

export const getAll = () => {
  return products;
};

export const getPagesPaths = () => {
  const paths = [];
  for (let i = 0; i < 50; i++) {
    paths.push({ params: { pageNumber: `${i + 1}` } });
  }
  return paths;
};

export const getProduct = (title) => {
  return products.find((e) => e.titleEn === title);
};

export const getWritters = () => {
  return writters;
};
export const getCategories = () => {
  return categories;
};
export const getPublishers = () => {
  return publishers;
};
