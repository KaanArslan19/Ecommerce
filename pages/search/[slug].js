import { Fragment } from "react";
import ProductList from "../../components/products/ProductList";
import { client } from "../../lib/client";

const SearchPage = ({ filteredProducts }) => {
  return (
    <Fragment>
      <ProductList products={filteredProducts} />
    </Fragment>
  );
};
const findProduct = (input, data) => {
  input = input.toLowerCase().replace(/\s/g, "");
  data = data.toLowerCase();
  let matched = 0;
  let mismatched = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === data[i]) {
      matched++;
    } else {
      mismatched++;
    }
  }
  if (matched > mismatched) {
    return true;
  } else {
    return false;
  }
};

export async function getStaticPaths() {
  const types = await client.fetch(`*[_type == "products"]{type, title}`);

  const paths = types.map((type) => ({
    params: { slug: type.type || type.title },
  }));
  if (!paths) {
    return { notFound: true };
  }
  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps(context) {
  const enteredInputValue = context.params.slug;
  const products = await client.fetch(`*[_type == "products"] `);
  const filteredProducts = products.filter((product) => {
    return (
      findProduct(enteredInputValue, product.title) ||
      findProduct(enteredInputValue, product.type)
    );
  });

  return {
    props: {
      filteredProducts,
    },
  };
}
export default SearchPage;
