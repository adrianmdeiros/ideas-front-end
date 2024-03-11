import styles from "./styles.module.css";

type ProjectDetailsProps = {
  title?: string;
  description?: string;
  studentsRequired?: number;
  modality?: string;
  category?: string;
  username?: string;
  email?: string;
  phone?: string;
  department?: string;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = (props: ProjectDetailsProps) => {
  return (
    <>
      <div className={styles.body}>
        <h2 className={styles.title}>Detalhes do projeto</h2>
        <div className={styles.container}>
          <div className={styles.projectContainer}>
            <div className={styles.top}>
              <h3>Autor</h3>
              <div className={styles.autor}>
                <div>
                  <h4>{props.username}</h4>
                  <p>{props.department}</p>
                </div>
              </div>
            </div>
            <div className={styles.middle}>
              <h3>Título</h3>
              <p>{props.title}</p>
              <h4>Descrição</h4>
              <p>
                {props.description}
              </p>
              <h4>Tags</h4>
              <div className={styles.projectReqContainer}>
                <div className={styles.projectReq}>
                  🧪
                  <p>{props.category}</p>
                </div>
                <div className={styles.projectReq}>
                  ✨
                  <p>{props.modality}</p>
                </div>
                <div className={styles.projectReq}>
                  👨‍🎓
                  <p> {props.studentsRequired} ALUNO(S)</p>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <h3>Contatos do autor</h3>
              <div className={styles.contacts}>
                <div className={styles.contact}>
                  📧
                  <p>{props.email ?? 'Não adicionou email.'}</p>
                </div>
                <div className={styles.contact}>
                  📞
                  <p>{props.phone ?? 'Não adicionou telefone.'}</p>
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
