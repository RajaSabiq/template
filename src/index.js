const routes = require("./routes");
const controllers = require("./controllers");
const models = require("./models");
const middlewares = require("./middlewares");
const config = require("./config")
const services = require("./services")

module.exports = {
  routes,
  controllers,
  config,
  middlewares,
  services,
  models
}
