$(function () {
  window.router = new App.Router();
  Backbone.history.start();

  window.colecciones.clientes = new App.Collections.Clientes();
  
});
