import IArticle from "./IArticle";
import { INavItem } from "./INavItem";

export default interface IAppData {
  categories: INavItem[];
  articles: IArticle[];
}