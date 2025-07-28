export interface SmartQueryRequest {
  question: string;
  id?: string;
  role?: string;
}

export interface SmartQueryResponse {
  answer: string;
  dataSource: string;
}
