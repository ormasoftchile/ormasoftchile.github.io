// import pantallas from 'pantallas/routes';

const routes = [

  { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Inicio' },
  { name: 'nosotros', route: 'nosotros', moduleId: `pantallas/nosotros/index`, nav: true, title: 'Quiénes Somos', settings: { iconClass: 'fa-cog' } },
  { name: 'contact', route: 'contact', moduleId: `pantallas/contacto/index`, nav: true, title: 'Contacto', settings: { iconClass: 'fa-cog' } },
  { name: 'gracias', route: 'gracias', moduleId: 'pantallas/gracias/index', nav: false, title: 'Gracias'}
  // ...pantallas,

];

export default routes;