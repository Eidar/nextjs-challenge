import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import getIndexData from '../queries/getIndexData';
import Card from "../components/Card/Card";
import CardImage from "../components/Card/CardImage";
import CardContent from "../components/Card/CardContent";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";
import IAppData from "../interfaces/IAppData";
import CardCloseButton from "../components/Card/CardCloseButton";


export default function Home() {
  const [filteredCategories, setFilteredCategories] = useState<number[]>();
  const [deletedArticles, setDeletedArticles] = useState<number[]>([]);
  const router = useRouter();
  const { query, filter, disabled } = router.query;
  const page = useQuery<IAppData>({
    queryKey: ['getIndexData', { query: query, filter: filter }],
    queryFn: () => getIndexData(query, filter),
    select: (data): IAppData => {
      if (disabled) { 
        data.articles = data.articles.filter(c =>
          !(c.post_category_id.toString() == disabled ||
          disabled.includes(c.post_category_id.toString())
        ));
      }
      return data;
     }
  });
  
  useEffect(() => {

    router.events.on('routeChangeComplete', (url) => {
      setDeletedArticles([]);
    });
  }, []);

  if (page.isLoading) {
    if (deletedArticles.length > 0) {
      setDeletedArticles([]);
    }
    return <span>Loading...</span>
  }
 
  if (page.isError) {
    return <span>Error: {(page.error as Error).message}</span>
  }

  if (!page.data) { 
    return <span>No data!</span>
  }
  
  if (page.isSuccess) {
    return (
      <>
        {page.data.categories &&
          <Navigation
          ids={page.data.categories}
          totalArticles={page.data.articles.filter((x,i)=> !deletedArticles.includes(i)).length}
          />}
        <div>
          {page.data.articles.map((article, index) => {
            if (deletedArticles.includes(index)) { return };
            return (
              <Card key={index}>
                <CardCloseButton onClick={() => setDeletedArticles([...deletedArticles, index])}>X</CardCloseButton>
                <CardImage name={article.post_image} />
                <CardContent content={article} />
              </Card>
            );
          })}
        </div>
      </>
    );
  }
}

const queryClient = new QueryClient();

export const getServerSideProps: GetServerSideProps = async (context:  any) => {
  const { query, filter } = context.query;
  let safeQuery = query === undefined ? null : query;
  let safeFilter = filter === undefined ? null : filter;

  try {
    await queryClient.prefetchQuery<IAppData>({
      queryKey: ['getIndexData', {
        query: safeQuery,
        filter: safeFilter
      }, { staleTime: 1000 * 60 * 10 }],
      queryFn: () => getIndexData(query, filter)
    });
  } catch (error) {
    console.error("PREFETCH ERROR");
    console.error(error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
 }