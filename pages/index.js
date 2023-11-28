import Head from "next/head";
import { Fragment, useEffect } from "react";
import ProductList from "../components/products/ProductList";
import { client } from "../lib/client";
import { useSelector } from "react-redux";
const HomePage = ({ products }) => {
  const cart = useSelector((state) => state.cart);
  let DATASET = "development";
  let QUERY = encodeURIComponent('*[_type == "carts"]');
  let URL = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-22/data/query/${DATASET}?query=${QUERY}`;

  useEffect(() => {
    try {
      fetch(URL, {
        method: "POST",
        body: JSON.stringify(cart),
      });
    } catch (error) {
      console.log("cannot connected");
    }
  }, [cart]);
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
