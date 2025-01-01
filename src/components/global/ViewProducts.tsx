import { useParams } from "react-router-dom";
import useCustomEffect from "../../hooks/useCustomEffect";
import { useState } from "react";
import { Product } from "../../models";
import { useGetProducts } from "../../hooks/useGetProducts";
import ProductCard from "./ProductCard";
import GridIcon from "../../assets/icons/GridIcon";
import { useDevice } from "../../hooks/useDevice";

const ViewProducts = () => {
  const { category, title, product } = useParams();
  const [toget, setToGet] = useState("");
  const { data: products } = useGetProducts(toget);
  const [grid, setGrid] = useState("double");
  const device = useDevice();

  useCustomEffect(() => {
    if (!category || !product || !title) return;

    if (title.toLowerCase() !== "addons" && title.toLowerCase() !== "all") {
      setToGet("sneakers");
    }
  });

  const changeGrid = (gridType: string, target: HTMLButtonElement) => {
    // set new active grid
    setGrid(gridType);
    const prevGrid = document.querySelector(".vp-container .display .active-grid");
    prevGrid?.classList.remove("active-grid");
    // add active class to new grid icon
    target.classList.add("active-grid");
  };

  return (
    // view-products-container
    <div className="vp-container">
      <h2 className="desc">&nbsp; SHOP OUR {title} COLLECTION AND EXPLORE THE LATEST PRODUCTS AND STYLES.</h2>

      <div className="header">
        <div className="actions">
          <button className="filter">Filter</button>
          <button className="sort">Sort By</button>
          <div className="display flex cg-15 jc-c">
            {device.width < 768 ? (
              <button onClick={(e) => changeGrid("single", e.currentTarget)}>
                <GridIcon single={true} />
              </button>
            ) : (
              <button
                className={`${device.width > 768 ? "active-grid" : ""}`}
                onClick={(e) => changeGrid("double", e.currentTarget)}>
                <GridIcon double={true} />
              </button>
            )}
            {device.width < 768 ? (
              <button className="active-grid" onClick={(e) => changeGrid("double", e.currentTarget)}>
                <GridIcon double={true} />
              </button>
            ) : (
              <button onClick={(e) => changeGrid("multi", e.currentTarget)}>
                <GridIcon multi={true} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`products ${grid.toLowerCase()}`}>
        {products?.map((item) => (
          <div className="product" key={item.id}>
            <ProductCard image={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
