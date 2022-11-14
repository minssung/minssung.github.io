import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from '../components/layout';

const IndexPage = ({ data, location }: {
  data: unknown,
  location: unknown,
}) => {
  return (
    <Layout>
      content
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>minssung's blog</title>
