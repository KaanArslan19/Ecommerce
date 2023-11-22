import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "q8awp3rh",
  dataset: "development",
  apiVersion: "2021-10-21",
  useCdn: true,
  token: process.env.SANITY_STUDIO_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
