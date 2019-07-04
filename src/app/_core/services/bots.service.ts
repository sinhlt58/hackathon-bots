import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BOT_NAME } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BotsService {

  constructor(
    private api: ApiService
  ) { }

  public chatBot(data) {
    return this.api.post(`/bots/${BOT_NAME}/chat`, data);
  }
}
