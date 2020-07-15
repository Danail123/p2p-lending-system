import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
    imports: [AuthModule, ConfigModule],
    exports: [AuthModule, ConfigModule],
})
export class CoreModule { }
