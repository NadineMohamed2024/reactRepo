import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/users.guards';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
      MongooseModule.forRoot(`mongodb://localhost:27017/aymona`),
       UsersModule,BlogsModule,
       JwtModule.register({secret:'secret' ,signOptions:{expiresIn:'1d'}})
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule { }
