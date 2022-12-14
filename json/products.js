import products from "./products.json";
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
  if (title === "random") {
    return products[Math.floor(Math.random() * products.length)];
  }
  return products.find((e) => e.slug === title);
};
