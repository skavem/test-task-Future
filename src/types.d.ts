export interface GoogleBooks {
  kind:       string;
  totalItems: number;
  items:      GoogleBook[];
}

export interface GoogleBook {
  kind:       Kind;
  id:         string;
  etag:       string;
  selfLink:   string;
  volumeInfo: VolumeInfo;
  saleInfo:   SaleInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
}

export interface AccessInfo {
  country:          Country;
  epub:             Epub;
  pdf:              Epub;
  accessViewStatus: AccessViewStatus;
}

export enum AccessViewStatus {
  Sample = "SAMPLE",
}

export enum Country {
  Ru = "RU",
}

export interface Epub {
  isAvailable:   boolean;
  acsTokenLink?: string;
}

export enum Kind {
  BooksVolume = "books#volume",
}

export interface SaleInfo {
  country:      Country;
  listPrice?:   SaleInfoListPrice;
  retailPrice?: SaleInfoListPrice;
  buyLink?:     string;
  offers?:      Offer[];
}

export interface SaleInfoListPrice {
  amount:       number;
  currencyCode: CurrencyCode;
}

export enum CurrencyCode {
  Rub = "RUB",
}

export interface Offer {
  finskyOfferType: number;
  listPrice:       OfferListPrice;
  retailPrice:     OfferListPrice;
}

export interface OfferListPrice {
  amountInMicros: number;
  currencyCode:   CurrencyCode;
}

export interface SearchInfo {
  textSnippet: string;
}

export interface VolumeInfo {
  title:               string;
  publisher:           string;
  publishedDate:       string;
  description?:         string;
  readingModes:        ReadingModes;
  maturityRating:      MaturityRating;
  allowAnonLogging:    boolean;
  contentVersion:      string;
  panelizationSummary: PanelizationSummary;
  imageLinks?:          ImageLinks;
  previewLink:         string;
  infoLink:            string;
  canonicalVolumeLink: string;
  authors?:            string[];
  categories?:         string[];
  mainCategory?:       string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail:      string;
  small:          string;
  medium:         string;
  large:          string;
  extraLarge:     string;
}

export enum MaturityRating {
  NotMature = "NOT_MATURE",
}

export interface PanelizationSummary {
  containsEpubBubbles:  boolean;
  containsImageBubbles: boolean;
}

export interface ReadingModes {
  text:  boolean;
  image: boolean;
}

