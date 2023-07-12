import { useState } from "react";

interface ListGroupProps {
  name: string;
  list: string[];
  onSelectItem : (item: string) => void;
}

export default function ListGroup({name, list, onSelectItem} : ListGroupProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  
  
  

  return (
    <>
      <h1>{name}</h1>
      <ul className="list-group">
        {list.map((items, index) => (
          <li
            className={
              index === activeIndex
                ? "list-group-item active"
                : "list-group-item"
            }
            key={items}
            onClick={() => {setActiveIndex(index); onSelectItem(items);}}
          >
            {items}
          </li>
        ))}
      </ul>
    </>
  );
}
