import { ArrowLeft } from "react-feather";
import Header from "../../components/Header/Header";
import GlobalStyle from "../../styles/global";
import Input from "../../components/Input/Input";
import styles from './Search.module.css'
import React, { useState } from "react";
import NavLink from "../../components/NavLink/NavLink";


const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('')



  return (
    <>
      <GlobalStyle />
      <Header height="8rem" position="fixed" padding="0 2rem" backgroundColor="#101010">
        <NavLink
          to={"#"}
          icon={<ArrowLeft />}
          onClick={() => history.back()}
        ></NavLink>
        <div className={styles.searchBoxContainer}>
          <Input
            id="search"
            type="text"
            placeholder="Buscar projeto..."
            borderRadius="2rem"
            backgroundColor="#252525"
            border="none"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
      </Header>
    </>
  );
};

export default Search;
