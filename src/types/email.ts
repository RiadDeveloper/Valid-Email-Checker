export interface YCheckerResult {
  code: number;
  msg: string;
  items: string;
}

export interface SonjjResult {
  type: string;
  disposable: string;
  status: string;
  avatar?: string;
}

export interface EmailResult {
  ychecker?: YCheckerResult;
  sonjj?: SonjjResult;
  error?: string;
}