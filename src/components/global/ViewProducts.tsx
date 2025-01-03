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
import OptionsOverlay from "./OptionsOverlay";
import GlobalAccordion from "./GlobalAccordion";
import { useCartContext } from "../contexts/CartContext";

export const sortFilters = [
  "Best Selling",
  "Price: Most Expensive",
  "Price: Bugdet friendly",
  "Alphabetically: A - Z",
  "Alphabetically: Z - A",
];

export const filterItems = [
  "Price", "Gender", "Size"
]

const ViewProducts = () => {
  const { category, title, product } = useParams();
  const [grid, setGrid] = useState("double");
  const device = useDevice();
  const { hideMenuBar, navbarHeight } = useNavContext();
  const [actions, setActions] = useState({ openSort: false, openFilter: false, sortValue: ""});
  const {filterDetails} = useCartContext();

  const [toget, setToGet] = useState("");
  const { data: selectedProducts } = useGetProducts(toget);
  const { sorted: sortedProducts } = useSortProducts(selectedProducts, actions.sortValue, filterDetails?.priceRange, filterDetails?.size );

  const [displayedProds, setDisplayedProds] = useState<Product[]>([]);
  const [filterItems, setFilterItems] = useState([
    {
      title: "Gender",
      children: ["Men", "Women", "Kids"]
    }, {
      title: "Size",
      children: ["", 0]
    }
  ])

  /* ====== SET PRODUCTS TO DISPLAY ====== */ 
  useCustomEffect(() => {
    if (sortedProducts) {
      setDisplayedProds(sortedProducts)
    } else if (selectedProducts) {
      setDisplayedProds(selectedProducts);
    }

  }, [selectedProducts, sortedProducts])

  /* ====== SET PRODUCTS TO GET ====== */ 
  useCustomEffect(() => {
    if (!category || !product || !title) return;

    if (title.toLowerCase() !== "addons" && title.toLowerCase() !== "all") {
      setToGet("sneakers");
    } else {
      setToGet("sweatpants");
    }
  }, [category, title, product]);


  /* ===== SET ACTIVE GRID ===== */
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

  /* ===== SET FILTER SIZES FROM PRODUCTS ===== */
  useCustomEffect(() => {
    if (toget.toLowerCase() === "sneakers") {
      setFilterItems((prev) => (
        prev.map((item) => (
          item.title.toLowerCase() === "size" ? 
          {...item, children: [35, 36, 37, 38 ,39, 40, 42, 43, 44, 45] } : item
        ))
      ))
    } else {
      setFilterItems((prev) => (
        prev.map((item) => (
          item.title.toLowerCase() === "size" ?
          {...item, children: ["M", "L", "XL", "2XL"]} : item
        ))
      ))
    }

  }, [selectedProducts])

  // close menus when user clicks outside 
  useCustomEffect(() => {
    const handleClick = () => {
      setActions({...actions, openFilter: false, openSort: false});
    }

    window.addEventListener("click", handleClick);

    return() => {
      window.removeEventListener("click", handleClick);
    }
  })

  const handleFilterClick = (sortValue: string) => {
    if (!sortValue) return;
    setActions({...actions, sortValue});
  }

  return (
    // view-products-container
    <>
      {actions.openSort || actions.openFilter ? <div className="vp-overlay" /> : ""}
      <div className="vp-container">
        <h2 className="desc">&nbsp; SHOP OUR {title} COLLECTION AND EXPLORE THE LATEST PRODUCTS AND STYLES.</h2>

        <div className="header" onClick={(e) => e.stopPropagation()}>
          <button className="filter" onClick={() => setActions({ ...actions, openFilter: !actions.openFilter })}>Filter</button>
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

        {/* ===== FILTER OPTIONS ===== */}
        <OptionsOverlay display={actions.openFilter} rmPadding={true}>
          <div className="filter-options">
            <div className="filter-header flex jc-sb">
              <p>Filter By</p>
              <button onClick={() => setActions({ ...actions, openFilter: false })}>
                <CloseIcon />
              </button>
            </div>

            <div className="filter-body">
              <GlobalAccordion 
                title="Price" 
                children={[]} 
                products={displayedProds} 
                productType={product || ''} 
                handleClick={handleFilterClick}
                />
              {
                filterItems.map((item, i) => (
                  <GlobalAccordion 
                    key={i} 
                    title={item.title} 
                    children={item.children} 
                    productType={product || ''}
                    handleClick={handleFilterClick} />
                ))
              }
            </div>

            <button className="filter-footer" onClick={() => setActions({ ...actions, openFilter: false })}>
              <p>View All Results</p>
            </button>
          </div>
        </OptionsOverlay>

        {/* ===== SORT OPTIONS ===== */}
        {device.width < 768 ? (
          <MobileOptionsOverlay display={actions.openSort}>
            <div className="sort-options-mobile">
              <div className="top flex jc-sb">
                <p>Sort By</p>
                <button onClick={() => setActions({ ...actions, openSort: false })}>
                  <CloseIcon />
                </button>
              </div>
              <div className="sort-body flex fd-c">
                {sortFilters.map((item, i) => (
                  <button key={i} onClick={() => handleSort(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </MobileOptionsOverlay>
        ) : (
          <OptionsOverlay display={actions.openSort} rmPadding={true}>
            <div className="sort-options">
              <div className="sort-header flex jc-sb">
                <p>Sort By</p>
                <button onClick={() => setActions({ ...actions, openSort: false })}>
                  <CloseIcon />
                </button>
              </div>

              <div className="sort-body flex fd-c">
                {
                  sortFilters.map((item, i) => (
                    <button key={i} onClick={() => handleSort(item)}> {item} </button>
                  ))
                }
              </div>

              <button onClick={() => setActions({ ...actions, openSort: false })} className="sort-footer">
                <p>View All Results</p>
              </button>
            </div>
          </OptionsOverlay>
        )}

        <div className={`products ${grid.toLowerCase()}`}>
          {displayedProds.map((item) => (
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
