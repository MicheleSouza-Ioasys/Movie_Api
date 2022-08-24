import { getDatabaseConfigConnection } from '@config/env/connection';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'modules/auth/auth.module';
import { RolesGuard } from 'modules/auth/guards/role.guards';
import { MovieModule } from 'modules/movie/movie.module';
import { RoleModule } from 'modules/role/role.module';
import { UserRoleModule } from 'modules/userRole/userRole.module';
import { UserModule } from 'modules/users/user.module';
import { HealthModule } from './modules/health/health.module';

const databaseOptions = {
  ...getDatabaseConfigConnection(),
};
@Module({
  imports: [
    HealthModule,
    TypeOrmModule.forRoot(databaseOptions),
    UserModule,
    AuthModule,
    RoleModule,
    UserRoleModule,
    MovieModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
