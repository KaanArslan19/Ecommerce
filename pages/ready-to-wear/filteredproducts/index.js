import ProductList from "../../../../components/products/ProductList";
import { connectToDatabase } from "../../../../lib/db";
const FilteredProductsPage = ({ products, filters }) => {
  return (
    <div>
      <ProductList products={products} filters={filters} />
    </div>
  );
};

export async function getStaticProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const productList = db.collection("products");
  const products = await productList.find().toArray();
  const filteredProducts = products.filter((product) => {
    return filterHandler(filters, product.type);
  });
  client.close();

  return {
    props: {
      products: filteredProducts.map((product) => ({
        id: product._id.toString(),
        title: product.title,
        image: product.image,
        price: product.price,
        type: product.type,
      })),
    },
  };
}
export default FilteredProductsPage;
