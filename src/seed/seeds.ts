import DbConnect from "../config/DbConnect";
import chalk from "chalk";

import { seedProjetos } from "./seedProjetos";
import { seedUsuarios } from "./seedUsuarios";
import { seedCandidatos } from "./seedCandidatos";

let quantidadeProjetos: number = 10
let quantidadeCoordenadores: number = 5
let quantidadeAvaliadores: number = 3
let quantidadeCandidatos: number = 15

async function seeds() {

    console.log(chalk.blue('Conectando') + ' ao banco de dados...')
    try {
        await DbConnect.conectar()
    } catch (error) {
        console.log(chalk.red('Erro') + ' ao se conectar ao banco de dados:', error)
        process.exit(1)
    }

    try {
        console.log(chalk.blue('Iniciando seeds...'))

        console.log(`\nRodandoSeeds para: ${chalk.green('Usuários')}`)
        const coordenadores = await seedUsuarios(quantidadeCoordenadores, quantidadeAvaliadores)

        console.log(`\nRodandoSeeds para: ${chalk.green('Projetos')}`)
        await seedProjetos(quantidadeProjetos, coordenadores)

        console.log(`\nRodandoSeeds para: ${chalk.green('Candidatos')}`)
        await seedCandidatos(quantidadeCandidatos)

        console.log(`\n${chalk.green('Seeds realizado com sucesso')}`)
    } catch (error) {
        console.error(chalk.red('Erro') + ' ao realizar seeds:', error)
    } finally {
        await DbConnect.desconectar()
        process.exit(0)
    }
}

seeds()