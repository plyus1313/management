const chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server/app");
var should = chai.should();

chai.use(chaiHttp);
