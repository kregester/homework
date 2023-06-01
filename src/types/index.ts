import { NumberListInstance } from "twilio/lib/rest/pricing/v2/number";

export interface Image {
  path?: string;
  extension?: string;
}

export interface Url {
  type?: string;
  url?: string;
}

export interface TextObject {
  type?: string;
  language?: string;
  text?: string;
}

export interface Comic {
  id?: number;
  digitalId?: number;
  title?: string;
  issueNumber?: number;
  variantDescription?: string;
  description?: string;
  modified?: string;
  isbn?: string;
  upc?: string;
  diamondCode?: string;
  ean?: string;
  issn?: string;
  format?: string;
  pageCount?: number;
  textObjects?: [TextObject];
  resourceURI?: string;
  urls?: [Url];
  // series (SeriesSummary, optional): A summary representation of the series to which this comic belongs.,
  // variants (Array[ComicSummary], optional): A list of variant issues for this comic (includes the "original" issue if the current issue is a variant).,
  // collections (Array[ComicSummary], optional): A list of collections which include this comic (will generally be empty if the comic's format is a collection).,
  // collectedIssues (Array[ComicSummary], optional): A list of issues collected in this comic (will generally be empty for periodical formats such as "comic" or "magazine").,
  // dates (Array[ComicDate], optional): A list of key dates for this comic.,
  // prices (Array[ComicPrice], optional): A list of prices for this comic.,
  thumbnail?: Image;
  images?: [Image];
  // creators (CreatorList, optional): A resource list containing the creators associated with this comic.,
  characters: [Character];
  // stories (StoryList, optional): A resource list containing the stories which appear in this comic.,
  // events (EventList, optional): A resource list containing the events in which this comic appears.
}

export interface Character {
  id?: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls?: [Url];
  thumbnail?: Image;
  comics?: [Comic];
  // stories (StoryList, optional): A resource list of stories in which this character appears.,
  // events (EventList, optional): A resource list of events in which this character appears.,
  // series (SeriesList, optional): A resource list of series in which this character appears.
}

//this should just be interface Summary { }
export interface Summary {
  resourceURI?: string;
  name?: string;
}

//this should just be interface Summary { }
export interface CharacterSummary extends Summary {
  role?: string;
}

//this should just be interface Summary { }
export interface StorySummary extends Summary {
  type?: string;
}

//this should just be interface Summary { }
export interface EventSummary extends Summary {}

export interface CreatorSummary {
  resourceURI?: string;
  name?: string;
  role?: string;
}

export interface EventList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: [EventSummary];
}

export interface StoryList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: [StorySummary];
}

export interface CharacterList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: [CharacterSummary];
}

export interface CreatorList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: [CreatorSummary];
}

export interface ComicDate {
  type?: string;
  date?: string;
}

export interface ComicPrice {
  type?: string;
  price?: number;
}

export interface DataContainer {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: [Comic | Character];
}

export interface DataWrapper {
  code?: number;
  status?: string;
  copyright?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: DataContainer;
  etag?: string;
}
