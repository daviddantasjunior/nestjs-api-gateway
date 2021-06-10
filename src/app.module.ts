import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HostelModule } from './hostel/hostel.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: false,
    }),
    HostelModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
