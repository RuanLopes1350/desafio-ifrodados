import { fakerPT_BR } from "@faker-js/faker";
import Candidato from "../models/candidato";
import { ICandidato, IProjetosAcademicosCandidato, IProjetosProfissionaisCandidato } from "../interface/models";
import chalk from "chalk";

export async function seedCandidatos(quantidade: number) {
    const candidatoModel = new Candidato().model

    await candidatoModel.deleteMany()

    const candidatos: ICandidato[] = []

    for (let i = 0; i < quantidade; i++) {
        const estudante = fakerPT_BR.datatype.boolean()
        const quantidadeProjetosAcademicos = fakerPT_BR.number.int({ min: 0, max: 5 })
        const quantidadeProjetosProfissionais = estudante ? fakerPT_BR.number.int({ min: 0, max: 2 }) : fakerPT_BR.number.int({ min: 1, max: 6 })

        // Gerar projetos acadêmicos
        const projetosAcademicos: IProjetosAcademicosCandidato[] = []
        for (let j = 0; j < quantidadeProjetosAcademicos; j++) {
            projetosAcademicos.push({
                nome: fakerPT_BR.commerce.productName(),
                descricao: fakerPT_BR.lorem.sentences(2),
                duracao: fakerPT_BR.number.int({ min: 1, max: 24 }),
                links: fakerPT_BR.datatype.boolean() ? [fakerPT_BR.internet.url(), fakerPT_BR.internet.url()] : []
            })
        }

        // Gerar projetos profissionais
        const projetosProfissionais: IProjetosProfissionaisCandidato[] = []
        for (let j = 0; j < quantidadeProjetosProfissionais; j++) {
            projetosProfissionais.push({
                nome: fakerPT_BR.company.catchPhrase(),
                descricao: fakerPT_BR.lorem.sentences(2),
                duracao: fakerPT_BR.number.int({ min: 1, max: 36 }),
                links: fakerPT_BR.datatype.boolean() ? [fakerPT_BR.internet.url()] : []
            })
        }

        candidatos.push({
            nome: fakerPT_BR.person.fullName(),
            email: fakerPT_BR.internet.email(),
            estudante: estudante,
            dataCadastro: fakerPT_BR.date.past({ years: 1 }),
            projetosAcademicos: projetosAcademicos.length > 0 ? projetosAcademicos : undefined,
            projetosProfissionais: projetosProfissionais.length > 0 ? projetosProfissionais : undefined,
            avaliacao: fakerPT_BR.datatype.boolean() ? fakerPT_BR.number.float({ min: 0, max: 10, fractionDigits: 1 }) : undefined
        })
    }

    try {
        if (candidatos.length > 0) {
            await candidatoModel.insertMany(candidatos)
            console.log(`${chalk.yellow(candidatos.length)} novos ${chalk.cyan('candidatos')} inseridos com ${chalk.green('sucesso')}!`)

            const estudantesCount = candidatos.filter(c => c.estudante).length
            const profissionaisCount = candidatos.filter(c => !c.estudante).length
            console.log(`  - ${chalk.magenta(estudantesCount)} estudantes`)
            console.log(`  - ${chalk.magenta(profissionaisCount)} profissionais`)
        }
    } catch (error) {
        console.error(`${chalk.red('Erro')} ao realizar seed de candidatos`, error)
        throw error
    }
}
