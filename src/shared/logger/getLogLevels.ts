import { LogLevel } from '@nestjs/common/services/logger.service';

function getLogLevels(): LogLevel[] {
  return ['log', 'warn', 'error', 'debug', 'verbose'];
}

export default getLogLevels;
