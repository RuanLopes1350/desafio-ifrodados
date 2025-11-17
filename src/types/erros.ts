export type MongoMessage = {
    acknowledged: boolean;
    insertedId?: string;
    modifiedCount?: number;
    deletedCount?: number;
    matchedCount?: number;
    upsertedCount?: number;
    upsertedId?: string;
}