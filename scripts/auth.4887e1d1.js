!function(){"use strict";angular.module("sdx.constants",["sdx.envConfig"]).constant("toastrNoDismiss",{autoDismiss:!1,closeButton:!1,progressBar:!1,timeOut:0}).factory("API",["API_URL",function(a){return{BASE:a,ARSENAL:{BASE:a+"/api/mantenedores/MNT0003",COUNT:a+"/api/mantenedores/MNT0004"},ARTI:{BASE:a+"/api/mantenedores/ARTI_ARTICULO"},AUTH:{LOGIN:a+"/token",TICKET:function(b,c){return a+"/ticket/"+b+"/"+c},ISVALID:a+"/verifyToken",GET_USER_INFO:a+"/api/Account/UserInfo"},NOD:{BASE:a+"/api/mantenedores/NOD_NODO"},CTDA:{BASE:a+"/api/mantenedores/CTDA_CLASIFIACION_TIPO_ATENCION"},CITA:{BASE:a+"/api/mantenedores/CIT_CITA"},FNP:{BASE:a+"/api/mantenedores/FNP_FUNCIONARIO_PRESTADOR"},MPY:{BASE:a+"/api/mantenedores/MPY_MAESTRO_PARAMETROS_RAYEN"},PRA:{BASE:a+"/api/mantenedores/PRA_PARAMETROS_RAYEN"},GUID:{BASE:a+"/api/account/user"},TREC:{BASE:a+"/api/mantenedores/TREC_TIPO_RECETA",GET_RL_TREC_NOD:a+"/api/mantenedores/TREC_TIPO_RECETA?$expand=RL_TREC_NOD",RL_TREC_NOD:a+"/api/mantenedores/RL_TREC_NOD"},TDA:{BASE:a+"/api/mantenedores/TDA_TIPO_DE_ATENCION",TDAG:a+"/api/mantenedores/TDAG_TIPO_ATENCION_GENERICO",RL_TDAG_TDA:a+"/api/mantenedores/RL_ATDAG_TDA"},UNI:{BASE:a+"/api/mantenedores/UNID_UNIDAD"},LINE:{BASE:a+"/api/mantenedores/LINE_LINEA"},MSA:{BASE:a+"/api/mantenedores/MSA_SOLICITUD_ARTICULO"},MES:{BASE:a+"/api/mantenedores/MES_ESTADO_SOLICITUD_ARTICULO"},MHS:{BASE:a+"/api/mantenedores/MHS_HISTORIAL_SOLICITUD"},USER:{BASE:a+"/api/Account/userinfo"},ACCOUNT:{BASE:a+"/api/Account/USER",COUNT:"",PUT:a+"/api/Account/USER",ROLES:a+"/api/Account/USERROLE"},ROLES:{BASE:a+"/api/Account/ROLES",PERMISSIONS:a+"/api/Account/ROLESPERMISSIONS",EMPTY:a+"/api/Account/ROLES/ISEMPTY"},RECETA:{BASE:a+"/api/mantenedores/MNT0012",COUNT:a+"/api/mantenedores/MNT0013"},PRES:{BASE:a+"/api/mantenedores/PRES_PRESCRIPCION"},SGH:{BASE:a+"/api/mantenedores/SGH_SEGMENTOS_HORARIOS"},BODE:{BASE:a+"/api/mantenedores/BODE_BODEGA"},RL_BODEARTI:{BASE:a+"/api/mantenedores/RL_BODE_ARTI"}}}])}(),function(){"use strict";function a(){return function(a){return a?a.replace(/([^\W_]+[^\s-]*) */g,function(a){return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase()}):""}}angular.module("sdx.utils",[]).filter("capitalize",a)}(),function(){"use strict";function a(a,b,c,d,e,f,g,h){b.defaults.headers.common.Authorization=function(){return c.getCurrentStaffMemberAuthorization()},a.$emit("rootScope:restoreState"),g.onbeforeunload=function(){a.$emit("rootScope:saveState")};var i;a.$on("$stateChangeStart",function(b,g,h,i,j){g.data&&g.data.permisoEntrada&&(e.clear(),b.preventDefault(),c.CurrentStaffMemberHasPermission(g.data.permisoEntrada)?d.go(g.name,h,{notify:!1}).then(function(){a.$broadcast("$stateChangeSuccess",g,h,i,j)}):(e.error("Usted no tiene acceso a módulo: "+g.data.titulo,"",f),c.isStaffMemberLogged()||c.goToLoginPage()))}),a.$on("$stateChangeError",function(a,b,c,d,g,i){e.clear(),h.error("event was:",a),h.error("error was:",i),e.error(angular.isString(i)?i:"Evento no esperado",b.data.titulo,f),a.preventDefault()}),a.$on("$stateChangeSuccess",function(){e.clear(i),$(document).scrollTop(0)})}angular.module("sdx.login",["sdx.constants","ngSanitize","ngAnimate","toastr","ui.router","sdx.utils"]).run(a),a.$inject=["$rootScope","$http","loginService","$state","toastr","toastrNoDismiss","$window","$log"]}(),function(){"use strict";angular.module("sdx.login").constant("PERMISSIONS",{MANTENEDOR:{CONSULTAR_ARTICULO:"CONSULTAR_ARTICULO",VER_DETALLE_ARTICULO:"VER_DETALLE_ARTICULO",CONSULTAR_SOLICITUD_ARTICULO:"CONSULTAR_SOLICITUD_ARTICULO",CREAR_SOLICITUD_ARTICULO:"CREAR_SOLICITUD_ARTICULO",PASIVAR_ARTICULO:"PASIVAR_ARTICULO",CREAR_ARTICULO:"CREAR_ARTICULO",APROBAR_SOLICITUD_FARMACO:"APROBAR_SOLICITUD_FARMACO",APROBAR_SOLICITUD_INSUMO:"APROBAR_SOLICITUD_INSUMO",LISTAR_RECETA:"LISTAR_RECETA",MODIFICAR_RECETA:"MODIFICAR_RECETA",ELIMINAR_RECETA:"ELIMINAR_RECETA",AGREGAR_RECETA:"AGREGAR_RECETA",LISTAR_PERFIL:"LISTAR_PERFIL",MODIFICAR_PERFIL:"MODIFICAR_PERFIL",DESACTIVAR_PERFIL:"DESACTIVAR_PERFIL",CREAR_PERFIL:"CREAR_PERFIL",LISTAR_USUARIO:"LISTAR_USUARIO",MODIFICAR_USUARIO:"MODIFICAR_USUARIO",DESACTIVAR_USUARIO:"DESACTIVAR_USUARIO",CREAR_USUARIO:"CREAR_USUARIO",LISTAR_PARAMETRO:"LISTAR_PARAMETRO",MODIFICAR_PARAMETRO:"MODIFICAR_PARAMETRO",DESACTIVAR_PARAMETRO:"DESACTIVAR_PARAMETRO",LISTAR_TIPOS_CONSULTA:"LISTAR_TIPOS_CONSULTA",MODIFICAR_TIPO_CONSULTA:"MODIFICAR_TIPO_CONSULTA",ELIMINAR_TIPO_CONSULTA:"ELIMINAR_TIPO_CONSULTA",AGREGAR_TIPO_CONSULTA:"AGREGAR_TIPO_CONSULTA"}})}(),function(){"use strict";function a(a,b,c,d,e,f,g){var h=this;h.eliminarPermisosDuplicados=function(a){for(var b=[],c=0;c<a.length;c++){var d=b.filter(function(b){return b==a[c]});0==d.length&&b.push(a[c])}return b},h.toConsumableArray=function(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)},h.staff={},h.currentStaffMemberId=null,h.facilities=[],h.currentFacility={Id:null,Name:null},h.tiposGlobales={perfiles:[]},h.resetCurrentFacility=function(){h.currentFacility&&(h.staff.hasOwnProperty(h.currentFacility.Id)&&delete h.staff[h.currentFacility.Id],h.tokens.hasOwnProperty(h.currentFacility.Id)&&delete h.tokens[h.currentFacility.Id]),h.currentFacility={Id:null,Name:null}},h.token=void 0,h.setToken=function(a){h.token=a},h.updateProfile=function(a,b){h.staff.Profile=b,h.staff.Profile.fullname=g("capitalize")(b.Name+" "+b.FathersFamilyName+" "+b.MothersFamilyName)},h.addStaffMember=function(a,b,c,d,e){return angular.isUndefined(d)&&(d=!1),a.Password=void 0,h.updateProfile(c),h.setToken(b),h.staff};var i={};return i.getCurrentStaffMember=function(){return h.staff?h.staff:null},i.getCurrentStaffMemberAuthorization=function(){return h.token?"Bearer "+h.token:void 0},i.CurrentStaffMemberIsActive=function(){return h.staff&&!h.staff.Locked?!0:!1},i.CurrentStaffMemberHasPermission=function(a){return h.staff&&h.staff.Profile&&h.staff.Profile.Permisos&&-1!=h.staff.Profile.Permisos.indexOf(a)?!0:!1},i.memberHasPermission=function(a){return i.getCurrentStaffMember()?i.CurrentStaffMemberHasPermission(a):!1},i.memberIsType=function(a){var b=i.getCurrentStaffMember();return b?a?i.getCurrentStaffMember().HealthPractitionerType.Id===a:!!i.getCurrentStaffMember().HealthPractitionerType.Id:void 0},i.isStaffMemberLogged=function(){return h.staff&&h.staff.Profile?!0:!1},i.logout=function(){return h.staff?(delete h.staff,h.token&&delete h.token,!0):!1},i.login=function(a,c){"admin"!=a.toLowerCase()&&(a=a.toUpperCase());var f="username="+a+"&password="+c+"&grant_type=password";return b({url:e.AUTH.LOGIN,method:"POST",data:f,headers:{Authorization:"Basic VEVTVDpURVNU",Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"}}).then(function(a){return a&&a.data&&a.data.access_token?(h.setToken(a.data.access_token),b.get(e.ROLES.BASE).then(function(a){return h.tiposGlobales.perfiles=a.data,b.get(e.ROLES.PERMISSIONS).then(function(a){for(var b=0;b<h.tiposGlobales.perfiles.length;b++){var c=a.data.filter(function(a){return a.ID==h.tiposGlobales.perfiles[b].Id});c.length>0?h.tiposGlobales.perfiles[b].permisos=c:h.tiposGlobales.perfiles[b].permisos=[]}return i.getUserInfo().then(function(a){null==a.data.Permisos||""==a.data.Permisos?a.data.Permisos=[]:a.data.Permisos=a.data.Permisos.split(","),null==a.data.Restricciones||""==a.data.Restricciones?a.data.Restricciones=[]:a.data.Restricciones=a.data.Restricciones.split(",");for(var b=0;b<a.data.Roles.length;b++)for(var c=0;c<h.tiposGlobales.perfiles.length;c++)if(h.tiposGlobales.perfiles[c].Name==a.data.Roles[b]){for(var d=[],e=0;e<h.tiposGlobales.perfiles[c].permisos.length;e++)d.push(h.tiposGlobales.perfiles[c].permisos[e].PERMISO);a.data.Permisos=[].concat(h.toConsumableArray(a.data.Permisos),h.toConsumableArray(d))}a.data.Permisos=h.eliminarPermisosDuplicados(a.data.Permisos);for(var b=0;b<a.data.Restricciones.length;b++){var c=a.data.Permisos.indexOf(a.data.Restricciones[b]);c>-1&&a.data.Permisos.splice(c,1)}return h.staff={Profile:a.data},h.staff.Profile})})})):d.reject({Message:"Respuesta vacía"})})},i.getUserInfo=function(){var a=e.AUTH.GET_USER_INFO;return b.get(a)},i.checkIn=function(a,c,f){return a&&c&&f?b.get(e.AUTH.TICKET(c,a.Username),{params:{password:a.Password,getProfile:!0,idPT:f.Id}}).then(function(b){if(!b.data)return d.reject({Message:"Respuesta vacía"});if(!b.data.Profile.Permissions||!b.data.Profile.Permissions.length)return d.reject({Message:"No tiene permisos para urgencia web."});var e=b.data.Profile.StaffMember.IdHealthCareCenter.toString();return h.facilities[e]=c,h.setCurrentFacility(e),h.addStaffMember(a,b.data.EncodedToken,b.data.Profile,e,f,!0,b.data.Guid)}):d.reject({Message:"Error en parametros"})},i.facilityChange=function(){return h.oldFacilityId!==h.currentFacility.Id},i.checkToken=function(a,b){return h.tokens[a.IdFacility][a.Id]?d.resolve(!0):i.revalidateToken(a,b)},i.validToken=function(a,c){return h.tokens.hasOwnProperty(c)&&h.tokens[c].hasOwnProperty(a)?b.post(e.AUTH.ISVALID,{token:h.tokens[c][a]}).then(function(){return!0},function(){return!1}):!1},i.revalidateToken=function(a,c){return b.get(e.AUTH.TICKET(h.facilities[a.IdFacility],a.Login.Username),{params:{password:c,getProfile:!0}}).then(function(b){return b.data.hasOwnProperty("EncodedToken")&&i.isStaffMemberLogged()?b.data.Profile.Permissions&&b.data.Profile.Permissions.length?(h.setToken(a.Id,b.data.EncodedToken),h.updateProfile(a.Id,b.data.Profile,a.IdFacility),!0):d.reject({Message:"No tiene permisos para urgencia web."}):d.reject({Message:"respuesta vacía"})})},i.resetToken=function(){delete h.tokens},i.goToLoginPage=function(){return c.location.href="http://"+c.location.host+f,!1},i.lock=function(){h.currentStaffMemberId=null},h.SaveState=function(){localStorage.staff=angular.toJson(h.staff),localStorage.token=h.token},h.RestoreState=function(){localStorage.staff&&"undefined"!==localStorage.staff&&(h.staff=angular.fromJson(localStorage.staff)),localStorage.token&&(h.token=localStorage.token)},a.$on("rootScope:saveState",h.SaveState),a.$on("rootScope:restoreState",h.RestoreState),i}angular.module("sdx.login").factory("loginService",a),a.$inject=["$rootScope","$http","$window","$q","API","APP_LOGIN","$filter"]}(),function(){"use strict";function a(a,c,d){var e=this;return e.loginState="authentication",e.tryLogin=function(c){e.loginState="authentication",e.toLogin=b(c),e.toLogin.relogin=!0,e.isLoading=!0,a.lock(),e.isLoading=!1,$("#password").focus()},e.access=function(){e.error=null,e.isLoading=!0,a.login(e.toLogin.Login.Username,e.toLogin.Login.Password).then(function(b){return e.toLogin.relogin&&a.validToken(e.toLogin.Id,e.toLogin.IdFacility)&&a.unlockStaff(e.toLogin.Id,e.toLogin.IdFacility,e.toLogin.Login.rememberMe,!0)?c.close(e.toLogin):(e.toLogin.relogin=!1,e.toLogin.HealthPractitioners=b,c.close(e.toLogin))},function(a){null!=a.error_description&&(a.Message=a.error_description),e.error=a.Message||"Problema no especificado"})["finally"](function(){e.isLoading=!1})},e.checkIn=function(b,d){if(e.isLoading=!0,b=parseInt(b),d="undefined"==typeof d?0:parseInt(d),""===d&&e.toLogin.HealthPractitioners[b].HealthPractitionerTypes)return e.loginState="authentication",e.error="Ingrese un instrumento válido",e.isLoading=!1,!1;var f=e.toLogin.HealthPractitioners[b].HealthCareCenter,g={Name:e.toLogin.HealthPractitioners[b].HealthPractitionerTypes[d].Name,Id:e.toLogin.HealthPractitioners[b].HealthPractitionerTypes[d].Id},h=e.toLogin.Login.Password;return a.checkIn(e.toLogin.Login,f,g).then(function(b){a.checkToken(b,h).then(function(a){return a?c.close(e.toLogin):(e.loginState="noAccess",void(e.isLoading=!1))})},function(a){e.isLoading=!1,e.loginState="authentication",e.error=a.Message}),!1},e.resetLogin=function(){e.loginState="authentication",e.toLogin=b()},e.toLogin=b(d),d&&(e.toLogin.relogin=!0,$("#password").focus()),e.facilityName=function(b){return a.getFacilitiesNames()[b]},e}function b(a){return{Id:a?a.Id:null,IdFacility:a?a.IdFacility:null,Login:{Username:a?a.Login.Username:null,Password:null,rememberMe:a?a.Login.rememberMe:!1},HealthPractitioners:null}}angular.module("sdx.login").controller("SessionsModalController",a),a.$inject=["loginService","$modalInstance","changeTo"]}(),function(){"use strict";function a(a){a.interceptors.push(["$q","$injector",function(a,b){var c=b.get("InterceptorQueueService");return{request:function(a){return c.status()&&-1===a.url.indexOf("api/ticket")?c.putOnQueue(a):(-1===a.url.indexOf("api/")&&(a.headers.Authorization=null),a)},responseError:function(c){b.get("loginService");switch(c.status){case-1:return a.reject("Ha perdido la conexión de red");case 401:break;case 403:return a.reject({Message:"Ud. no tiene permisos"});default:return a.reject(c.data)}return a.reject(c)}}}])}angular.module("sdx.errors",["sdx.login"]).config(a),a.$inject=["$httpProvider"]}(),function(){"use strict";function a(a){var b=this;return b.queue=[],b.status=!1,{start:function(){b.status=!0},stop:function(){b.status=!1},status:function(){return b.status},putOnQueue:function(c,d){d="undefined"!=typeof d?d:!1;var e=a.defer();return b.queue.push({deferred:e,config:c,isRetry:d}),e.promise},processQueue:function(a,c){for(b.status=!1;b.queue.length;){var d=b.queue.shift();d.config.headers.Authorization=c.getCurrentStaffMemberAuthorization(),d.isRetry?a(d.config).then(d.deferred.resolve,d.deferred.reject):d.deferred.resolve(d.config)}},rejectQueue:function(a){for(b.status=!1;b.queue.length;){var c=b.queue.shift();c.deferred.reject(a)}}}}angular.module("sdx.errors").factory("InterceptorQueueService",a),a.$inject=["$q"]}(),function(){"use strict";function a(a,b,c,d,e,f){function g(){if(h.currentUser=b.getCurrentStaffMember(),!b.CurrentStaffMemberIsActive())return void(c.location.href=e);var a="";return b.CurrentStaffMemberHasPermission(f.MANTENEDOR.CONSULTAR_ARTICULO)?a="#/articulo":b.CurrentStaffMemberHasPermission(f.MANTENEDOR.PASIVAR_ARTICULO)?a="#/articulo/arsenal":b.CurrentStaffMemberHasPermission(f.MANTENEDOR.CONSULTAR_SOLICITUD_ARTICULO)?a="#/articulo/solicitud":b.CurrentStaffMemberHasPermission(f.MANTENEDOR.APROBAR_SOLICITUD_FARMACO)?a="#/articulo/solicitud/farmaco":b.CurrentStaffMemberHasPermission(f.MANTENEDOR.APROBAR_SOLICITUD_INSUMO)?a="#/articulo/solicitud/insumo":b.CurrentStaffMemberHasPermission(f.MANTENEDOR.LISTAR_RECETA)?a="#/receta":b.CurrentStaffMemberHasPermission(f.MANTENEDOR.LISTAR_TIPOS_CONSULTA)?a="#/consulta":b.CurrentStaffMemberHasPermission(f.MANTENEDOR.LISTAR_PARAMETRO)?a="#/parametros":b.CurrentStaffMemberHasPermission(f.MANTENEDOR.LISTAR_USUARIO)?a="#/administracion":b.CurrentStaffMemberHasPermission(f.MANTENEDOR.LISTAR_PERFIL)&&(a="#/administracion/perfil"),""==a?void(c.location.href=e):void(c.location.href=d+a)}var h=this,i=a.open({backdrop:"static",templateUrl:"../common/login/modals/modal.sessions.html",controller:"SessionsModalController",controllerAs:"smc",windowClass:"rayen rayen-tall",keyboard:!1,resolve:{changeTo:function(){return null}}});return i.result.then(g),h}function b(a,b,c,d){c.debugInfoEnabled(d),a.otherwise("/authentication"),angular.extend(b,{autoDismiss:!0,closeButton:!0,positionClass:"toast-top-right",progressBar:!0,timeOut:7e3})}angular.module("authenticationApp",["sdx.envConfig","sdx.constants","sdx.login","toastr","ngSanitize","sdx.errors","mm.foundation"]).config(b).run(["loginService",function(a){a.lock()}]).controller("LoginCallController",a),a.$inject=["$modal","loginService","$window","APP_LANDING","APP_LOGIN","PERMISSIONS"],b.$inject=["$urlRouterProvider","toastrConfig","$compileProvider","DEBUG"]}();