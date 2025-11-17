export interface IProjetosAcademicos {
    nome: string,
    descricao: string,
    duracao: number,
    links?: string[]
}

export interface IProjetosProfissionais {
    nome: string,
    descricao: string,
    duracao: number,
    links?: string[]
}

export interface ICandidato {
    nome: string,
    email: string,
    projetosAcademicos: IProjetosAcademicos[],
    estudante: boolean,
    dataCadastro: Date,
    avaliacao?: number
}

export interface IProjeto {
    nome: string,
    periodoDuracao: number,
    dataLimiteInscricao: Date,
    instituicaoCliente: string
    coordenador: string
}

export interface IAvaliador {
    login: string,
    senha: string,
    nome: string,
    funcao: string
}