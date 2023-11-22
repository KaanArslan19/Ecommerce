import Head from "next/head";
import { Fragment } from "react";
import ProductList from "../components/products/ProductList";
import { client } from "../lib/client";

const HomePage = ({ products }) => {
  return (
    <Fragment>
      <Head>
        <title>BrandName</title>
        <meta name="HomePage" content="Main Content" />
      </Head>
      <ProductList products={products} />
    </Fragment>
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

export default HomePage;
