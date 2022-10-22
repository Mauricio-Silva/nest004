import { Functionary } from './functionary/entities/functionary.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FunctionaryModule } from './functionary/functionary.module';

@Module({
  imports: [
    FunctionaryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'company',
      username: 'root',
      password: 'admin',
      entities: [Functionary],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
