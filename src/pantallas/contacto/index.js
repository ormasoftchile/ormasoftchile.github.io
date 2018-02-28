import $ from 'jquery';
import {Common} from '../../services/common';
import {inject} from 'aurelia-dependency-injection';
import {bindable, bindingMode} from 'aurelia-framework';
import {
    ValidationControllerFactory,
    ValidationController,
    ValidationRules
} from 'aurelia-validation';
// import {BootstrapFormRenderer} from 'aurelia-form-renderer-bootstrap';
import { BootstrapFormRenderer } from '../../resources/bootstrap-form-renderer'
import { Router } from 'aurelia-router'

@inject(Common, ValidationControllerFactory, Router)
export class Pantalla1 {
    name = "";
    email = "";
    message = "";
    controller = null;

    constructor(common, controllerFactory, router) {
        this.router = router;
        this.common = common;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());
        this.theMail = {
            name: "",
            email: "",
            message: ""
        };
        this.showModal = false;
        this.theModal = "";
    }
    sendData() {
        this.controller.validate()
        .then(result => {
            if (result.valid) {
                this.theMail = {
                    name: this.name,
                    email: this.email,
                    message: this.message
                };
                this.common.postData(this.theMail);
                this.router.navigate('gracias');
            } else {
                $('#exampleModal').modal('show');
                // alert("Favor ingresar los datos correspondientes!");
            }
        });         
    }
    // $(".page-host").scrollTop(0);
}

ValidationRules
    .ensure(a => a.name).required()
    .ensure(a => a.email).required().email()
    .ensure(a => a.message).required()
    .on(Pantalla1)

