import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  // isLoading =  signal<boolean>(false);
  isLoading = new Subject<boolean>();

  show(){
    this.isLoading.next(true);
  }

  hide(){
    this.isLoading.next(false);
  }

}
