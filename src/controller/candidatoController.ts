import CandidatoService from "../service/candidatoService";
import { ICandidato } from "../interface/models";
import { Request, Response } from 'express'

const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

class CandidatoController {
    private service
    constructor() {
        this.service = new CandidatoService()
    }

    async criar(req: Request, res: Response) {
        try {
            const { nome, email, estudante, dataCadastro, projetosAcademicos, projetosProfissionais } = req.body

            if (!nome || !email || estudante === undefined || !dataCadastro) {
                return res.status(400).json({
                    message: 'Campos obrigatórios faltando',
                    error: 'nome, email, estudante e dataCadastro são obrigatórios'
                })
            }

            if (nome.length < 3) {
                return res.status(400).json({
                    message: 'Dados inválidos',
                    error: 'O nome deve ter pelo menos 3 caracteres'
                });
            }

            if (!isValidEmail(email)) {
                return res.status(400).json({
                    message: 'Dados inválidos',
                    error: 'Formato de e-mail inválido'
                });
            }

            if (projetosAcademicos && !Array.isArray(projetosAcademicos)) {
                return res.status(400).json({ message: 'Formato inválido', error: 'projetosAcademicos deve ser uma lista' });
            }

            const candidatoCriado: ICandidato = {
                nome,
                email,
                estudante,
                dataCadastro,
                projetosAcademicos,
                projetosProfissionais
            }

            const criado = await this.service.criar(candidatoCriado)
            res.status(201).json({
                message: 'Candidato cadastrado com sucesso',
                data: criado
            })

        } catch (error: any) {
            console.error('[candidatoController] Erro ao cadastrar candidato:', error)
            if (error.code === 11000) {
                return res.status(400).json({ message: 'Erro de cadastro', error: 'E-mail já cadastrado' });
            }
            res.status(500).json({
                message: 'Erro ao cadastrar candidato',
                error: error.message
            })
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const { page, limit, sort, ...filtros } = req.query;

            const opcoesPaginacao = {
                page: page as string,
                limit: limit as string,
                sort: sort ? JSON.parse(sort as string) : undefined
            };

            const resultado = await this.service.listar(filtros, opcoesPaginacao)
            res.status(200).json({
                message: 'Candidatos localizados',
                data: resultado.docs,
                pagination: {
                    total: resultado.totalDocs,
                    page: resultado.page,
                    limit: resultado.limit,
                    totalPages: resultado.totalPages,
                    hasNextPage: resultado.hasNextPage,
                    hasPrevPage: resultado.hasPrevPage
                }
            })
        } catch (error: any) {
            console.error('[candidatoController] Erro ao listar candidatos:', error)
            res.status(500).json({
                message: 'Erro ao listar candidatos',
                error: error.message
            })
        }
    }

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const dadosEditar: Partial<ICandidato> = req.body

            if (!id) {
                return res.status(400).json({ message: 'ID não informado', error: 'necessário informar o id' })
            }

            if (!dadosEditar || Object.keys(dadosEditar).length === 0) {
                return res.status(400).json({ message: 'Dados vazios', error: 'informe os campos para editar' })
            }

            if ('avaliacao' in dadosEditar || 'statusInscricao' in dadosEditar) {
                delete dadosEditar.avaliacao;
                delete dadosEditar.statusInscricao;

                if (Object.keys(dadosEditar).length === 0) {
                    return res.status(403).json({
                        message: 'Operação não permitida',
                        error: 'Você não pode alterar avaliação ou status por esta rota. Use as rotas específicas.'
                    });
                }
            }

            const usuarioEditado = await this.service.editar(id, dadosEditar)

            if (!usuarioEditado) {
                return res.status(404).json({ message: 'Não encontrado', error: 'Candidato não encontrado' })
            }

            res.status(200).json({
                message: 'Usuario editado com sucesso',
                data: usuarioEditado
            })
        } catch (error: any) {
            console.error('[candidatoController] Erro ao editar candidato:', error)
            res.status(500).json({ message: 'Erro ao editar candidato', error: error.message })
        }
    }

    async avaliar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { avaliacao } = req.body

            if (!id) return res.status(400).json({ message: 'ID faltando', error: 'Informe o ID' });

            if (avaliacao === undefined || typeof avaliacao !== 'number') {
                return res.status(400).json({
                    message: 'Avaliação inválida',
                    error: 'A avaliação deve ser um número'
                });
            }

            if (avaliacao < 0 || avaliacao > 10) {
                return res.status(400).json({
                    message: 'Avaliação inválida',
                    error: 'A nota deve ser entre 0 e 10'
                });
            }

            const candidatoAvaliado = await this.service.avaliar(id, avaliacao)

            if (!candidatoAvaliado) {
                return res.status(404).json({ message: 'Candidato não encontrado', error: 'ID inválido' })
            }

            res.status(200).json({
                message: 'Candidato avaliado com sucesso',
                data: candidatoAvaliado
            })
        } catch (error: any) {
            console.error('[candidatoController] Erro ao avaliar:', error)
            res.status(500).json({ message: 'Erro ao avaliar', error: error.message })
        }
    }

    async alterarStatus(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { statusInscricao } = req.body

            if (!id) return res.status(400).json({ message: 'ID faltando', error: 'Informe o ID' });
            if (!statusInscricao) return res.status(400).json({ message: 'Status faltando', error: 'Informe o status' });

            const statusValidos = ['Pendente', 'Aprovado', 'Rejeitado']
            if (!statusValidos.includes(statusInscricao)) {
                return res.status(400).json({
                    message: 'Status inválido',
                    error: `O status deve ser um de: ${statusValidos.join(', ')}`
                })
            }

            const candidatoAtualizado = await this.service.alterarStatus(id, statusInscricao)

            if (!candidatoAtualizado) {
                return res.status(404).json({ message: 'Candidato não encontrado', error: 'ID inválido' })
            }

            res.status(200).json({
                message: 'Status alterado com sucesso',
                data: candidatoAtualizado
            })
        } catch (error: any) {
            console.error('[candidatoController] Erro ao alterar status:', error)
            res.status(500).json({ message: 'Erro interno', error: error.message })
        }
    }

    async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).json({ message: 'ID faltando', error: 'Informe o ID' });

            const deletado = await this.service.deletar(id)

            if (!deletado) {
                return res.status(404).json({ message: 'Não encontrado', error: 'Candidato não encontrado para deletar' })
            }

            res.status(200).json({ message: 'Candidato deletado com sucesso', data: deletado })
        } catch (error: any) {
            console.error('[candidatoController] Erro ao deletar:', error)
            res.status(500).json({ message: 'Erro ao deletar', error: error.message })
        }
    }
}

export default CandidatoController