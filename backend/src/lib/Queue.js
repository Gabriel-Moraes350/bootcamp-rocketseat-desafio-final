import Bee from 'bee-queue';
import NewEnroll from '../app/jobs/NewEnroll';
import HelpOrderAnswer from '../app/jobs/HelpOrderAnswer';

const jobs = [NewEnroll, HelpOrderAnswer];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    return jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
          },
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      console.log('Entrou na fila: ', job.key);
      // bee.on('failed', this.handleFailure).process(handle);
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
