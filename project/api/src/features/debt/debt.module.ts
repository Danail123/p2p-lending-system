import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtController } from './debt.contoller';
import { DebtService } from './debt.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [DebtController],
  providers: [DebtService],
})
export class DebtModule {}
