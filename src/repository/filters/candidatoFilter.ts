// src/repository/filters/candidatoFilter.ts
import { FilterQuery } from 'mongoose';
import { ICandidato, StatusInscricao } from '../../interface/models';

export class CandidatoFilter {
    static build(params: any): FilterQuery<ICandidato> {
        const query: FilterQuery<ICandidato> = {};

        if (params.nome) {
            query.nome = { $regex: new RegExp(params.nome as string, 'i') };
        }

        if (params.email) {
            query.email = { $regex: new RegExp(params.email as string, 'i') };
        }

        if (params.estudante !== undefined) {
            query.estudante = params.estudante === 'true' || params.estudante === true;
        }

        if (params.StatusInscricao) {
            query.StatusInscricao = params.StatusInscricao;
        }

        if (params.minAvaliacao) {
            query.avaliacao = { $gte: Number(params.minAvaliacao) };
        }

        if (params.maxAvaliacao) {
            query.avaliacao = { ...query.avaliacao, $lte: Number(params.maxAvaliacao) };
        }

        return query;
    }
}