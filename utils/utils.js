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

export const getWebsiteInfo = async () => {
  try {
    const res = await apiHttp.get(
      `${process.env.PHP_SERVER_URL}/api/admin/v1/settings`
    );
    return res.data.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};
