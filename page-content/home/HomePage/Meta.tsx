import Head from "next/head";

const metaData = {
  title: "SpaceX Ships",
  description: "A website for displaying SpaceX ships from their GraphQL API",
  url: "/", // In theory this would be the full path, but this is not hosted so
  image: "https://i.imgur.com/I7kGmXD.jpeg" // Chose an image of Elon at random
}

export const Meta = () => (
  <Head>
    <title key="title">{metaData.title}</title>
    <meta content={metaData.description} name="description" key="description" />
    <meta content={metaData.title} property="og:title" key="og:title" />
    <meta content="websitex" property="og:type" key="og:type" />
    <meta content={metaData.url} property="og:url" key="og:url" />
    <meta content={metaData.description} property="og:description" key="og:description" />
    <meta content={metaData.image} property="og:image" key="og:image" />
    <meta content={metaData.image} property="og:image:secure_url" key="og:image:secure_url" />
  </Head>
)