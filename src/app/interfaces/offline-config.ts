import { Observable } from "rxjs";

export interface FsOfflineConfig {
  offlineUrl: string;
  onlineUrl: string;
  loadStatus: () => Observable<Offline>;
  statusFrequency: number;
}

export interface Offline {
  date: Date;
  goingOfflineMessage: string;
  enabled: boolean;
  content: string;
  redirect: boolean;
  redirectDelay: number;
  redirectUrl: string;
}