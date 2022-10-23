import * as React from "react"
import type { HeadFC } from "gatsby"
import { Helmet } from 'react-helmet'
import styled from 'styled-components';
import GlobalStyle from "../styles/GlobalStyle";

const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  background-color: aliceblue;
`

const IndexPage = ({ data, location }: {
  data: unknown,
  location: unknown,
}) => {
  console.log(data)
  console.log(location)
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        content
      </main>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <Helmet>
    <title>minssung's blog</title>
    <meta
      name="blog"
      content="programming diary"
    />
  </Helmet>
)
