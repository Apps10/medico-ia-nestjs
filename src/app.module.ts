import { Module } from '@nestjs/common';
import { PatientModule } from './app/patient/presentantion/Http/patient.module';

@Module({
  imports: [
    PatientModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
