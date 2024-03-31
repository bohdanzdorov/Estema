export class AddWordPairDTO {
    id: string;
    fromWord: string;
    toWord: string;
    wordsListId: string;
    constructor(id: string, fromWord: string, toWord: string, wordsListId: string) {
        this.id = id
        this.fromWord = fromWord
        this.toWord = toWord
        this.wordsListId = wordsListId
    }
}