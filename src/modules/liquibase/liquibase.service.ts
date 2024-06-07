import { Injectable, OnModuleInit } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class LiquibaseService implements OnModuleInit {
  async onModuleInit() {
    await this.runLiquibaseMigrations();
  }
  private async runLiquibaseMigrations(): Promise<void> {
    try {
      const { stdout, stderr } = await execAsync(
        'liquibase --defaultsFile=C:/Users/rahul/Documents/nest-blog-api/database/liquibase.properties update',
      );
      console.log('Liquibase Output: ', stdout);
      if (stderr) {
        console.error('Liquibase Errors: ', stderr);
      }
    } catch (error) {
      console.error('Failed to run Liquibase: ', error);
    }
  }
}
