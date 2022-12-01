import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import Categories from "../enums/Categories";
import { INavItem } from "../interfaces/INavItem";

type ToggleWrapperProps = {
  show: boolean
}

const ToggleWrapper = styled.div<ToggleWrapperProps>`
  position: absolute;
  bottom: -1;
  display: ${props => props.show ? "flex" : "none" };
  flex-direction: column;
  justify-content: space-between;
  color: white;
  padding: 1rem;
  background: black;
  z-index: 10;
  height: 200px;
  align-items: flex-start;
`

export interface CategoryFilterProps {
  categories: INavItem[];
}

const Filter: FC<CategoryFilterProps> = props => {
  const router = useRouter();
  const { query, disabled } = router.query;
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState<INavItem[]>(props.categories);
  const filtered = useRef<number[]>([]);
   
  useEffect(() => {
    console.log("Filtered");
    console.log(filtered);
  }, [filtered]);

  useEffect(() => {
    console.log("Disabled");
    console.log(disabled);
    let toggled: number[] = [];
    if (disabled) {
      toggled = Array.isArray(disabled) ?
        disabled.map(function (item) { return parseInt(item); }) :
        [parseInt(disabled)];
      
      filtered.current = [...toggled];
    }

  }, [disabled])

  const toggleCategory = (categ: number): void => {
    let toFilter: number[] = [...filtered.current];
    categ = parseInt(categ.toString());
    if (toFilter.includes(categ)) {
      toFilter = toFilter.filter((c) => c !== categ);
    } else { 
      toFilter.push(categ);
    }
    filtered.current = toFilter;
    router.push({
      pathname: "/",
      query: {
        disabled: toFilter,
        filter: 0,
      },
      
    });
  }
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <ToggleWrapper show={show}>
        {
          categories.map((cat, index) => ( 
              <span key={index}>
                <input type="checkbox" name={`cat${cat.id}`} checked={ !filtered.current.includes(cat.id) } onChange={() => toggleCategory(cat.id)} />
                <label htmlFor={`cat${cat.id}`}>{Categories[cat.id]}</label>
              </span>
          ))
        }
      </ToggleWrapper>
    </div>
  );
}

const CategoryFilter = styled(Filter)<CategoryFilterProps>`
  background:black;
  color:white;
  cursor:pointer;
  position:relative;
`;

export default CategoryFilter;
