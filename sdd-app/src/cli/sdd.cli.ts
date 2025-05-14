/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import inquirer from 'inquirer';
import { NestFactory } from '@nestjs/core';
import { SddModule } from '../sdd/sdd.module';
import { SddService } from '../sdd/sdd.service';

export async function bootstrapCli() {
  const app = await NestFactory.createApplicationContext(SddModule, { logger: false });
  const sddService = app.get(SddService);

  let exit = false;

  while (!exit) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Create a table', 'Insert a record', 'Get all records', 'Delete a record', 'Exit'],
      },
    ]);
    switch (action) {
      case 'Create a table': {
        const { tableName } = (await inquirer.prompt([{ type: 'input', name: 'tableName', message: 'Enter table name:' }])) as any;
        const res = sddService.createTable(tableName);
        console.log(res);
        break;
      }

      case 'Insert a record': {
        const { tableName, data } = await inquirer.prompt([
          { type: 'input', name: 'tableName', message: 'Enter table name:' },
          { type: 'editor', name: 'data', message: 'Enter JSON data (opens your editor):' },
        ]);
        try {
          const parsed = JSON.parse(data);
          const res = await sddService.insertRecord(tableName, parsed);
          console.log('Inserted:', res);
        } catch {
          console.error('❌ Invalid JSON.');
        }
        break;
      }

      case 'Get all records': {
        const { tableName } = await inquirer.prompt([{ type: 'input', name: 'tableName', message: 'Enter table name:' }]);
        const res = sddService.getAllRecords(tableName);
        console.log(JSON.stringify(res, null, 2));
        break;
      }

      case 'Exit':
        console.log('Goodbye!');
        exit = true;
        break;
    }
    console.log();
  }

  await app.close();
}
