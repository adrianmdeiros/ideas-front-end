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
    id: number
    name: string;
    avatarURL: string;
    course: {
      id: number
      name: string
    };
  };
  category: {
    name: string;
    color: string
  };
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

    api.get(`/projects?categoryid=${categoryId}`)
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
            <h2>Busca</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <p>Ache projetos por categoria:</p>
            </div>

            <div className={styles.categories}>
              {isFetching && <Loader color={"#ff7a00"} />}
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
                {projects.length === 0 && isSelected && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <AlertCircle size={32} />
                    <p>Parece que não há projetos dessa categoria...</p>
                  </div>
                )}
            <div className={styles.searchResults}>
              {isSearching && <Loader color={"#ff7a00"} />}
              <ul  className={styles.searchResults} >
                {projects?.map((project) => (
                  <li key={project.id}>
                    <Post
                      userId={project.user.id}
                      title={project.title}
                      description={project.description}
                      studentsRequired={project.studentsRequired}
                      projectCategory={project.category.name}
                      avatarUrl={project.user.avatarURL}
                      userName={project.user.name}
                      ccolor={project.category.color}
                      userCourse={project.user.course.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    </>
  );
};

export default Search;
