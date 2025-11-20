export interface ILogin {
    login: string,
    senha: string
}

export interface IProjetosAcademicosCandidato {
    nome: string,
    descricao: string,
    duracao: number,
    links?: string[]
}

export interface IProjetosProfissionaisCandidato {
    nome: string,
    descricao: string,
    duracao: number,
    links?: string[]
}

export enum StatusInscricao {
    PENDENTE = 'Pendente',
    Aprovado = 'Aprovado',
    Rejeitado = 'Rejeitado'
}

export interface ICandidato {
    nome: string,
    email: string,
    projetosAcademicos?: IProjetosAcademicosCandidato[],
    projetosProfissionais?: IProjetosProfissionaisCandidato[],
    estudante: boolean,
    dataCadastro: Date,
    avaliacao?: number,
    statusInscricao?: StatusInscricao
}

export interface IProjeto {
    nome: string,
    periodoDuracao: number,
    dataLimiteInscricao: Date,
    instituicaoCliente: string
    coordenador: string
}

export enum FuncaoUsuario {
    COORDENADOR = 'Coordenador',
    AVALIADOR = 'Avaliador'
}

export interface IUsuario extends ILogin {
    nome: string,
    funcao: FuncaoUsuario,
    token?: string
}