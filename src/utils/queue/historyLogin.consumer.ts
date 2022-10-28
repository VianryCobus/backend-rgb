import { Process, Processor } from '@nestjs/bull';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { HistoryLogin } from '../../models/history_login.entity';
import { DataSource } from 'typeorm';

@Processor('backend-rgb')
export class HistoryLoginConsumer {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  @Process('login-history-job')
  async loginHistoryJob(job: Job<unknown>) {
    // collect data to variable
    let val: any = job.data;

    // get start day and end day
    const now = new Date().getTime();
    let startOfDay = new Date(now - (now % 86400000));
    let endDate = new Date(now - (now % 86400000) + 86400000);

    // get history login today
    const loginHistory = await this.dataSource
      .createQueryBuilder(HistoryLogin, 'historyLogin')
      .where('ip = :ip', { ip: val.ip })
      .andWhere('createdAt BETWEEN :startOfDay AND :endDate', {
        startOfDay,
        endDate,
      })
      .getRawOne();
    if (!loginHistory) {
      const insertDataIp = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(HistoryLogin)
        .values({
          ip: val.ip,
        })
        .execute();
      if (insertDataIp) console.log('success insert history login');
    }
  }
}
