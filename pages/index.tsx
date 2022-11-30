import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import getIndexData from '../queries/getIndexData';
import Card from "../components/Card";
import CardImage from "../components/CardImage";
import CardContent from "../components/CardContent";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";
import useDebounce from "../util/useDebounce";
import IAppData from "../interfaces/IAppData";
import styled from "@emotion/styled";

export default function Home() {
  const router = useRouter();
  const { query, filter } = router.query;
  const page = useQuery<IAppData>({
    queryKey: ['getIndexData', { query: query, filter: filter }],
    queryFn: () => getIndexData(query, filter)
  });
  
    console.log("query");
    console.log(query);
    console.log("filter");
    console.log(filter);
    console.log("articles");
    console.log(page);
  
  if (page.isLoading) {
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
          totalArticles={page.data.articles.length}
          />}
        
        

        <div>
          {page.data.articles.map((article, index) => {
            return (
              <Card key={index}>
                <CardImage name={article.post_image} />
                <CardContent content={article} />
              </Card>
            );
            ;
          })}
        </div>
      </>
    );
  }
}

