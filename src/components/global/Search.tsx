import React, { useRef, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import CloseIcon from "../../assets/icons/CloseIcon";
import useCustomEffect from "../../hooks/useCustomEffect";
import gsap from "gsap";
import { useNavContext } from "../contexts/NavbarContext";
import { useSearch } from "../utility-functions/useSearch";
import ProductCard from "./ProductCard";

interface Props {
  navbarHeight: number
}

const Search:React.FC<Props> = ({navbarHeight}) => {
  const { searchOpen, setSearchOpen } = useNavContext();
  const {colors} = useGlobalContext();
  const [query, setQuery] = useState('');
  const searchContainer = useRef(null);
  const { data: matches, moreFound } = useSearch(query);

  // expand search dialogue
  useCustomEffect(() => {
    if (!searchContainer.current) return null;

    if (query) {
      gsap.to(searchContainer.current, {
        height: '76%'
      })
    } else {
      gsap.to(searchContainer.current, {
        height: 70
      })
    }

  }, [query])

  // open and close dialogue
  useCustomEffect(() => {
    if (!searchContainer.current) return null;

    // hide and display overlay
    gsap.to(".search-overlay", {
      display: searchOpen ? 'block' : 'none',
      duration: 0
    })

    gsap.to(searchContainer.current, {
      transform: `${searchOpen ? 'translateY(0)' : 'translateY(-200%)'}`,
      duration: .4
    })

  }, [searchOpen])

  return (
    <>
    <div className="search-overlay" onClick={() => setSearchOpen(false)} />
    <div ref={searchContainer} className="search-container" style={{top: `${navbarHeight}px`}}>
      <div className="flex jc-sb">
        <div className="flex cg-10">
          <SearchIcon color={colors.black} />
          <input 
            className="no-bg" 
            placeholder="search for..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="secondary-btn" onClick={() => setSearchOpen(false)}>
          <CloseIcon />
        </button>
      </div>

      {
        matches.length > 0 ? (
          <div className="found-items hide-scroll">
            <div className="suggestions-con">
              <p className="title">Suggestions</p>
              <div className="suggestions flex cg-10 hide-scroll">
                {matches.map((match) => {
                  const regex = new RegExp(`(${query})`, 'gi');
                  const parts = match.name.split(regex);

                  return (
                    <button onClick={() => setQuery(match.name)} className="no-bg" key={match.id}>
                      {parts.map((part, index) => 
                        regex.test(part) ? (
                          <span key={index} className="highlight">{part}</span>
                        ) : (
                          part
                        )
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="products-con">
              <p className="title">Products</p>
              <div className="products flex fd-c">
                {
                  matches.map((match) => (
                    <div key={match.id} className="product">
                      <ProductCard 
                        productName={match.name} 
                        image={match.path} 
                        price={match.price}
                        search={true}
                      />
                    </div>
                  ))
                }
              </div>
              {
                moreFound ? (
                  <button className="no-bg view-all-btn">View All</button>
                ) : ''
              }
            </div>
          </div>
        ) : ''
      }

    </div>
    </>
  )
}

export default Search;