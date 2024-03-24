export class AddWordsListDTO {
    id: string
    name: string
    pairsCount: number
    fromLanguage: string
    toLanguage: string
    constructor(id: string, name: string, pairsCount: number, fromLanguage: string, toLanguage: string){
        this.id = id
        this.name = name
        this.pairsCount = pairsCount
        this.fromLanguage = fromLanguage
        this.toLanguage = toLanguage
    }
}