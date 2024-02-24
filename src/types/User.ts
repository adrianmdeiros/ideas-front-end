export type User = {
    id: number
    nome_usual: string
    email: string
    phone: string
    url_foto_150x200: string
    tipo_vinculo: string
    vinculo: {
      curso: string
      campus: string
    }
  };