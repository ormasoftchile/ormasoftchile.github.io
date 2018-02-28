import { inject } from 'aurelia-framework';
import $ from 'jquery';
import routes from './routes';

export class App {
  constructor() {
    this.title = 'Ormasoft';
  }


  configureRouter(config, router) {

    const handleUnknownRoutes = () => {
      return { route: '404', moduleId: 'pantallas/error-404/index' };
    }

    config.mapUnknownRoutes(handleUnknownRoutes);
    config.title = this.title;
    config.addPipelineStep('modelbind', RouterStep);
    config.addPipelineStep('postcomplete', PostCompleteStep);
    config.fallbackRoute('');
    config.map(routes);
    this.router = router;
  }
}

class RouterStep {
  run(routingContext, next) {
    return next();
  }
}

class PostCompleteStep {
  run(routingContext, next) {
    $(".page-host").scrollTop(0);
    return next();
  }
}
