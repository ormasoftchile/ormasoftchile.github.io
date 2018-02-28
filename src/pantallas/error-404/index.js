import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
@inject(Router)
export class Error404 {
    constructor(router) {
        this.router = router;
    }

    redirect() {
        this.router.navigate('');
    }
}