define('app',['exports', 'aurelia-framework', 'jquery', './routes'], function (exports, _aureliaFramework, _jquery, _routes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  var _routes2 = _interopRequireDefault(_routes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.title = 'Ormasoft';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {

      var handleUnknownRoutes = function handleUnknownRoutes() {
        return { route: '404', moduleId: 'pantallas/error-404/index' };
      };

      config.mapUnknownRoutes(handleUnknownRoutes);
      config.title = this.title;
      config.addPipelineStep('modelbind', RouterStep);
      config.addPipelineStep('postcomplete', PostCompleteStep);
      config.fallbackRoute('');
      config.map(_routes2.default);
      this.router = router;
    };

    return App;
  }();

  var RouterStep = function () {
    function RouterStep() {
      _classCallCheck(this, RouterStep);
    }

    RouterStep.prototype.run = function run(routingContext, next) {
      return next();
    };

    return RouterStep;
  }();

  var PostCompleteStep = function () {
    function PostCompleteStep() {
      _classCallCheck(this, PostCompleteStep);
    }

    PostCompleteStep.prototype.run = function run(routingContext, next) {
      (0, _jquery2.default)(".page-host").scrollTop(0);
      return next();
    };

    return PostCompleteStep;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'jquery', 'moment', 'bootstrap'], function (exports, _environment, _jquery, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = undefined;

    var _environment2 = _interopRequireDefault(_environment);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    var configure = exports.configure = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(aurelia) {
            var HAS_SW, registration;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-animator-css');

                            if (_environment2.default.debug) {
                                aurelia.use.developmentLogging();
                            }

                            if (_environment2.default.testing) {
                                aurelia.use.plugin('aurelia-testing');
                            }

                            aurelia.use.plugin('aurelia-dialog', function (config) {
                                config.useDefaults();
                                config.settings.lock = false;
                                config.settings.centerHorizontalOnly = false;
                                config.settings.startingZIndex = 2000;
                                config.settings.keyboard = true;
                            }).plugin('aurelia-validation', function (config) {});

                            _moment2.default.locale('es');
                            _context.next = 7;
                            return aurelia.start();

                        case 7:
                            _context.next = 9;
                            return aurelia.setRoot();

                        case 9:
                            if (_environment2.default.debug) {
                                _context.next = 25;
                                break;
                            }

                            HAS_SW = 'serviceWorker' in navigator;

                            if (!HAS_SW) {
                                _context.next = 25;
                                break;
                            }

                            _context.prev = 12;
                            _context.next = 15;
                            return navigator.serviceWorker.register('service-worker.js');

                        case 15:
                            registration = _context.sent;

                            console.log('ServiceWorker registration successful with scope: ' + registration.scope);
                            if (typeof registration.update == 'function') {
                                registration.update();
                            }

                            registration.onupdatefound = function () {
                                var installingWorker = registration.installing;
                                installingWorker.onstatechange = function () {
                                    switch (installingWorker.state) {
                                        case 'installed':
                                            if (navigator.serviceWorker.controller) {
                                                console.log('New or updated content is available.');
                                            } else {
                                                console.log('Content is cached, and will be available for offline use the next time the page is loaded.');
                                            }
                                            break;
                                        case 'redundant':
                                            console.error('The installing service worker became redundant.');
                                            break;
                                    }
                                };
                            };
                            _context.next = 24;
                            break;

                        case 21:
                            _context.prev = 21;
                            _context.t0 = _context['catch'](12);

                            console.error('ServiceWorker registration failed: ' + _context.t0);

                        case 24:
                            ;

                        case 25:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[12, 21]]);
        }));

        return function configure(_x) {
            return _ref.apply(this, arguments);
        };
    }();
});
define('nav-bar',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavBar = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor;

    var NavBar = exports.NavBar = (_class = function NavBar() {
        _classCallCheck(this, NavBar);

        _initDefineProp(this, 'router', _descriptor, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'router', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('routes',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var routes = [{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Inicio' }, { name: 'nosotros', route: 'nosotros', moduleId: 'pantallas/nosotros/index', nav: true, title: 'Quiénes Somos', settings: { iconClass: 'fa-cog' } }, { name: 'contact', route: 'contact', moduleId: 'pantallas/contacto/index', nav: true, title: 'Contacto', settings: { iconClass: 'fa-cog' } }, { name: 'gracias', route: 'gracias', moduleId: 'pantallas/gracias/index', nav: false, title: 'Gracias' }];

  exports.default = routes;
});
define('welcome',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Welcome = exports.Welcome = function Welcome() {
        _classCallCheck(this, Welcome);

        this.successes = [{ title: 'La estabilización y desarrollo de la plataforma Microsoft ha logrado mejorar la ejecución de los procesos críticos del Ministerio de Educación', description: 'La primera tarea que enfrentó el área de TI frente al escenario descrito, fue generar una nueva visión y alcance que permitiera…', image: 'http://webxms2.azurewebsites.net/wp-content/uploads/2015/05/negocios11.jpg' }, { title: 'Hyper-V y System Center nos ha permitido tener un óptimo performance y administración del negocio.', description: 'La empresa que ganó la licitación del IPS (Instituto de Previsión Social) de Chile necesitaba hacer un up-grade tecnológico y de infraestructura…', image: 'http://www.xms.cl/wp-content/uploads/2015/08/casos_mine.gif' }, { title: 'La Asociación Chilena de Seguridad migra a la nube de Microsoft con Windows Azure', description: 'Si calculamos costo-beneficio ahora podemos hacer cosas que con las máquinas acá no podíamos, como prender una máquina solo cuando la ocupamos…', image: 'http://www.xms.cl/wp-content/uploads/2015/08/casos_achs.gif' }];
    };
});
define('resources/bootstrap-form-renderer',['exports', 'aurelia-validation'], function (exports, _aureliaValidation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BootstrapFormRenderer = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BootstrapFormRenderer = exports.BootstrapFormRenderer = function () {
    function BootstrapFormRenderer() {
      _classCallCheck(this, BootstrapFormRenderer);
    }

    BootstrapFormRenderer.prototype.render = function render(instruction) {
      for (var _iterator = instruction.unrender, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var _ref5 = _ref2;
        var result = _ref5.result,
            elements = _ref5.elements;

        for (var _iterator3 = elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref6;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref6 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref6 = _i3.value;
          }

          var element = _ref6;

          this.remove(element, result);
        }
      }

      for (var _iterator2 = instruction.render, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref4 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref4 = _i2.value;
        }

        var _ref7 = _ref4;
        var result = _ref7.result,
            elements = _ref7.elements;

        for (var _iterator4 = elements, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref8;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref8 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref8 = _i4.value;
          }

          var _element = _ref8;

          this.add(_element, result);
        }
      }
    };

    BootstrapFormRenderer.prototype.add = function add(element, result) {
      if (result.valid) {
        return;
      }

      if (typeof element.closest != 'function') return;

      var formGroup = element.closest('.form-group');
      if (!formGroup) {
        return;
      }

      formGroup.classList.add('has-error');

      var message = document.createElement('span');
      message.className = 'help-block validation-message';
      message.textContent = result.message;
      message.id = 'validation-message-' + result.id;
      formGroup.appendChild(message);
    };

    BootstrapFormRenderer.prototype.remove = function remove(element, result) {
      if (result.valid) {
        return;
      }

      if (typeof element.closest != 'function') return;

      var formGroup = element.closest('.form-group');
      if (!formGroup) {
        return;
      }

      var message = formGroup.querySelector('#validation-message-' + result.id);
      if (message) {
        formGroup.removeChild(message);

        if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
          formGroup.classList.remove('has-error');
        }
      }
    };

    return BootstrapFormRenderer;
  }();
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources('./value-converters/date', './elements/contact-form/contact-form', './elements/slider/slider', './elements/partners-box/partners-box', './elements/benefits-box/benefits-box', './elements/solution/solution', './elements/change/change', './elements/client/client', './elements/footer/footer', './elements/servicios/servicios', './elements/modal/modal');
  }
});
define('services/backend',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var latency = 0;

	function wait() {
		var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : latency;

		return new Promise(function (resolve) {
			return setTimeout(resolve, ms);
		});
	}

	var Backend = exports.Backend = function Backend() {
		_classCallCheck(this, Backend);
	};
});
define('services/common',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Common = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Common = exports.Common = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function Common(httpClient) {
            _classCallCheck(this, Common);

            this.httpClient = httpClient;

            this.url = "https://formspree.io/jaime@ormasoft.cl";
        }

        Common.prototype.postData = function postData(thebody) {
            return this.httpClient.fetch(this.url, {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(thebody)
            });
        };

        return Common;
    }()) || _class);
});
define('pantallas/contacto/index',['exports', 'jquery', '../../services/common', 'aurelia-dependency-injection', 'aurelia-framework', 'aurelia-validation', '../../resources/bootstrap-form-renderer', 'aurelia-router'], function (exports, _jquery, _common, _aureliaDependencyInjection, _aureliaFramework, _aureliaValidation, _bootstrapFormRenderer, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Pantalla1 = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Pantalla1 = exports.Pantalla1 = (_dec = (0, _aureliaDependencyInjection.inject)(_common.Common, _aureliaValidation.ValidationControllerFactory, _aureliaRouter.Router), _dec(_class = function () {
        function Pantalla1(common, controllerFactory, router) {
            _classCallCheck(this, Pantalla1);

            this.name = "";
            this.email = "";
            this.message = "";
            this.controller = null;

            this.router = router;
            this.common = common;
            this.controller = controllerFactory.createForCurrentScope();
            this.controller.addRenderer(new _bootstrapFormRenderer.BootstrapFormRenderer());
            this.theMail = {
                name: "",
                email: "",
                message: ""
            };
            this.showModal = false;
            this.theModal = "";
        }

        Pantalla1.prototype.sendData = function sendData() {
            var _this = this;

            this.controller.validate().then(function (result) {
                if (result.valid) {
                    _this.theMail = {
                        name: _this.name,
                        email: _this.email,
                        message: _this.message
                    };
                    _this.common.postData(_this.theMail);
                    _this.router.navigate('gracias');
                } else {
                    (0, _jquery2.default)('#exampleModal').modal('show');
                }
            });
        };

        return Pantalla1;
    }()) || _class);


    _aureliaValidation.ValidationRules.ensure(function (a) {
        return a.name;
    }).required().ensure(function (a) {
        return a.email;
    }).required().email().ensure(function (a) {
        return a.message;
    }).required().on(Pantalla1);
});
define('pantallas/error-404/index',["exports", "aurelia-framework", "aurelia-router"], function (exports, _aureliaFramework, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Error404 = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Error404 = exports.Error404 = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function Error404(router) {
            _classCallCheck(this, Error404);

            this.router = router;
        }

        Error404.prototype.redirect = function redirect() {
            this.router.navigate('');
        };

        return Error404;
    }()) || _class);
});
define('pantallas/gracias/index',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Gracias = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Gracias = exports.Gracias = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function Gracias(router) {
            _classCallCheck(this, Gracias);

            this.router = router;
        }

        Gracias.prototype.redirect = function redirect() {
            this.router.navigate('');
        };

        return Gracias;
    }()) || _class);
});
define('pantallas/nosotros/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Pantalla2 = exports.Pantalla2 = function Pantalla2() {
    _classCallCheck(this, Pantalla2);

    this.info = [{
      name: 'Tomás Giacaman - CTO',
      description: 'Jefe de desarrollo'
    }, {
      name: 'Guillermo Rodríguez - PM',
      description: 'Dirección de proyectos'
    }, {
      name: 'Yorka Ovalle - CFO',
      description: 'Administración y Finanzas'
    }, {
      name: 'Viviana Leiva - Front End Developer',
      description: 'Desarrollo de Front End'
    }, {
      name: 'Jaime Torres - Front End Developer',
      description: 'Desarrollo de Front End'
    }, {
      name: 'Rodrigo Bustamante - Front End Developer',
      description: 'Desarrollo de Front End'
    }, {
      name: 'Pablo Serrano - Senior Developer',
      description: 'Arquitectura y desarrollo'
    }, {
      name: 'Cristián Ormazábal - CEO',
      description: 'Dirección, planificación estratégica'
    }];
  };
});
define('resources/elements/loading-indicator',['exports', 'nprogress', 'aurelia-framework'], function (exports, _nprogress, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoadingIndicator = undefined;

  var _nprogress2 = _interopRequireDefault(_nprogress);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  _nprogress2.default.configure({ showSpinner: false, speed: 500 });

  var LoadingIndicator = exports.LoadingIndicator = (_dec = (0, _aureliaFramework.noView)(['nprogress/nprogress.css']), _dec(_class = (_class2 = function () {
    function LoadingIndicator() {
      _classCallCheck(this, LoadingIndicator);

      _initDefineProp(this, 'loading', _descriptor, this);
    }

    LoadingIndicator.prototype.loadingChanged = function loadingChanged(newValue) {
      if (newValue) {
        _nprogress2.default.start();
      } else {
        _nprogress2.default.done();
      }
    };

    return LoadingIndicator;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'loading', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class);
});
define('resources/value-converters/date',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateValueConverter = exports.DateValueConverter = function () {
    function DateValueConverter() {
      _classCallCheck(this, DateValueConverter);
    }

    DateValueConverter.prototype.toView = function toView(d, format) {
      var f = format ? format : 'DD/MM/YYYY';
      return (0, _moment2.default)(d).format(f);
    };

    DateValueConverter.prototype.fromView = function fromView(d) {
      return (0, _moment2.default)(d);
    };

    return DateValueConverter;
  }();
});
define('patch/bootstrap-datepicker/locale/bootstrap-datepicker.es',[], function () {
	"use strict";

	;(function ($) {
		$.fn.datepicker.dates['es'] = {
			days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
			daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
			daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
			months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
			monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
			today: "Hoy",
			monthsTitle: "Meses",
			clear: "Borrar",
			weekStart: 1,
			format: "dd/mm/yyyy"
		};
	})(jQuery);
});
define('resources/elements/benefits-box/benefits-box',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BenefitsBox = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

    var BenefitsBox = exports.BenefitsBox = (_class = function BenefitsBox() {
        _classCallCheck(this, BenefitsBox);

        _initDefineProp(this, "title", _descriptor, this);

        _initDefineProp(this, "description", _descriptor2, this);

        _initDefineProp(this, "image", _descriptor3, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "";
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "description", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "";
        }
    }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "image", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "";
        }
    })), _class);
});
define('resources/elements/change/change',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Change = exports.Change = function Change() {
        _classCallCheck(this, Change);
    };
});
define('resources/elements/client/client',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Client = exports.Client = function Client() {
        _classCallCheck(this, Client);
    };
});
define('resources/elements/contact-form/contact-form',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ContactForm = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

    var ContactForm = exports.ContactForm = (_dec = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), (_class = function ContactForm() {
        _classCallCheck(this, ContactForm);

        _initDefineProp(this, 'name', _descriptor, this);

        _initDefineProp(this, 'email', _descriptor2, this);

        _initDefineProp(this, 'message', _descriptor3, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'name', [_dec], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'email', [_dec2], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'message', [_dec3], {
        enumerable: true,
        initializer: null
    })), _class));
});
define('resources/elements/footer/footer',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Footer = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Footer = exports.Footer = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function Footer(router) {
    _classCallCheck(this, Footer);

    this.white = {
      color: 'white'
    };
    this.router = router;
  }) || _class);
});
define('resources/elements/modal/modal',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Modal = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2;

  var Modal = exports.Modal = (_class = function Modal() {
    _classCallCheck(this, Modal);

    _initDefineProp(this, "idModal", _descriptor, this);

    _initDefineProp(this, "value", _descriptor2, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "idModal", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "value", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('resources/elements/partners-box/partners-box',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PartnersBox = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

    var PartnersBox = exports.PartnersBox = (_class = function PartnersBox() {
        _classCallCheck(this, PartnersBox);

        _initDefineProp(this, "name", _descriptor, this);

        _initDefineProp(this, "description", _descriptor2, this);

        _initDefineProp(this, "img", _descriptor3, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "name", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "";
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "description", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "";
        }
    }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "img", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "";
        }
    })), _class);
});
define('resources/elements/servicios/servicios',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Servicios = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

  var Servicios = exports.Servicios = (_class = function Servicios() {
    _classCallCheck(this, Servicios);

    _initDefineProp(this, "image", _descriptor, this);

    _initDefineProp(this, "title", _descriptor2, this);

    _initDefineProp(this, "description", _descriptor3, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "image", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "title", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "description", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  })), _class);
});
define('resources/elements/slider/slider',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Slider = exports.Slider = function Slider() {
        _classCallCheck(this, Slider);

        $(document).ready(function () {
            $('.carousel').carousel({
                interval: 5000
            });
        });
    };
});
define('resources/elements/solution/solution',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Solution = exports.Solution = function Solution() {
        _classCallCheck(this, Solution);

        this.solution = [{ title: 'Asesorías Informáticas', image: 'img//solution/Asesoria.png', description: 'Asesoramos a nuestros clientes en la elección de tecnologías que permitan el crecimiento y estabilidad de sus negocios.' }, { title: 'Desarrollo de Soluciones', image: 'img//solution/DispositivosMoviles.png', description: 'Utilizamos tecnologías de punta implementadas con estándares del mercado y metodologías ágiles.' }, { title: 'Integración de Soluciones', image: 'img//solution/IntegracionSoluciones.png', description: 'Integramos soluciones que habilitan el funcionamiento armónico y ágil de las organizaciones.' }, { title: 'Desarrollo para Móviles', image: 'img//solution/DesarrolloSoftware.png', description: 'Habilitamos el uso de plataformas móviles en su negocio permitiendo expadir sus fronteras y llegar a más clientes.' }, { title: 'Consultoría Especializada', image: 'img//solution/Consultoria.png', description: 'Aconsejamos sobre el uso eficiente de las tecnologías de la información, habilitando el cumplimiento de objetivos.' }];
    };
});
define('pantallas/routes',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var RootPath = 'pantallas';
  var RoutePantalla1 = 'pantalla1';
  var RoutePantalla2 = 'pantalla2';

  var routes = [{ name: 'about', route: 'about', moduleId: RootPath + '/' + RoutePantalla1 + '/index', nav: true, title: 'Quiénes Somos', settings: { iconClass: 'fa-cog' } }, { name: 'services', route: 'services', moduleId: RootPath + '/' + RoutePantalla1 + '/index', nav: true, title: 'Servicios', settings: { iconClass: 'fa-cog' } }, { name: 'contact', route: 'contact', moduleId: RootPath + '/' + RoutePantalla1 + '/index', nav: true, title: 'Contacto', settings: { iconClass: 'fa-cog' } }];

  exports.default = routes;
});
define('pantallas/benefits/benefits',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Benefits = exports.Benefits = function Benefits() {
        _classCallCheck(this, Benefits);

        this.services = [{ title: 'Asesorías Informáticas', image: 'http://www.merchise.cl/img/IconServicios/Asesoria.png', description: 'Analizamos problemas en los proceso empresariales, ofrecemos soluciones que mejoran el rendimiento y reducen costos.' }, { title: 'Consultoría Especializada', image: 'http://www.merchise.cl/img/IconServicios/Consultoria.png', description: 'Aconcejamos sobre el uso eficiente de las tecnologías de la información, habilitando el cumplimiento de objetivos.' }, { title: 'Integracion de Soluciones', image: 'http://www.merchise.cl/img/IconServicios/IntegracionSoluciones.png', description: 'Integramos soluciones que habilitan el funcionamiento armónico y ágil de las organizaciones.' }, { title: 'Desarrollo para Dispositivos Móviles', image: 'http://www.merchise.cl/img/IconServicios/DispositivosMoviles.png', description: 'Permitimos a las empresas tener presencia en el dispositivo que sus clientes siempre llevan encima.' }, { title: 'Desarrollo de Software', image: 'http://www.merchise.cl/img/IconServicios/DesarrolloSoftware.png', description: 'Desarrollamos diferentes tipos de software con múltiples arquitecturas, lenguajes de programación y tecnologías.' }];
    };
});
define('pantallas/gracias/gracias',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Gracias = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Gracias = exports.Gracias = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function Gracias(router) {
            _classCallCheck(this, Gracias);

            this.router = router;
        }

        Gracias.prototype.redirect = function redirect() {
            this.router.navigate('');
        };

        return Gracias;
    }()) || _class);
});
define('pantallas/pantalla1/index',['exports', 'jquery', '../../services/common', 'aurelia-dependency-injection', 'aurelia-framework', 'aurelia-validation', '../../resources/bootstrap-form-renderer', 'aurelia-router'], function (exports, _jquery, _common, _aureliaDependencyInjection, _aureliaFramework, _aureliaValidation, _bootstrapFormRenderer, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Pantalla1 = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Pantalla1 = exports.Pantalla1 = (_dec = (0, _aureliaDependencyInjection.inject)(_common.Common, _aureliaValidation.ValidationControllerFactory, _aureliaRouter.Router), _dec(_class = function () {
        function Pantalla1(common, controllerFactory, router) {
            _classCallCheck(this, Pantalla1);

            this.name = "";
            this.email = "";
            this.message = "";
            this.controller = null;

            this.router = router;
            this.common = common;
            this.controller = controllerFactory.createForCurrentScope();
            this.controller.addRenderer(new _bootstrapFormRenderer.BootstrapFormRenderer());
            this.theMail = {
                name: "",
                email: "",
                message: ""
            };
            this.showModal = false;
            this.theModal = "";
        }

        Pantalla1.prototype.sendData = function sendData() {
            var _this = this;

            this.controller.validate().then(function (result) {
                if (result.valid) {
                    _this.theMail = {
                        name: _this.name,
                        email: _this.email,
                        message: _this.message
                    };
                    _this.common.postData(_this.theMail);
                    _this.router.navigate('gracias');
                } else {
                    (0, _jquery2.default)('#exampleModal').modal('show');
                }
            });
        };

        return Pantalla1;
    }()) || _class);


    _aureliaValidation.ValidationRules.ensure(function (a) {
        return a.name;
    }).required().ensure(function (a) {
        return a.email;
    }).required().email().ensure(function (a) {
        return a.message;
    }).required().on(Pantalla1);
});
define('pantallas/pantalla2/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Pantalla2 = exports.Pantalla2 = function Pantalla2() {
    _classCallCheck(this, Pantalla2);

    this.info = [{
      name: 'Tomás Giacaman - CTO',
      description: 'Jefe de desarrollo'
    }, {
      name: 'Guillermo Rodríguez - PM',
      description: 'Dirección de proyectos'
    }, {
      name: 'Yorka Ovalle - CFO',
      description: 'Administración y Finanzas'
    }, {
      name: 'Viviana Leiva - Front End Developer',
      description: 'Desarrollo de Front End'
    }, {
      name: 'Jaime Torres - Front End Developer',
      description: 'Desarrollo de Front End'
    }, {
      name: 'Rodrigo Bustamante - Front End Developer',
      description: 'Desarrollo de Front End'
    }, {
      name: 'Pablo Serrano - Senior Developer',
      description: 'Arquitectura y desarrollo'
    }, {
      name: 'Cristián Ormazábal - CEO',
      description: 'Dirección, planificación estratégica'
    }];
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><body id=theBody><require from=resources/elements/loading-indicator></require><require from=nav-bar></require><loading-indicator loading.bind=router.isNavigating></loading-indicator><nav-bar router.bind=router></nav-bar><div class=page-host><router-view></router-view><footer></footer></div></body></template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=router><nav class=\"navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top\" role=navigation><a class=navbar-brand href=#><img src=../img/logo-ormasoft-grande.png></a><button class=navbar-toggler type=button data-toggle=collapse data-target=#navbarSupportedContent aria-controls=navbarSupportedContent aria-expanded=false aria-label=\"Toggle navigation\"><span class=navbar-toggler-icon></span></button><div class=\"collapse navbar-collapse\" id=navbarSupportedContent><ul class=\"navbar-nav mr-auto\"><li class=nav-item repeat.for=\"nav of router.navigation\"><a class=\"nav-link ${nav.isActive ? 'active' : ''}\" href.bind=nav.href>${nav.title}</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li class=loader if.bind=router.isNavigating><i class=\"fa fa-spinner fa-spin fa-2x\"></i></li></ul></div></nav></template>"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template><section><div class=container-fluid><div class=row><div class=col-12><div align=center><slider></slider></div></div></div><change></change><solution></solution><hr><client></client><hr></div></section></template>"; });
define('text!pantallas/contacto/index.html', ['module'], function(module) { module.exports = "<template><style>#coloTxt{color:#000}#exampleModal{display:none}</style><div class=\"modal fade\" id=exampleModal tabindex=-1 role=dialog aria-labelledby=exampleModalLabel aria-hidden=true><div class=modal-dialog role=document><div class=modal-content><div class=modal-header><h5 class=modal-title id=exampleModalLabel>Datos incorrectos!</h5><button type=button class=close data-dismiss=modal aria-label=Close><span aria-hidden=true>&times;</span></button></div><div class=modal-body>Favor ingresar los datos correspondientes.</div></div></div></div><div class=container><div class=row><div class=col-md-6><header class=main-header><div class=container><h1 class=page-title>Contacto</h1></div></header><div class=col-md-12><form><div class=form-group><label for=name><i class=\"fa fa-user\" aria-hidden=true></i>&nbsp; Nombre</label><input id=coloTxt class=form-control value.bind=\"name & validate\" type=text></div><div class=form-group><label for=email><i class=\"fa fa-envelope\" aria-hidden=true></i>&nbsp; Correo electrónico</label><input id=coloTxt class=form-control value.bind=\"email & validate\" type=email></div><div class=form-group><label><i class=\"fa fa-comment\" aria-hidden=true></i>&nbsp; Mensaje</label><textarea id=coloTxt value.bind=\"message & validate\" cols=30 rows=10 class=form-control></textarea></div><div class=form-group><button type=submit class=\"btn btn-primary btn-block\" click.trigger=sendData() data-target=#exampleModal>Enviar mensaje</button></div></form></div></div><div class=col-md-6><iframe style=margin:16px src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.9225305254354!2d-70.61472958465437!3d-33.45132480494354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf8f9cfbde71%3A0xb4978e8ef1197ce4!2zQXYuIFNpbcOzbiBCb2zDrXZhciAxODQwLCDDkXXDsW9hLCBSZWdpw7NuIE1ldHJvcG9saXRhbmE!5e0!3m2!1ses-419!2scl!4v1519243251454\" width=100% height=400 frameborder=0 style=border:0 allowfullscreen></iframe></div></div></div></template>"; });
define('text!pantallas/error-404/index.html', ['module'], function(module) { module.exports = "<template><style>.center-text{text-align:center}.padding{padding-top:200px;padding-bottom:200px}.grey{color:#666}</style><div class=\"container-fluid padding\" align=center><div class=row><div class=col-12><div class=center-text><h1>404</h1><h2>Página no encontrada</h2><h5><button class=\"btn btn-link grey\" click.trigger=redirect()>Preciona aquí para volver al inicio</button></h5></div></div></div></div></template>"; });
define('text!pantallas/gracias/index.html', ['module'], function(module) { module.exports = "<template><style>.center-text{text-align:center}.padding{padding-top:200px;padding-bottom:200px}.grey{color:#666}</style><div class=\"container-fluid padding\"><div class=center-text><h2>¡Gracias por contactarte con nosotros!</h2><h5><button click.trigger=redirect() type=submit class=\"btn btn-link grey\">Volver a la página de inicio</button></h5></div></div></template>"; });
define('text!pantallas/nosotros/index.html', ['module'], function(module) { module.exports = "<template><header style=\"background-color:#f1f1f1;border:solid 1px #ddd\"><div style=background-color:#ddd;margin-top:-30px;padding:20px class=container-fluid><h2 style=color:#333;border-color:#333>Quiénes Somos</h2></div></header><div class=container-fluid style=margin-top:52px><div repeat.for=\"item of info\"><partners-box img=\"${item.image}\" name=\"${item.name}\" description=\"${item.description}\"></partners-box></div></div></template>"; });
define('text!resources/elements/benefits-box/benefits-box.html', ['module'], function(module) { module.exports = "<template><style>#mediumBoxCont{background-color:#dcdcdc;width:400px;height:500px;margin-bottom:20px}#imageMD{text-align:center;width:100%;height:200px}#titMD{margin:8px}#descripMD{margin:16px 8px}#buttonMD{margin:8px;color:#fff;background-color:#f23630}#card{width:18rem;margin-bottom:20px}</style><div class=col-4><div class=card id=card><img class=card-img-top id=imageMD src=\"${image}\" alt=\"${image}\"><h5 class=card-title id=titMD>${title}</h5><p class=card-text id=descripMD>${description}</p><button class=\"btn btn-default\" id=buttonMD type=button><slot></slot></button></div></div></template>"; });
define('text!resources/elements/change/change.html', ['module'], function(module) { module.exports = "<template><section class=\"container-fluid fondoChange\"><div class=row><div class=\"d-flex justify-content-around col-md-5 princChange\"><div class=\"offset-md-4 contChange\"><h3 class=h3Chang>Aceptamos el desafío</h3><p>Nuestro desafío es encontrar soluciones tecnológicas, que le permitan a nuestro cliente un desarrollo óptimo y diferenciador de su negocio, promoviendo un proceso de integración y perfeccionamiento de sistemas en el ámbito empresarial.</p><p>Entregamos soluciones para la gama de dispositivos disponibles en el mercado, habilitando la incorporación de la movilidad y el Cloud Computing.</p></div></div><div class=col-md-7><div class=imgChange><img src=http://www.merchise.cl/img/mac.png class=img-fluid></div></div></div></section></template>"; });
define('text!resources/elements/client/client.html', ['module'], function(module) { module.exports = "<template><section><div class=container-fluid><div class=row><div class=col-12><h3 class=h3Client>Nuestros clientes</h3><div class=row><div class=col><a href=http://www.merchise.cl/ ><img src=img/clientes/merchise.png alt=merchise class=\"img-responsive imgClient\"></a></div><div class=col><a href=http://beacon42.com/ ><img src=img/clientes/beacon42.jpg alt=merchise class=\"img-responsive imgClient\"></a></div><div class=col><a href=http://www.mundomovil.cl/ ><img src=img/clientes/mundomovil.png alt=clients class=\"img-responsive imgClient\"></a></div><div class=col><a href=https://www.rayensalud.com/ ><img src=img/clientes/rayen.jpg alt=clients class=\"img-responsive imgClient\"></a></div><div class=col><a href=http://www.vsti.cl/About.htm><img src=img/clientes/vsti.png alt=clients class=\"img-responsive imgClient\"></a></div></div></div></div></div></section></template>"; });
define('text!resources/elements/contact-form/contact-form.html', ['module'], function(module) { module.exports = "<template><style></style><header class=main-header><div class=container><h1 class=page-title>Contacto</h1></div></header><div class=col-md-12><form><div class=form-group><label for=name><i class=\"fa fa-user\" aria-hidden=true></i>&nbsp; Nombre</label><input id=coloTxt class=form-control value.bind=name type=text></div><div class=form-group><label for=email><i class=\"fa fa-envelope\" aria-hidden=true></i>&nbsp; Correo electrónico</label><input id=coloTxt class=form-control value.bind=email type=email></div><div class=form-group><label><i class=\"fa fa-comment\" aria-hidden=true></i>&nbsp; Mensaje</label><textarea id=coloTxt value.bind=message cols=30 rows=10 class=form-control></textarea></div><slot></slot></form></div></template>"; });
define('text!resources/elements/footer/footer.html', ['module'], function(module) { module.exports = "<template bindable=router><div id=footer><div class=\"container py-5\"><div class=row><div class=col-md><div class=\"\"><h5>Mapa del sitio</h5><ul class=list-unstyled><li repeat.for=\"nav of router.navigation\"><a style.bind=white href.bind=nav.href>${nav.title}</a></li></ul></div></div><div class=\"col-6 col-md\"><h5>Contacto Ormasoft</h5><ul class=\"list-unstyled text-small\"><li class=text-muted><span><a style.bind=white target=_blank href=\"https://www.google.cl/maps/place/Av.+Sim%C3%B3n+Bol%C3%ADvar+1840,+%C3%91u%C3%B1oa,+Regi%C3%B3n+Metropolitana/data=!4m2!3m1!1s0x9662cf8f9cfbde71:0xb4978e8ef1197ce4?sa=X&ved=0ahUKEwijn8erjbzZAhWHD5AKHbiaCCgQ8gEIJDAA\">Simón Bolívar 1840, Ñuñoa, Santiago de Chile</a></span></li><li class=text-muted><span><a style.bind=white href=mailto:contacto@ormasoft.cl>contacto@ormasoft.cl</a></span></li></ul><img src=img/logo-ormasoft-grande.png alt=\"\"></div></div></div></div><div id=theFooter><p class=\"d-block mb-3 text-muted\">© 2014 - 2018 &nbsp;&nbsp;<a style.bind=white href=#>Ormasoft</a></p></div></template>"; });
define('text!resources/elements/modal/modal.html', ['module'], function(module) { module.exports = "<template><slot></slot><div class=\"modal fade\" id=exampleModal tabindex=-1 role=dialog aria-labelledby=exampleModalLabel aria-hidden=true><div class=modal-dialog role=document><div class=modal-content><div class=modal-header><h5 class=modal-title id=exampleModalLabel>Datos incorrectos!</h5><button type=button class=close data-dismiss=modal aria-label=Close><span aria-hidden=true>&times;</span></button></div><div class=modal-body>Favor ingresar los datos correspondientes.</div></div></div></div></template>"; });
define('text!resources/elements/partners-box/partners-box.html', ['module'], function(module) { module.exports = "<template><ul><div class=\"media row\"><div class=\"media-body col-sm col-md col-xs contPartners\"><h3 class=mt-0>${name}</h3><p class=mb-0>${description}</p></div></div><hr></ul></template>"; });
define('text!resources/elements/servicios/servicios.html', ['module'], function(module) { module.exports = "<template><style>#titleBoxes{margin:24px 64px}#smallBoxCont{margin:24px}</style><div class=\"col-md-6 float-sm-left\"><div class=row><div class=\"col-lg-2 col-md-3 col-sm-2\"><img src=\"${image}\" width=50px height=50px></div><div class=\"col-lg-6 col-md-6 col-sm-6\"><h4>${title}</h4><p>${description}</p></div></div></div></template>"; });
define('text!resources/elements/slider/slider.html', ['module'], function(module) { module.exports = "<template><div class=contenedor><div id=carousel class=\"carousel slide\" data-ride=carousel><ol class=carousel-indicators><li data-target=#carousel data-slide-to=0 class=active></li><li data-target=#carousel data-slide-to=1></li><li data-target=#carousel data-slide-to=2></li></ol><div class=carousel-inner><div class=\"carousel-item active\"><img class=\"d-block w-100 image-slider\" src=img/slider/slider4.jpg alt=\"First slide\"><div class=\"carousel-caption d-md-block\"><div class=\"row justify-content-start\"><div class=\"col-12 col-sm-12 col-md-12 d-none d-sm-block\"><h2 class=slider-text>Líderes en el mercado</h2><h4 class=slider-text>Identificamos y entendemos sus necesidades informáticas</h4><h5 class=slider-text>Encontramos soluciones tecnológicas</h5><h5 class=slider-text>Proveemos servicios personalizados y a la medida</h5><h5 class=slider-text>Brindamos asesorías, soporte y consultoría de calidad</h5><p class=slider-text>Nos caracteriza nuestra capacidad de adaptación, soluciones con total garantía y excelencia tecnológica.</p></div></div></div></div><div class=carousel-item><img class=\"d-block w-100 image-slider\" src=img/slider/slider2.jpg alt=\"Second slide\"><div class=\"carousel-caption d-none d-md-block\"><div class=\"row justify-content-start\"><div class=\"col-12 col-sm-12 col-md-12 d-none d-sm-block\"><h2 class=slider-text>Tecnologías</h2><h4 class=slider-text>Identificamos y entendemos sus necesidades informáticas</h4><h5 class=slider-text>HTML 5, CSS 3.0, Diseño responsivo</h5><h5 class=slider-text>Plataformas Móviles, IOS, Android, Windows Phone</h5><h5 class=slider-text>Team Foundation Server, GitHub, MVC</h5><p class=slider-text>Entregamos soluciones que emplean las últimas metodologías utilizando Scrum, Domain-driven desing, Test-driven development.</p></div></div></div></div><div class=carousel-item><img class=\"d-block w-100 image-slider\" src=img/slider/slider1.jpg alt=\"Third slide\"><div class=\"carousel-caption d-none d-md-block\"><div class=\"row justify-content-start\"><div class=\"col-12 col-sm-12 col-md-12 d-none d-sm-block\"><h2 class=slider-text>Servicios profesionales eficientes</h2><h4 class=slider-text>Identificamos y entendemos sus necesidades informáticas</h4><h5 class=slider-text>Asesorías y consultorías informáticas</h5><h5 class=slider-text>Desarrollo de software a medida</h5><h5 class=slider-text>Soluciones para dispositivos y aplicaciones móviles</h5><p class=slider-text>Nos caracteriza nuestra capacidad de adaptación, soluciones con total garantía y excelencia tecnológica.</p></div></div></div></div></div><a class=carousel-control-prev href=#carousel role=button data-slide=prev><span class=carousel-control-prev-icon aria-hidden=true></span><span class=sr-only>Previous</span></a><a class=carousel-control-next href=#carousel role=button data-slide=next><span class=carousel-control-next-icon aria-hidden=true></span><span class=sr-only>Next</span></a></div></div></template>"; });
define('text!resources/elements/solution/solution.html', ['module'], function(module) { module.exports = "<template><section class=\"row align-items-center justify-content-center\"><div repeat.for=\"item of solution\"><div class=\"card contSol\"><div class=\"content-box box-default animated fadeInUp animation-delay-10 contentSol\"><img src=\"${item.image}\" class=\"img-responsive center-block\"><h4 class=\"content-box-title titleSol\">${item.title}</h4><p>${item.description}</p></div></div></div></section></template>"; });
define('text!pantallas/benefits/benefits.html', ['module'], function(module) { module.exports = "<template><style>#titleBoxes{margin:24px 64px}#smallBoxCont{margin:24px}#titleSuccessCases{text-align:center}#theBenefitsBox{margin:24px}#image{margin-top:-30px;margin-bottom:30px}</style><div><img id=image src=http://www.createga.org/wp-content/uploads/2014/12/Equipo-750x375.jpg width=100% height=450px alt=\"\"><h2>Servicios</h2><hr><div class=row><section class=smallBoxCont style=width:1400px;margin-left:100px><div repeat.for=\"service of services\"><servicios image=\"${service.image}\" title=\"${service.title}\" description=\"${service.description}\"></servicios></div></section></div><h2>Casos de éxito</h2><hr><div class=row><section style=width:1400px;margin-left:100px><div class=row><div repeat.for=\"success of successes\"><benefits-box image=\"${success.image}\" title=\"${success.title}\" description=\"${success.description}\">Leer más</benefits-box></div></div></section></div></div></template>"; });
define('text!pantallas/gracias/gracias.html', ['module'], function(module) { module.exports = "<template><style>.center-text{text-align:center}.padding{padding-top:200px;padding-bottom:200px}.grey{color:#666}</style><div class=\"container-fluid padding\"><div class=center-text><h2>¡Gracias por contactarte con nosotros!</h2><h5><button click.trigger=redirect() type=submit class=\"btn btn-link grey\">Volver a la página de inicio</button></h5></div></div></template>"; });
define('text!pantallas/pantalla1/index.html', ['module'], function(module) { module.exports = "<template><style>#coloTxt{color:#000}#exampleModal{display:none}</style><div class=\"modal fade\" id=exampleModal tabindex=-1 role=dialog aria-labelledby=exampleModalLabel aria-hidden=true><div class=modal-dialog role=document><div class=modal-content><div class=modal-header><h5 class=modal-title id=exampleModalLabel>Datos incorrectos!</h5><button type=button class=close data-dismiss=modal aria-label=Close><span aria-hidden=true>&times;</span></button></div><div class=modal-body>Favor ingresar los datos correspondientes.</div></div></div></div><div class=container><div class=row><div class=col-md-6><header class=main-header><div class=container><h1 class=page-title>Contacto</h1></div></header><div class=col-md-12><form><div class=form-group><label for=name><i class=\"fa fa-user\" aria-hidden=true></i>&nbsp; Nombre</label><input id=coloTxt class=form-control value.bind=\"name & validate\" type=text></div><div class=form-group><label for=email><i class=\"fa fa-envelope\" aria-hidden=true></i>&nbsp; Correo electrónico</label><input id=coloTxt class=form-control value.bind=\"email & validate\" type=email></div><div class=form-group><label><i class=\"fa fa-comment\" aria-hidden=true></i>&nbsp; Mensaje</label><textarea id=coloTxt value.bind=\"message & validate\" cols=30 rows=10 class=form-control></textarea></div><div class=form-group><button type=submit class=\"btn btn-primary btn-block\" click.trigger=sendData() data-target=#exampleModal>Enviar mensaje</button></div></form></div></div><div class=col-md-6><iframe style=margin:16px src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.9225305254354!2d-70.61472958465437!3d-33.45132480494354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf8f9cfbde71%3A0xb4978e8ef1197ce4!2zQXYuIFNpbcOzbiBCb2zDrXZhciAxODQwLCDDkXXDsW9hLCBSZWdpw7NuIE1ldHJvcG9saXRhbmE!5e0!3m2!1ses-419!2scl!4v1519243251454\" width=100% height=400 frameborder=0 style=border:0 allowfullscreen></iframe></div></div></div></template>"; });
define('text!pantallas/pantalla2/index.html', ['module'], function(module) { module.exports = "<template><header style=\"background-color:#f1f1f1;border:solid 1px #ddd\"><div style=background-color:#ddd;margin-top:-30px;padding:20px class=container-fluid><h2 style=color:#333;border-color:#333>Quiénes Somos</h2></div></header><div class=container-fluid style=margin-top:52px><div repeat.for=\"item of info\"><partners-box img=\"${item.image}\" name=\"${item.name}\" description=\"${item.description}\"></partners-box></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map