import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)
export class Welcome {
  heading = 'landing';
  
  constructor(router) {
    this.router = router;
  }
}
