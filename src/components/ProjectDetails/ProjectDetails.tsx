import GlobalStyle from "../../styles/global";
import { DollarSign, Mail, Phone, User } from "react-feather";
import { ProjectDetailsProps } from "../../types/ProjectDetailsProps";
import styles from "./ProjectDetaills.module.css";

const ProjectDetails: React.FC<ProjectDetailsProps> = (props: ProjectDetailsProps) => {

  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <h2 className={styles.title}>Detalhes do projeto</h2>
        <div className={styles.container}>
          <div className={styles.projectContainer}>
            <div className={styles.top}>
              <h4>Autor</h4>
              <div className={styles.autor}>
                <div>
                  <h3>{props.username}</h3>
                  <p>{props.userCourse}</p>
                </div>
              </div>
            </div>
            <div className={styles.middle}>
              <h3>Título</h3>
              <p>{props.title}</p>
              <h4>Descrição</h4>
              <p style={{ color: props.color }}>
                {props.description}
              </p>
              <div className={styles.projectReq}>
                <div className={styles.projectTypeColor} style={{ backgroundColor: props.color }} />
                <p>{props.category}</p>
              </div>
              <div className={styles.projectReqContainer}>
                <div style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}>
                  <div className={styles.projectReq}>
                    <DollarSign size={18} />
                    <p>{props.modality ? props.modality : '-'}</p>
                  </div>
                  <div className={styles.projectReq}>
                    <User size={18} />
                    <p> {props.studentsRequired} aluno(s)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <h4>Contatos</h4>
              <div className={styles.contacts}>
                <div className={styles.contact}>
                  <Mail size={18} />
                  <p>{props.email}</p>
                </div>
                <div className={styles.contact}>
                  <Phone size={18} />
                  <p>{props.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProjectDetails;
