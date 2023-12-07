import ProductList from "../../components/products/ProductList";
import { client } from "../../lib/client";
const ProductsPage = ({ products }) => {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export async function getStaticProps() {
  const products = await client.fetch(`*[_type == "products"]`);

  return {
    props: {
      products,
    },

    revalidate: 1,
  };
}

export default ProductsPage;
