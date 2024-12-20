import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useCustomEffect from '../../hooks/useCustomEffect';
import { useSelectedProduct } from '../../hooks/useSelectedProduct';
import ButtonSolidOverlay from './ButtonSolidOverlay';

const ProductPage = () => {
  const {id} = useParams();
  const { selectedProd: product } = useSelectedProduct(id || '');

  return (
    <>
    {
      product ? (
        <div className="product-page-container">
          <div className="image-con"></div>
          <div className="details">
            <div className="header">
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </div>
            <div className="desc">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam tenetur eum, possimus qui sunt vitae. In iure quam incidunt autem? Iste possimus, nostrum consequatur fuga tempore iure ab distinctio accusamus reprehenderit ratione repellendus. Nobis odio eius quis laboriosam perferendis mollitia, alias totam sunt itaque.</p>
            </div>
            <div className="sizes">
              <h4>Sizes</h4>
            </div>
            <div className="cta">
              <ButtonSolidOverlay text='Buy Now' />
              <ButtonSolidOverlay text='Add to Cart' />
            </div>
          </div>
        </div>

      ) : ''
    }
    </>
  )
}

export default ProductPage;