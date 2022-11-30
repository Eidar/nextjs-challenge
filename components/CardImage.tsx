import styled from '@emotion/styled';
import { NextPage } from 'next';
import Image from 'next/image';

interface IThumb {
  name: string;
}

const Wrapper = styled.div`
  height: 100%;
  width: 350px;
  position: relative;
  margin-right: 1rem;
  overflow: hidden;
`

const CardImage: NextPage<IThumb> = ({ name }) => {
  return (
    <Wrapper>
      <Image
        src={"https://www.alpha-orbital.com/assets/images/post_img/" + name}
        alt="Article image"
        layout="fill"
        objectFit="cover"
        />
    </Wrapper>
  )
}

export default CardImage;