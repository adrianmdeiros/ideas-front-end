import { AlertCircle } from "react-feather";
import GlobalStyle from "../../styles/global";
import styles from "./Search.module.css";
import React, { useContext, useState } from "react";
import Tag from "../../components/Tag/Tag";
import Menu from "../../components/Menu/Menu";
import { useFetch } from "../../hooks/useFetch";
import Post from "../../components/Post/Post";
import api from "../../api/api";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../contexts/AuthContext";

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
  modality: string;
  amountUsersInterested: number;
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
    id: number
    name: string;
    color: string
  };
};

type dbUser = {
  id: number
  name: string
  email: string
  phone: string
  avatarURL: string
  bond: string
  courseId: number
}

const Search: React.FC = () => {
  const auth = useContext(AuthContext)
  const { data: categories, isFetching: isFetchingCategories } = useFetch<Category[]>(
    "https://api-projif.vercel.app/categories"
  );

  
  const { data: user } = useFetch<dbUser>(`https://api-projif.vercel.app/users/${auth.user?.id}`)
  
  
  const [projects, setProjects] = useState<Project[]>([])
  const [isSelected, setIsSelected] = useState(false)
  const [isFetchingProjects, setIsFetchingIsProjects] = useState(false)


  const fetchProjectsByUserCourseIdAndCategory = (usercourseid: number, categoryid: number) => {
    setIsSelected(false)
    setProjects([]);
    setIsFetchingIsProjects(true);

    api.get(`/projects?usercourseid=${usercourseid}&categoryid=${categoryid}`)
      .then(response => {
        setProjects(response.data);
        setIsFetchingIsProjects(false);
      })
      .catch(() => {
        setIsSelected(true);
        setIsFetchingIsProjects(false);
      })

  };

  return (
    <>
      <GlobalStyle />
      <div className={styles.body}>
        <Menu />
        <div className={styles.container}>
            <h2>Buscar</h2> 
            {/* <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              
            </div> */}
            <div className={styles.categories}>
              {isFetchingCategories && <Loader color={"#ff7a00"} />}
              <ul className={styles.tagsContainer}>
                {categories?.map((category) => (
                  <li key={category.id}>
                    <Tag
                      onClick={() => {
                        if(user){
                          fetchProjectsByUserCourseIdAndCategory(user?.courseId, category.id)
                        }
                      }}
                      color={category.color}
                    >
                      <p>{category.name}</p>
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
                {isSelected && projects?.length === 0 && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <AlertCircle size={32} />
                    <p>Não há projetos dessa categoria.</p>
                  </div>
                )}
            <div className={styles.searchResults}>
              {isFetchingProjects && <Loader color={"#ff7a00"} />}
              <ul>
                {projects?.map((project) => (
                  <li key={project.id}>
                    <Post
                      id={project.id}
                      userId={project.user.id}
                      title={project.title}
                      description={project.description}
                      studentsRequired={project.studentsRequired}
                      modality={project.modality}
                      amountUsersInterested={project.amountUsersInterested}
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
