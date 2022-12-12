import axios from "axios";

export const apiHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  withCredentials: true,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

if (typeof window !== "undefined") {
  window.axios = axios;
  window.apiHttp = apiHttp;
  window.urlToFile = async (Image) => {
    const response = await fetch(image);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    return file;
  };
}

export const tableCustomStyles = {
  cells: {
    style: {
      fontSize: "16px",
      paddingTop: "15px",
      paddingBottom: "15px",
    },
  },
  headCells: {
    style: {
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
  headRow: {
    style: {
      background: "#dfdfdf",
    },
  },
};

export const cls = (...classes) => {
  return classes.join(" ").trim();
};

// [].forEach(async (product) => {
// const formData = new FormData();
// formData.append("title", product.title);
// formData.append(
//   "writter",
//   product.author !== "user"
//     ? product.author
//     : product.writter
//     ? product.writter
//     : "غير معرف"
// );
// formData.append("publisher", product.publisher || "غير معرف");
// formData.append("vendor", product.vendor?.at(0) || "غير معرف");
// formData.append("quantity", 300);
// formData.append("price", Math.floor(Math.random() * 300 + 100));
// if (product.img) {
//   const file = await urlToFile(product.img);
//   formData.append("img", file);
// }
// apiHttp.post(`/v1/books`, formData);
// });
