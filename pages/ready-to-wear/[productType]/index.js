import { client } from "../../../lib/client";

import ProductList from "../../../components/products/ProductList";

const ProductsPageByType = ({ products }) => {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPageByType;

export async function getStaticPaths() {
  const types = await client.fetch(`*[_type == "products"]{type}`);
  const paths = types.map((type) => ({
    params: { productType: type.type },
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
  const { productType } = params;
  const products = await client.fetch(
    `*[_type == "products" && type ==$type ]`,
    { type: productType }
  );

  return {
    props: {
      products,
    },

    revalidate: 1,
  };
}
