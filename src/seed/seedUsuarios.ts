import { fakerPT_BR } from "@faker-js/faker";
import Usuario from "../models/usuario";
import { IUsuario } from "../interface/models";
import { FuncaoUsuario } from "../interface/models";
import chalk from "chalk";

export async function seedUsuarios(quantidadeCoordenadores: number, quantidadeAvaliadores: number) {
    const usuarioModel = new Usuario().model

    await usuarioModel.deleteMany()

    const usuarios: IUsuario[] = []
    const coordenadores: string[] = []

    const usuariosFixos: IUsuario[] = [
        {
            nome: "Ruan Lopes",
            funcao: FuncaoUsuario.COORDENADOR,
            login: "ruan.lopes@example.com",
            senha: "SenhaSuperSegur@123"
        }
    ]

    await usuarioModel.insertMany(usuariosFixos)

    // Criar coordenadores
    for (let i = 0; i < quantidadeCoordenadores; i++) {
        const nomeCoordenador = fakerPT_BR.person.fullName()
        coordenadores.push(nomeCoordenador)
        usuarios.push({
            nome: nomeCoordenador,
            funcao: FuncaoUsuario.COORDENADOR,
            login: fakerPT_BR.internet.email(),
            senha: fakerPT_BR.internet.password()
        })
    }
    coordenadores.push(usuariosFixos[0].nome)

    // Criar avaliadores
    for (let i = 0; i < quantidadeAvaliadores; i++) {
        usuarios.push({
            nome: fakerPT_BR.person.fullName(),
            funcao: FuncaoUsuario.AVALIADOR,
            login: fakerPT_BR.internet.email(),
            senha: fakerPT_BR.internet.password()
        })
    }

    try {
        if (usuarios.length > 0) {
            await usuarioModel.insertMany(usuarios)
            console.log(`${chalk.yellow(usuarios.length)} novos ${chalk.cyan('usuarios')} inseridos com ${chalk.green('sucesso')}!`)
            console.log(`  - ${chalk.magenta(quantidadeCoordenadores)} coordenadores`)
            console.log(`  - ${chalk.magenta(quantidadeAvaliadores)} avaliadores`)
        }
        return coordenadores
    } catch (error) {
        console.error(`${chalk.red('Erro')} ao realizar seed de usuarios`, error)
        throw error
    }
}