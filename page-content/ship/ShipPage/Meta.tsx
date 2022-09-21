import Head from "next/head";

export const Meta = ({ title, description, url, image }: { title: string, description: string, url: string, image: string }) => (
  <Head>
    <title key="title">{title}</title>
    <meta content={description} name="description" key="description" />
    <meta content={title} property="og:title" key="og:title" />
    <meta content="product" property="og:type" key="og:type" />
    <meta content={url} property="og:url" key="og:url" />
    <meta content={description} property="og:description" key="og:description" />
    <meta content={image} property="og:image" key="og:image" />
    <meta content={image} property="og:image:secure_url" key="og:image:secure_url" />
  </Head>
)