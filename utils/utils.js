import axios from "axios";

export const apiHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

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
