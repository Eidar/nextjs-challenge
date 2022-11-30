import axios from "axios";
import CategoryRoutes from "../enums/CategoryRoutes";
import IAppData from "../interfaces/IAppData";
import IArticle from "../interfaces/IArticle";
import { INavItem } from "../interfaces/INavItem";

type QueryParam = string | string[] | undefined;


export default function getIndexData(query?: QueryParam, filter?: QueryParam): Promise<IAppData> {
  let apiUrl: string = 'https://www.alpha-orbital.com/last-100-news.json';
  console.log(query);
  console.log(filter);
  return axios.get(apiUrl).then((latest: any) => {
    let results = latest.data;

    let categories = getCategories(results, filter);
    results = filterArticles(results, query, filter)

    return { articles: results, categories: categories };
  });
}

function getCategories(results: IArticle[], filter: QueryParam): INavItem[] {
  let categories: INavItem[] = [];

  let ids = results.map(article => article.post_category_id)
    .filter((value, index, self) => self.indexOf(value) === index)
  ids.push(0);
  ids.sort();
  ids?.forEach((id) => {
    let active: boolean;
    if (filter) {
      active = parseInt(filter.toString()) == id ? true : false;
    } else { 
      active = id == 0 ? true : false;
    }
    categories.push({ route: CategoryRoutes[id], id: id, active: active  })
  });

  return categories;
 }

function filterArticles(results: IArticle[], query: QueryParam, filter: QueryParam): IArticle[] { 
  let res: IArticle[] = [];

  if (filter && filter !== "0") { 
    let id = parseInt(<string>filter);
    res = results.filter((article: IArticle) => article.post_category_id == id);
  }
  if (filter == "0" || filter == undefined) {
    res = results;
  }
  if (query && query.length > 3) {
    res = res.filter((article: IArticle) => article.title.toLowerCase().includes(query.toString().toLowerCase()))
  }
  
  return res;
}