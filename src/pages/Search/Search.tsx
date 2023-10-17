import { ArrowLeft } from "react-feather";
import Header from "../../components/Header/Header";
import GlobalStyle from "../../styles/global";
import Input from "../../components/Input/Input";
import styles from "./Search.module.css";
import React, { useState } from "react";
import NavLink from "../../components/NavLink/NavLink";
import Card from "../../components/Tag/Tag";
import Button from "../../components/Button/Button";
import { Search as SearchIcon } from 'react-feather'
import TabBar from "../../components/TabBar/TabBar";

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <GlobalStyle />
      <TabBar/>
      <Header height="8rem" padding="0 2rem" backgroundColor="#101010">
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
            borderRadius=".8rem"
            backgroundColor="#252525"
            border="none"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <Button color="#101010" hover="#dedede" backgroundColor="#f5f5f5" borderRadius=".8rem"  >
              <SearchIcon size={18}/>
          </Button>
        </div>
      </Header>
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          <Card bgcolor="#ad00ff">MONOGRAFIA</Card>
          <Card bgcolor="#00a3ff">PIBIT</Card>
          <Card bgcolor="#2f9e41">PIBIC</Card>
          <Card bgcolor="orange">PIVIC</Card>
          <Card bgcolor="white">OUTRO</Card>
        </div>
      </div>
    </>
  );
};

export default Search;
