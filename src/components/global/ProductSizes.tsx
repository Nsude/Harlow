import React from 'react'

interface Props {
  sizes: string[] | number[]
  selectedSize: string | number
  setSelctedSize: React.Dispatch<React.SetStateAction<string | number>>
}

const ProductSizes:React.FC<Props> = ({sizes, setSelctedSize, selectedSize}) => {
  
  return (
    <div className="sizes-container">
      {
        sizes ? (
          sizes.map((item, i) => (
            <button 
              onClick={() => {setSelctedSize(item)}} 
              key={i} 
              className={`size ${selectedSize === item ? 'selected' : ''}`}
            >{item}</button>
          ))
        ) : ''
      }
    </div>
  )
}

export default ProductSizes;