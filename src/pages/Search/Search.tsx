import { AlertCircle, ArrowLeft } from "react-feather";
import Header from "../../components/Header/Header";
import GlobalStyle from "../../styles/global";
import styles from "./Search.module.css";
import React, { useState } from "react";
import NavLink from "../../components/NavLink/NavLink";
import Tag from "../../components/Tag/Tag";
import Button from "../../components/Button/Button";
import { Search as SearchIcon } from "react-feather";
import Menu from "../../components/Menu/Menu";
import { useFetch } from "../../hooks/useFetch";
import Post from "../../components/Post/Post";
import api from "../../api/api";
import Loader from "../../components/Loader/Loader";

type Category = {
  id: number;
  name: string;
  color: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  studentsRequired: number;
  user: {
    name: string;
    avatarURL: string;
  };
  category: {
    name: string;
    color: string;
  };
  createdAt: Date;
};

const Search: React.FC = () => {
  const { data: categories } = useFetch<Category[]>(
    "http://localhost:3000/categories"
  );

  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState<Project[] | null>();
  const [isSearching, setIsSearching] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const fetchProjectsByCategory = async (categoryId: number) => {
    setProjects(null)
    setIsSearching(true)
    try{
      const response = await api.get(`/projects?categoryId=${categoryId}`);
      setProjects(response.data)
      setIsSearching(false)
    }catch(err){
      setIsSearching(false)
      console.log(err)
    }
    
  };

  return (
    <>
      <GlobalStyle />
      <div className={styles.container}>
        <Menu />
        <div className={styles.body}>
          {/* <Header height="9rem" padding="0 2rem">
            <div className={styles.searchBoxContainer}>
              <NavLink
                to={"#"}
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
          </Header> */}
          <div className={styles.main}>
            <h2>Buscar</h2>
             
                <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                <p>Selecione uma categoria abaixo...</p>
              </div>
              
            <div className={styles.categories}>
              <div className={styles.tagsContainer}>
                {categories?.map((category) => (
                  <Tag
                    key={category.id}
                    onClick={() => {
                      fetchProjectsByCategory(category.id)
                      setIsSelected(true)
                    }}
                    color={category.color}
                  >
                    <p>{category.name}</p>
                  </Tag>
                ))}
              </div>
            </div>
            <div className={styles.searchResults}>
              {isSearching && <Loader />}
              {projects?.map((project) => (
                <>
                <h3>Resultados para: {project.category.name}</h3>
                <Post
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  numberOfStudents={project.studentsRequired}
                  projectType={project.category.name}
                  avatarUrl={project.user.avatarURL}
                  userName={project.user.name}
                  ccolor={project.category.color}
                  />
                  </>
              ))}
              
              {!projects && isSelected &&
                <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Parece que não há projetos dessa categoria...</p>
              </div>
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
