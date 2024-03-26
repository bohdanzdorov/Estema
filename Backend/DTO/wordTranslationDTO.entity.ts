export class WordTranslationDTO {
    toLanguage:string
    fromLanguage:string
    wordToTranslate:string
    constructor(toLanguage:string, fromLanguage:string, wordToTranslate:string){
        this.toLanguage = toLanguage
        this.fromLanguage = fromLanguage
        this.wordToTranslate = wordToTranslate
    }
}