"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const consola_1 = require("consola");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.PORT);
}
bootstrap()
    .then(() => {
    consola_1.consola.success('server succesfully started!');
})
    .catch((err) => console.log(err));
//# sourceMappingURL=main.js.map