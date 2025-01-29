import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { Tag } from '@components/tag';

const StyledCard = styled.div`
  border-radius: 16px;
  box-shadow: 0 2px 4px var(--box-shadow-color);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px var(--box-shadow-color);
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 16/9;
  overflow: hidden;

  .gatsby-image-wrapper {
    height: 100%;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
`;

const DateText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 1rem 0;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export const PostCard = ({
  title,
  date,
  tags,
  image,
}: {
  title: string;
  date: string;
  tags: string[];
  image: IGatsbyImageData;
}) => {
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

  return (
    <StyledCard>
      <ImageWrapper>
        <GatsbyImage image={image} alt={title} />
      </ImageWrapper>
      <Content>
        <Title>{title}</Title>
        <DateText>{formattedDate}</DateText>
        {/* {tags?.length > 0 ? (
          <TagList>
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </TagList>
        ) : null} */}
      </Content>
    </StyledCard>
  );
};
