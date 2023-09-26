//import * as awilix from "awilix";
import { emailSender, logger } from "../../shared/infrastructure/dependencies";
import { UserByIdFinder } from "../appication/user-by-id-finder";
//import { ConsoleLogger } from "../../shared/infrastructure/logger/console-logger";
//import { emailSender } from "../../shared/infrastructure/dependencies";
//import { FakeEmailSender } from "../../shared/infrastructure/email-sender/fake-email-sender";
import { WelcomeMessageSender } from "../appication/welcome-email-sender";
//import { WelcomeMessageSender } from "../appication/welcome-email-sender";
import { UserController } from "./http/user-controller";
//import { InMemoryUserRepository } from "./user-repository/in-memory-user-repository";
import { MysqlUserRepository } from "./user-repository/mysql-user-repository";
//import { ElasticUserRespository } from "./user-repository/elastic-user-respository";
//import { MongoUserRepository } from "./user-repository/mongo-user-repository";

/*const container = awilix.createContainer();

container.register({
  logger: awilix.asClass(ConsoleLogger),
  emailSender: awilix.asClass(FakeEmailSender),
  userRepository: awilix.asClass(InMemoryUserRepository).singleton(),
  userByIdFinder: awilix.asClass(UserByIdFinder),
  userController: awilix.asClass(UserController),
  welcomeMessageSender: awilix.asClass(WelcomeMessageSender),
});*/

//const mongoUserRepository = new MongoUserRepository();

//const userRepository = new InMemoryUserRepository();

const userRepository = new MysqlUserRepository();

//const elasticRepository = new ElasticUserRespository();

const userByIdFinder = new UserByIdFinder(userRepository);

const welcomeEmailSender = new WelcomeMessageSender(
  userRepository,
  emailSender,
  logger
);

export const userController = new UserController(
  userByIdFinder,
  welcomeEmailSender
);

//export const userController = container.resolve("userController");
