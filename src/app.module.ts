import { Module } from '@nestjs/common';
import { PatientModule } from './app/patient/infraestructure/patient.module';
import { AuthModule } from './app/auth/infraestructure/auth.module';

@Module({
  imports: [
    PatientModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
