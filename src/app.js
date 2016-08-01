export class App {
  configureRouter(config, router) {
    config.title = 'ormasoft';
    // traer userInfo desde storage
    var routes = [
	    { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: false, title: 'inicio' }
  	];
    config.map(routes);
    this.router = router;
  }
}
