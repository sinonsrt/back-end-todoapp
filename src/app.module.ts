import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@todoapp.g6vho.mongodb.net/test`,
    ),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
