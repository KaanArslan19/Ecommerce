import { Fragment } from "react";
import { client } from "../../../lib/client";

import ProductDetails from "../../../components/products/ProductDetails";
const ProductPage = ({ products }) => {
  return (
    <Fragment>
      <ProductDetails products={products} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const types = await client.fetch(`*[_type == "products"]{_id}`);
  const paths = types.map((id) => ({
    params: { productId: id._id },
  }));
  if (!paths) {
    return { notFound: true };
  }
  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps({ params }) {
  const { productId } = params;
  const products = await client.fetch(`*[_type == "products" && _id ==$id ]`, {
    id: productId,
  });

  return {
    props: {
      products,
    },

    revalidate: 1,
  };
}
export default ProductPage;
