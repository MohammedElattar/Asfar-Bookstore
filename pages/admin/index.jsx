export default function Admin() {}

export async function getStaticProps() {
  return {
    redirect: {
      destination: "/admin/dashboard",
      permenant: false,
    },
  };
}
