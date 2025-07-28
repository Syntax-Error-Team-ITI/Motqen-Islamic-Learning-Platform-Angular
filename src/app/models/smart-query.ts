export interface SmartQueryRequest {
  question: string;
  Id?: string;
  role?: string;
}

export interface SmartQueryResponse {
  answer: string;
  datasource: string;
}
