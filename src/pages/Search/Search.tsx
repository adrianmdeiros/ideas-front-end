import { ArrowLeft } from "react-feather";
import Header from "../../components/Header/Header";
import GlobalStyle from "../../styles/global";
import styles from "./Search.module.css";
import React, { useState } from "react";
import NavLink from "../../components/NavLink/NavLink";
import Tag from "../../components/Tag/Tag";
import Button from "../../components/Button/Button";
import { Search as SearchIcon } from "react-feather";
import Menu from "../../components/Menu/Menu";

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <GlobalStyle />
      <div className={styles.container}>
        <Menu />
        <div className={styles.body}>
          <Header height="9rem" padding="0 2rem">
            <div className={styles.searchBoxContainer}>
              
                <NavLink
                  to={'#'}
                  icon={<ArrowLeft />}
                  onClick={() => history.back()}
                />
              
              <input
                className={styles.input}
                id="search"
                type="text"
                placeholder="Buscar projeto..."
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <Button
                color="#101010"
                hover="#dedede"
                backgroundColor="#f5f5f5"
                borderRadius=".8rem"
              >
                <SearchIcon size={18} />
              </Button>
            </div>
          </Header>
          <div className={styles.main}>
            <div className={styles.categories}>
                <div className={styles.tagsContainer}>
                  <Tag bgcolor="#ad00ff">MONOGRAFIA</Tag>
                  <Tag bgcolor="#00a3ff">PIBIT</Tag>
                  <Tag bgcolor="#2f9e41">PIBIC</Tag>
                  <Tag bgcolor="orange">PIVIC</Tag>
                  <Tag bgcolor="white">OUTRO</Tag>
                </div>
            </div>
            <div className={styles.searchResults}>
             
            </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Search;
