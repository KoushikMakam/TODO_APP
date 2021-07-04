import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { CRON_TIME, ENABLE_CRON } from 'src/common/config/app.config';
import { TaskNotificationRepository } from 'src/repositories/task.notification.repository';
import { TaskRepository } from 'src/repositories/task.repository';

@Injectable()
export class ScheduleTasksService {

  private readonly logger = new Logger(ScheduleTasksService.name);
  constructor(@Inject('MAIL_SERVICE') private readonly mailServiceClient: ClientProxy,
    private readonly taskRepository: TaskRepository,
    private readonly taskNotificationRepository: TaskNotificationRepository
  ) { }

  @Cron(CRON_TIME)
  async dueDateCrossedCron() {
    
    const pattern = { cmd: 'mail_send' };
      const response = await this.mailServiceClient.send(pattern, {
        to: 'k@m',
        subject: `[Reminber]Task has passed due date`,
        html: `<center>
                <b>Hi there, <br>
                The task is passed the due date, please take action<br>
                Regards,<br>
                Todo team
                </center>`,
      }).toPromise();
      return

    if (!Boolean(ENABLE_CRON)) {
      this.logger.verbose('The task due date notification cron is disabled....');
      return
    }
    
    this.logger.verbose('The task due date notification cron as started....');
    const dbRecords = await this.taskRepository.findRecordsPassedDate(Date.now())
    for (const record of dbRecords) {
      this.logger.verbose(`Mail sending for task ${record.title} started ...`);
      const pattern = { cmd: 'mail_send' };
      const response = await this.mailServiceClient.send(pattern, {
        to: record.lastUpdatedBy.email,
        subject: `[Reminber]Task ${record.title} has passed due date`,
        html: `<center>
                <b>Hi there, <br>
                The task is passed the due date, please take action<br>
                Regards,<br>
                Todo team
                </center>`,
      }).toPromise();
      this.logger.verbose(`Mail sending for task ${record.title} completed ...`);

      if (response.status = HttpStatus.OK) {
        await this.taskNotificationRepository.create(record, "email")
      }
    }
    this.logger.verbose('The task due date notification cron as completed....');
  }

}
