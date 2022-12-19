export default function Products() {}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/products/1",
      permenant: false,
    },
  };
}
