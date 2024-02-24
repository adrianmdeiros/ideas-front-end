export type User = {
    id: number
    nome_usual: string
    email: string
    phone: string
    tipo_vinculo: string
    vinculo: {
      curso: string
      campus: string
    }
  };