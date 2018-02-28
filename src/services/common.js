import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Common {
    constructor(httpClient) {
        this.httpClient = httpClient;
        // this.baseUrl = "https://ormasoft.us17.list-manage.com/";
        this.url = "https://formspree.io/jaime@ormasoft.cl";
    }
    postData(thebody) {
        return this.httpClient.fetch(this.url, {
            method: 'post',
            body: json(thebody)
        });
        // let httpClient = new HttpClient();
        // // <form action="https://ormasoft.us17.list-manage.com/subscribe/post?u=25e1f2a345c237d31ac428af4&amp;id=b7ea8518aa" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>

        // console.log('BODY:'+thebody);
        // return this.httpClient.fetch(this.baseUrl + 'subscribe/post?u=25e1f2a345c237d31ac428af4&id=b7ea8518aa', {
        //     method: 'post',
        //     body: json(thebody)
        // })
        
        // .then(response => {response.json(); console.log('RESP: '+response);})
        // .then(savedComment => {
        //     alert(`Saved comment! ID: ${savedComment.id}`);
        // })
    }
}
    
