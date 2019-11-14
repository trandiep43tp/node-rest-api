
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'thucpham',
    database: 'nest-test',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
}