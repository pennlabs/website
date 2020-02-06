import React, { ReactElement } from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const IMAGE =
  'https://pennlabs-assets.s3.amazonaws.com/metadata-images/penn-labs.png'
const URL = 'pennlabs.org'

type Meta =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined }

export interface ISEOProps {
  description?: string
  lang?: string
  meta?: Meta[]
  title?: string
  image?: string
  url?: string
}

function SEO({
  description = '',
  lang = 'en',
  meta = [],
  title = '',
  image = IMAGE,
  url = URL,
}: ISEOProps): ReactElement {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | Penn Labs`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: `Penn Labs <contact@${URL}>`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          property: `og:image-alt`,
          content: 'Penn Labs Logo',
        },
        {
          name: `twitter:site`,
          content: url,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: image,
        },
        {
          name: `twitter:image-alt`,
          content: 'Penn Labs logo',
        },
      ].concat(meta)}
    />
  )
}

export default SEO
