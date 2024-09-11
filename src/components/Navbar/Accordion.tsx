import React, { useState } from "react";
import AddIcon from "../../assets/icons/AddIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import { Link } from "react-router-dom";

const Accordion: React.FC<{ title: string; children: string[] }> = ({ title, children }) => {
  const { colors } = useGlobalContext();
  const [showChildren, setShowChildren] = useState<boolean>(false);

  return (
    <button onClick={() => setShowChildren(!showChildren)} className="accordion-container">
      <div className="title-con flex jc-sb" data-open={showChildren}>
        <p>{title}</p>
        <AddIcon color={colors.offWhite} size={14} />
      </div>
      <div onClick={(e) => e.stopPropagation()} className="children-con flex fd-c">
        {children &&
          showChildren &&
          children.map((child) => (
            <Link key={child} to={`/${encodeURIComponent(child)}`}>
              {child}
            </Link>
          ))}
      </div>
    </button>
  );
};

export default Accordion;
