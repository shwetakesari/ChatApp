import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading : Subject<Boolean>=  new Subject();

  constructor() { }
}
