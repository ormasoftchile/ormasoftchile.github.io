import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Footer {
  constructor(router) {
    this.white = {
      color: 'white'
    }
    this.router = router;
  }
}

