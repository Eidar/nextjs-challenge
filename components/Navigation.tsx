import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, createRef, FC, useEffect,  useRef,  useState } from 'react';
import Categories from '../enums/Categories';
import { INavItem } from '../interfaces/INavItem';

type NavProps = {
  ids?: INavItem[];
  totalArticles: number
}

const Navigation: FC<NavProps> = ({ ids = undefined, totalArticles = 0 }) => {
  const router = useRouter();
  const { query, filter } = router.query;
  const [categories, setCategories] = useState < INavItem[] >([{route: "/", id: 0, active: true}]);
  const value = useRef<string | undefined>(undefined);
  const inputRef = createRef<HTMLInputElement>();
 
  useEffect(() => { 
    if (ids) {
      setCategories(ids)
    }
    if (query) {
      value.current = query.toString();
    } else { 
      value.current = undefined;
    }
  }, [ids]);

 
  const NavWrapper = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  `

  const NavItem = styled(Link)`
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    &:hover:not(.active) {
      background-color: #111;
    }
  `
  const SearchWrapper = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 1rem;
  `
  const ResultsWrapper = styled.div`
      margin: 1rem;
      display: flex;
      justify-content: flex-end;
    `
  const Results = styled.span`
    color: white;
  `
  return (
    <>
      <NavWrapper>
        {
          categories.map((item, index) => { 
            return (
              <li key={index}>
                <NavItem
                  href={{
                  pathname: '/',
                  query: { filter: item.id }
                  }}
                  className={item.active ? "active" : ""}
                >
                  { totalArticles < 100 && item.id == 0 ? "Refetch" : Categories[item.id] }
                </NavItem>
              </li>
            )
          })
        }
        
      </NavWrapper>
      <SearchWrapper>
            <input ref={ inputRef }type="text" placeholder="Search..." value={ value.current } onChange={({ target }) => value.current = target.value} />
            <button type="submit" onClick={() =>
              router.push({
              pathname: '/',
              query: {
                query: value.current,
                filter: filter
                },
              })
            }>
              SEARCH
            </button>
      </SearchWrapper>
      <ResultsWrapper>
          <Results>Currently showing {totalArticles} articles</Results>
      </ResultsWrapper>
    </>
  )
}

export default Navigation;