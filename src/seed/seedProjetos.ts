import { fakerPT_BR } from "@faker-js/faker";
import Projeto from "../models/projetos";
import { IProjeto } from "../interface/models";
import chalk from "chalk";

export async function seedProjetos(quantidade: number, coordenadores: string[]) {
    const projetoModel = new Projeto().model

    await projetoModel.deleteMany()

    const projetos: IProjeto[] = []

    if (coordenadores.length === 0) {
        throw new Error('É necessário ter pelo menos um coordenador para criar projetos')
    }

    for (let i = 0; i < quantidade; i++) {
        const coordenadorAleatorio = fakerPT_BR.helpers.arrayElement(coordenadores)
        projetos.push({
            nome: fakerPT_BR.commerce.department(),
            coordenador: coordenadorAleatorio,
            periodoDuracao: fakerPT_BR.number.int({ min: 1, max: 36 }),
            dataLimiteInscricao: fakerPT_BR.date.future({ years: 3 }),
            instituicaoCliente: fakerPT_BR.company.name()
        })
    }

    try {
        if (projetos.length > 0) {
            await projetoModel.insertMany(projetos)
            console.log(`${chalk.yellow(projetos.length)} novos ${chalk.cyan('projetos')} inseridos com ${chalk.green('sucesso')}!`)
        }
    } catch (error) {
        console.error(`${chalk.red('Erro')} ao realizar seed de projetos`, error)
        throw error
    }
}