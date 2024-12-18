import React, { useRef, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import CloseIcon from "../../assets/icons/CloseIcon";
import useCustomEffect from "../../hooks/useCustomEffect";
import gsap from "gsap";
import { useNavContext } from "../contexts/NavbarContext";

interface Props {
  navbarHeight: number
}

const Search:React.FC<Props> = ({navbarHeight}) => {
  const { searchOpen, setSearchOpen } = useNavContext();
  const {colors} = useGlobalContext();
  const [query, setQuery] = useState('');
  const searchContainer = useRef(null);

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

    // prevent scroll
    // searchOpen ? 
    // document.body.style.overflowY = 'hidden' : 
    // document.body.style.overflowY = 'scroll';

    // hide and display overlay
    gsap.to(".search-overlay", {
      display: searchOpen ? 'block' : 'none',
      duration: 0
    })


    gsap.to(searchContainer.current, {
      yPercent: searchOpen ? 0 : -200,
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
    </div>
    </>
  )
}

export default Search;