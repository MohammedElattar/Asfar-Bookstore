import { AwesomeButton } from "react-awesome-button";
import DataTable from "react-data-table-component";
import ImageZoom from "../../components/ImageZoom";
import global from "../../styles/pages/admin/global.module.scss";
import s from "../../styles/pages/admin/orders.module.scss";
import { useAdminContext } from "../../context/AdminContext";
import { apiHttp, cls, tableCustomStyles, defaultImg } from "../../utils/utils";
import { useState } from "react";
import Menu from "../../components/Admin/Menu";

import Loading from "../../components/Loading";

const makeClient = (order) => [
  { key: "الرمز", value: order.client_id },
  { key: "الاسم", value: order.client_name },
  { key: "الاسم الاول", value: order.first_name },
  { key: "الاسم الاخير", value: order.last_name },
  { key: "البريد", value: order.email },
  { key: "العنوان", value: order.address },
  { key: "المدينة", value: order.city },
];

const columns = [
  {
    name: "الرمز",
    selector: (order) => order.id,
  },
  {
    name: "الاسم",
    selector: (order) =>
      `${order.first_name} ${order.last_name} | ${order.client_name}`,
    wrap: true,
  },
  {
    name: "البريد",
    selector: (order) => order.email,
  },
  {
    name: "العميل",
    selector: (order) => (
      <AwesomeButton
        className="fs-5"
        onPress={() =>
          order.setCurrentClient({ active: true, data: makeClient(order) })
        }
      >
        ❔
      </AwesomeButton>
    ),
  },
  {
    name: "معلومات الطلب",
    selector: (order) => (
      <AwesomeButton
        className="fs-5"
        onPress={() => order.setCurrentInfo({ active: true, data: order })}
      >
        ❔
      </AwesomeButton>
    ),
  },

  {
    name: "الادوات",
    selector: (order) => {
      if (order.approved === "1") {
        return <p className={s.approved}>تم القبول</p>;
      }
      return (
        <div className="d-flex gap-1 flex-wrap">
          <AwesomeButton
            type="secondary"
            size="x-small"
            style={{ height: "35px", width: "100%" }}
            onPress={() => order.approveOrder(order)}
          >
            موافقة
          </AwesomeButton>
          <AwesomeButton
            type="secondary"
            size="x-small"
            style={{ height: "35px", width: "100%" }}
            className={global.deleteButton}
            onPress={() => order.rejectOrder(order)}
          >
            رفض
          </AwesomeButton>
        </div>
      );
    },
  },
];

export default function Orders() {
  const {
    data: { data: orders, meta: { total } = {} },
    setData,
  } = useAdminContext();
  const [currentClient, setCurrentClient] = useState({ active: false });
  const [currentInfo, setCurrentInfo] = useState({ active: false });

  const approveOrder = async (order) => {
    try {
      const res = await apiHttp.put(
        `${process.env.NEXT_PUBLIC_ADMIN_ORDERS}/${order.client_id}/${order.id}`
      );
      console.log(`Approve Order Response =>`, res);
      if (res.status === 200) {
        setData((prev) => ({
          ...prev,
          data: prev.data.map((e) =>
            e.id === order.id ? { ...e, approved: "1" } : e
          ),
        }));
      }
    } catch (err) {
      console.log(`Approve Order Error =>`, err);
    }
  };
  const rejectOrder = async (order) => {
    try {
      const res = await apiHttp.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_ORDERS}/${order.client_id}/${order.id}`
      );
      console.log(`Reject Order Response =>`, res);
      if (res.status === 200) {
        setData((prev) => ({
          ...prev,
          data: prev.data.filter((e) => e.id !== order.id),
        }));
      }
    } catch (err) {
      console.log(`Reject Order Error =>`, err);
    }
  };

  return (
    <>
      <div className={global.wrapper}>
        <DataTable
          columns={columns}
          pagination
          customStyles={tableCustomStyles}
          data={orders?.map((e) => ({
            ...e,
            setCurrentClient,
            setCurrentInfo,
            approveOrder,
            rejectOrder,
          }))}
          progressComponent={
            <div>
              <Loading size={60} borderWidth="5px" />
            </div>
          }
          paginationServer
          paginationTotalRows={total}
          noDataComponent={<h3>لا يوجد بيانات لعرضها</h3>}
        />
        <div
          className={cls(
            currentClient.active || currentInfo.active ? "active" : "",
            "overlay"
          )}
          onClick={() => {
            setCurrentClient((prev) => ({ ...prev, active: false }));
            setCurrentInfo((prev) => ({ ...prev, active: false }));
          }}
        />
        <ClientInfo {...{ currentClient, setCurrentClient }} />
        <OrderInfo {...{ currentInfo, setCurrentInfo }} />
      </div>
    </>
  );
}

function ClientInfo({ currentClient, setCurrentClient }) {
  return (
    <Menu
      title="معلومات العميل"
      className={cls(currentClient.active ? "active" : "")}
      onClose={() => setCurrentClient((prev) => ({ ...prev, active: false }))}
    >
      {currentClient?.data?.map((info) => (
        <p key={info.key} className="py-2 fs-5 d-flex justify-content-between">
          <span>{info.key}</span>
          <span>{info.value}</span>
        </p>
      ))}
    </Menu>
  );
}
function OrderInfo({ currentInfo, setCurrentInfo }) {
  const { id, details, more_info } = currentInfo.data || {};
  return (
    <Menu
      title="معلومات الطلب"
      className={cls(currentInfo.active ? "active" : "", s.orderInfo)}
      onClose={() => setCurrentInfo((prev) => ({ ...prev, active: false }))}
    >
      <p className="py-2 fs-5 d-flex justify-content-between">
        <span>الرمز</span>
        <span>{id}</span>
      </p>
      <ProductsTable products={currentInfo.data?.details} />
      <p className="py-2 fs-5 d-flex justify-content-between">
        <span>معلومات اضافية</span>
        <span>{more_info || "لا يوجد"}</span>
      </p>
    </Menu>
  );
}

function ProductsTable({ products }) {
  return (
    <table className={s.productsTable}>
      <thead>
        <tr>
          <td>الرمز</td>
          <td>الصورة</td>
          <td>العنوان</td>
          <td>السعر</td>
        </tr>
      </thead>
      <tbody>
        {products?.map(({ id, img, price, title }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>
              <ImageZoom src={img} alt={title} width="40" height="60" />
            </td>
            <td>{title}</td>
            <td>{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export async function getStaticProps() {
  const props = {
    admin: true,
    title: "الطلبات",
    url: process.env.NEXT_PUBLIC_ADMIN_ORDERS,
  };

  return {
    props: props,
  };
}
