import styled from '@emotion/styled'
import Link from 'next/link';
import { FC } from 'react';
import IArticle from '../interfaces/IArticle';

type CardContentProps = {
  content: IArticle;
}

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`
const ContentDate = styled.p`
  color: grey;
  font-size: 0.7rem;
`
const ContentText = styled.p`
  text-justify: auto;
  font-size: 1rem;
`
const ContentLink = styled(Link)`
  align-self: flex-end;
`

const Content: FC<CardContentProps> = ({ content }) => (
  <Wrapper>
    <Link href={"https://www.alpha-orbital.com/news/" + content.slug}><h3>{content.title}</h3></Link>
    <ContentDate>{content.date}</ContentDate>
    <ContentText>{formatExcerpt(content.excerpt)}</ContentText>
    <ContentLink href={"https://www.alpha-orbital.com/news/" + content.slug}>Full Article</ContentLink>
  </Wrapper>
)


const CardContent = styled(Content)<CardContentProps>`
  display: 'flex';
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export default CardContent;

// Utility

function formatExcerpt(excerpt: string) { 
  excerpt = excerpt.slice(3, - 6);
  return excerpt.replace(/&#39;/g, "'");
}