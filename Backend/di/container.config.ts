import { container } from "tsyringe";
import { WordPairRepository } from "../Repository/wordPair.repository";
import { WordsListRepository } from "../Repository/wordsList.repository";
import { WordPairService } from "../Services/wordPair.service";
import { WordsListService } from "../Services/wordsList.service";

container.register<WordPairRepository>('WordPairRepository', { useClass: WordPairRepository });
container.register<WordsListRepository>('WordsListRepository', { useClass: WordsListRepository });
container.register<WordPairService>('WordPairService', { useClass: WordPairService });
container.register<WordsListService>('WordsListService', { useClass: WordsListService });
