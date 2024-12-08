import { ObjectId } from "mongoose"

export type RecipeResponse = {
    _id: string,
    title: string,
    body: string,
    dateCreated: string,
    dateUpdated?: string
}