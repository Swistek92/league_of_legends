import { ChampionsType } from "../types";

export class ChampionManager {
  private champions: ChampionsType[];
  private uniqueTags: string[];

  constructor(inputObject: Record<string, any>[]) {
    this.champions = this.objectToArray(inputObject);
    this.uniqueTags = [];
    this.updateUniqueTags();
  }

  private updateUniqueTags() {
    this.champions.forEach((champion) => {
      champion.tags.forEach((tag) => {
        if (!this.uniqueTags.includes(tag)) {
          this.uniqueTags.push(tag);
        }
      });
    });
  }
  private objectToArray(inputObject: Record<string, any>): ChampionsType[] {
    if (Object.keys(inputObject).length === 0) {
      return [];
    }
    const keys = Object.keys(inputObject);
    const resultArray = keys.map((key) => {
      const championData = inputObject[key];
      return { stared: false, ...championData };
    });
    return resultArray;
  }
  public getChempionsInArray = (): ChampionsType[] => this.champions;

  public getAllUniqueTags = (): string[] => this.uniqueTags;

  public addTag = (tag: string): void => {
    if (!this.uniqueTags.includes(tag)) {
      this.uniqueTags = [tag, ...this.uniqueTags];
    }
  };
  public markChampionsAsStared = (championNames: string[]): void => {
    this.champions.forEach((champion) => {
      if (championNames.includes(champion.name)) {
        champion.stared = true;
      }
    });
  };
  public getStaredChampions = (championNames: string[]): ChampionsType[] => {
    return this.champions.filter((champion) =>
      championNames.includes(champion.name)
    );
  };
  public getWarChampions = (championNames: string[]): ChampionsType[] => {
    return this.champions.filter((champion) =>
      championNames.includes(champion.name)
    );
  };
}
