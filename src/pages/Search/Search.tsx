import { AlertCircle } from "react-feather";
import GlobalStyle from "../../styles/global";
import styles from "./Search.module.css";
import React, { useState } from "react";
import Tag from "../../components/Tag/Tag";
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
  const { data: categories, isFetching } = useFetch<Category[]>(
    "https://api-projif.vercel.app/categories"
  );

  const [projects, setProjects] = useState<Project[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const fetchProjectsByCategory = (categoryId: number) => {
    setIsSelected(false)
    setProjects([]);
    setIsSearching(true);
    
    api.get(`/projects?categoryId=${categoryId}`)
    .then(response => {
      setProjects(response.data);
      setIsSearching(false)
    })
    .catch(() => {
      setIsSelected(true);
      setIsSearching(false);
    })
    
  };

  return (
    <>
      <GlobalStyle />
      <div className={styles.body}>
        <Menu />
        <div className={styles.container}>
          <div className={styles.main}>
            <h2>Buscar</h2>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <p>Selecione uma categoria abaixo...</p>
            </div>

            <div className={styles.categories}>
              {isFetching && <Loader color={"#ff7a00"}/>}
              <ul className={styles.tagsContainer}>
                {categories?.map((category) => (
                  <li key={category.id}>
                    <Tag
                      onClick={() => fetchProjectsByCategory(category.id)}
                      color={category.color}
                    >
                      <p>{category.name}</p>
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.searchResults}>
              {isSearching && <Loader color={"#ff7a00"} />}
              <ul>
                {projects?.map((project) => (
                  <li key={project.id}>
                    <Post
                      title={project.title}
                      description={project.description}
                      numberOfStudents={project.studentsRequired}
                      projectType={project.category.name}
                      avatarUrl={project.user.avatarURL}
                      userName={project.user.name}
                      ccolor={project.category.color}
                    />
                  </li>
                ))}
              </ul>
              {projects.length === 0 && isSelected && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <AlertCircle size={32} />
                  <p>Parece que não há projetos dessa categoria...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
