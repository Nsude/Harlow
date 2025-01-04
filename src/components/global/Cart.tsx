import React, { useRef, useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import { useCartContext } from "../contexts/CartContext";
import ProductCard from "./ProductCard";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import AddIcon from "../../assets/icons/AddIcon";
import useCustomEffect from "../../hooks/useCustomEffect";
import gsap from "gsap";
import CheckmarkIcon from "../../assets/icons/CheckmarkIcon";
import ButtonSolidOverlay from "./ButtonSolidOverlay";
import MobileOptionsOverlay from "./MobileOptionsOverlay";
import OptionsOverlay from "./OptionsOverlay";

const buttonStyles = { width: "100%", paddingBlock: "22px", display: "flex", justifyContent: "center" };

const Cart = () => {
  const { colors } = useGlobalContext();
  const { selectedProducts, removeFromCart, addToCart, setOpenCart, openCart, toPreview, setToPreview } =
    useCartContext();
  const [total, setTotal] = useState(0);

  useCustomEffect(() => {
    if (!selectedProducts) selectedProducts;
    let amount = 0;
    selectedProducts.forEach(({ product }) => {
      amount += +product.price;
    });

    setTotal(amount);
  }, [selectedProducts]);

  useCustomEffect(() => {
    gsap.to(".cart-overlay", {
      display: openCart ? "block" : "none",
      duration: 0
    });
  }, [openCart]);

  const previewTimeout = useRef<any>(null);
  useCustomEffect(() => {
    if (toPreview) {
      gsap.to(".cart-overlay", {
        display: "block",
      });

      previewTimeout.current = setTimeout(() => {
        setToPreview(null);
      }, 5000);
    } else {
      clearTimeout(previewTimeout.current);

      gsap.to(".cart-overlay", {
        display: "none",
        duration: 0,
      });
    }
  }, [toPreview]);

  return (
    <>
      <MobileOptionsOverlay display={toPreview?.product ? true : false}>
        <div className="cart-preview flex jc-sb">
          <div className="header flex cg-5">
            <CheckmarkIcon />
            <p>Added to Cart</p>
          </div>
          <button onClick={() => setToPreview(null)}>
            <CloseIcon />
          </button>
        </div>
        <div className="product-card">
          <ProductCard image={toPreview?.product} search={true} listView={true} size={toPreview?.selectedSize} />
        </div>
        <div className="flex fd-c rg-10">
          <ButtonSolidOverlay
            text="View Cart"
            defaultColor={colors.black}
            overlay={colors.black}
            fg={colors.offWhite}
            bg={"transparent"}
            otherStyles={buttonStyles}
            handleClick={() => {
              setOpenCart(true);
              setToPreview(null);
            }}
          />

          <ButtonSolidOverlay
            text="Checkout"
            defaultColor={colors.offWhite}
            bg={colors.black}
            otherStyles={buttonStyles}
          />
        </div>
      </MobileOptionsOverlay>

      <div className="cart-overlay"></div>
      <OptionsOverlay display={openCart}>
        <div className="cart-container">
          <div className="header flex jc-sb">
            <h2>Cart</h2>
            <button onClick={() => setOpenCart(false)}>
              <CloseIcon color={colors.black} />
            </button>
          </div>
          <div className="body flex fd-c jc-c hide-scroll">
            {selectedProducts.length !== 0 ? (
              <div className="products">
                {selectedProducts.map(({ product, selectedSize, orderCount }) => (
                  <div key={product.id} className="item flex jc-sb">
                    <ProductCard image={product} search={true} listView={true} size={selectedSize} />
                    <div className="count flex jc-c cg-10">
                      <button className="delete" onClick={() => removeFromCart(product.id)}>
                        <DeleteIcon size={15} />
                      </button>
                      <span>{orderCount}</span>
                      <button className="add" onClick={() => addToCart(product, selectedSize)}>
                        <AddIcon size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h2>Really bruh? your cart is empty</h2>
              </div>
            )}
          </div>
          <div className="footer">
            <h2>Total: ${total.toFixed(2)}</h2>
            <ButtonSolidOverlay
              text="Checkout"
              defaultColor={colors.offWhite}
              bg={colors.black}
              otherStyles={buttonStyles}
            />
          </div>
        </div>
      </OptionsOverlay>
    </>
  );
};

export default Cart;
