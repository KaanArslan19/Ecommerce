import { useRouter } from "next/router";

import classes from "./ProductItem.module.scss";
import Image from "next/image";
import Link from "next/link";
import { SlHeart } from "react-icons/sl";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useState } from "react";
import { urlFor } from "../../lib/client";
const ProductItem = (props) => {
  const [favItem, setFavItem] = useState(false);
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push("/product/" + props.id);
  };

  return (
    <li className={classes.container}>
      <Link href={`/product/${props.id}`}>
        <div className={classes.imgBox}>
          <Image
            src={urlFor(props.image).url()}
            alt={props.title}
            fill="true"
            style={{ objectFit: "contain" }}
            sizes="100vw"
          />
        </div>

        <div className={classes.content}>
          <h5>{props.title}</h5>
          <span>${props.price}</span>
          <div>
            {props.sizes.map((item, index) => (
              <span key={index} className={classes.sizeItem}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <button onClick={() => setFavItem(!favItem)}>
        {favItem ? (
          <BsFillBookmarkHeartFill className={classes.icons} />
        ) : (
          <SlHeart className={classes.icons} />
        )}
      </button>
    </li>
  );
};

export default ProductItem;
