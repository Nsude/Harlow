import { useParams } from "react-router-dom";
import useCustomEffect from "../../hooks/useCustomEffect";
import { useState } from "react";
import { Product } from "../../models";
import { useGetProducts } from "../../hooks/useGetProducts";
import ProductCard from "./ProductCard";
import GridIcon from "../../assets/icons/GridIcon";
import { useDevice } from "../../hooks/useDevice";
import gsap from "gsap";
import { useNavContext } from "../contexts/NavbarContext";
import MobileNavbarMenu from "../Navbar/MobileNavbarMenu";
import MobileOptionsOverlay from "./MobileOptionsOverlay";
import CloseIcon from "../../assets/icons/CloseIcon";
import { useSortProducts } from "../../hooks/useSortProducts";

export const sortFilters = [
  "Best Selling",
  "Price: Most Expensive",
  "Price: Bugdet friendly",
  "Alphabetically: A - Z",
  "Alphabetically: Z - A",
];

const ViewProducts = () => {
  const { category, title, product } = useParams();
  const [toget, setToGet] = useState("");
  const { data: products } = useGetProducts(toget);
  const [grid, setGrid] = useState("double");
  const device = useDevice();
  const { hideMenuBar, navbarHeight } = useNavContext();
  const [actions, setActions] = useState({
    openSort: false,
    openFilter: false,
    sortValue: "",
  });
  const { sorted: sortedProducts } = useSortProducts(products, actions.sortValue);

  useCustomEffect(() => {
    if (!category || !product || !title) return;

    if (title.toLowerCase() !== "addons" && title.toLowerCase() !== "all") {
      setToGet("sneakers");
    } else {
      setToGet("sweatpants");
    }
  }, [category, title, product]);

  const changeGrid = (gridType: string, target: HTMLButtonElement) => {
    // set new active grid
    setGrid(gridType);
    const prevGrid = document.querySelector(".vp-container .display .active-grid");
    prevGrid?.classList.remove("active-grid");
    // add active class to new grid icon
    target.classList.add("active-grid");
  };

  // move header when the navbar enters the view
  useCustomEffect(() => {
    gsap.to(".vp-container .header", {
      top: !hideMenuBar ? navbarHeight : 0,
      duration: 0.25,
    });
  }, [hideMenuBar]);

  const handleSort = (sortValue: string) => {
    setActions({ ...actions, sortValue });
    setTimeout(() => {
      setActions({ ...actions, openSort: false });
    });
  };

  return (
    // view-products-container
    <>
      {actions.openSort || actions.openFilter ? <div className="vp-overlay" /> : ""}
      <div className="vp-container">
        <h2 className="desc">&nbsp; SHOP OUR {title} COLLECTION AND EXPLORE THE LATEST PRODUCTS AND STYLES.</h2>

        <div className="header">
          <button className="filter">Filter</button>
          <button className="sort" onClick={() => setActions({ ...actions, openSort: !actions.openSort })}>
            Sort by
          </button>

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

        {/* Sort Options */}
        {device.width < 768 ? (
          <MobileOptionsOverlay display={actions.openSort}>
            <div className="sort-options-mobile">
              <div className="top flex jc-sb">
                <p>Sort By</p>
                <button onClick={() => setActions({ ...actions, openSort: false })}>
                  {" "}
                  <CloseIcon />{" "}
                </button>
              </div>
              <div className="sort-body flex fd-c">
                {sortFilters.map((item, i) => (
                  <button key={i} onClick={() => handleSort(item)}>
                    {" "}
                    {item}{" "}
                  </button>
                ))}
              </div>
            </div>
          </MobileOptionsOverlay>
        ) : (
          <div></div>
        )}

        <div className={`products ${grid.toLowerCase()}`}>
          {(sortedProducts ?? products)?.map((item) => (
            <div className="product" key={item.id}>
              <ProductCard image={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewProducts;
