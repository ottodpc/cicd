import { Module } from '@nestjs/common';
import { LoggerAdapter } from './logger/logger.adapter';
import { DefaultService } from './rest/default';
import { DefaultApiModule } from './rest/default.api.module';
import { TodoController } from './controllers/todo.mutation.controller';
import { TodoQueryController } from './controllers/todo.query.controller';
import { TodoRepository } from './repositories/todo.repository';
import { RepositoryUtils } from './repositories/repository.utils';
import { TodoService } from './services/todo.service';
import { HealthController } from './controllers/health.controller';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo } from './models/todo';
import { TodoSchema } from './models/todo';
import { MongoConfig } from './configurations/mongo.config';
import { UserController } from './controllers/user.mutation.controller';
import { UserQueryController } from './controllers/user.query.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { UserSchema } from './models/user';
import appconfiguration from './configurations/app.configuration';
@Module({
  controllers: [
    TodoController,
    TodoQueryController,
    HealthController,
    UserController,
    UserQueryController,
    HealthController,
  ],
  providers: [
    LoggerAdapter,
    DefaultService,
    RepositoryUtils,
    TodoService,
    TodoRepository,
    RepositoryUtils,
    UserService,
    UserRepository,
  ],
  imports: [
    DefaultApiModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MongoConfig,
    }),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MongoConfig,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appconfiguration],
    }),
  ],
  exports: [LoggerAdapter],
})
export class AppModule {}
