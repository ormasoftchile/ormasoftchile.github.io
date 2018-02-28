export class Slider {
    constructor() {
        $(document).ready(function () {
            $('.carousel').carousel({
                interval: 5000
            })
        });
    }
}