import {bindable, bindingMode} from 'aurelia-framework';

export class ContactForm {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) name;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) email;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) message;
    constructor() {
        
    }

}