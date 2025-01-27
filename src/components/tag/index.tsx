import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TagContainer = styled.div`
  padding: 4px 12px;
  border-radius: 20px;
  background-color: #e0e0e0;
  color: #424242;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: #2196f3;
    color: white;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Tag = ({ tag }: { tag: string }) => (
  <StyledLink to={`/tags/${tag.toLowerCase()}`}>
    <TagContainer>{tag}</TagContainer>
  </StyledLink>
);
