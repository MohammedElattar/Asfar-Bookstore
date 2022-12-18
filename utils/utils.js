import axios from "axios";

export const apiHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export const defaultImg =
  "https://assets.asfar.io/uploads/2022/01/19092920/woocommerce-placeholder-300x300.png";

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

export const getWebsiteInfo = async () => {
  try {
    const res = await apiHttp.get(process.env.GET_WEBSITE_INFO);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getUser = async () => {
  try {
    const res = await apiHttp.get(
      `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/user`
    );
    return res.data.data;
  } catch (err) {
    console.log(err.message);
    return {};
  }
};
