import Link from "next/link";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.scss";

const ProductList = ({ products }) => {
  const productTypes = products.map((product) => {
    return product.type;
  });
  const uniqueArray = productTypes.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  console.log(products);
  return (
    <div className={classes.container}>
      <div className={classes.filterBar}>
        {uniqueArray.map((item, index) => (
          <li key={index}>
            <Link
              href={`/ready-to-wear/${item}`}
              className={classes.filterItem}
            >
              {item}
            </Link>
          </li>
        ))}
      </div>
      <div className={classes.listContainer}>
        <ul className={classes.list}>
          {products.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.imgUrl[0]}
              title={product.title}
              type={product.type}
              price={product.price}
              sizes={product.sizes}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
