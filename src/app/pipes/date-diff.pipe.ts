import { Pipe, PipeTransform } from '@angular/core';

// {{ endDate | dateDiff: startDate }} days
@Pipe({ name: 'dateDiff' })
export class DateDiffPipe implements PipeTransform {
  transform(endDate: string, startDate: string) {
    const msDiff = new Date(endDate).getTime() - new Date(startDate).getTime();
    return msDiff / (1000 * 3600 * 24) + 1; // include the start and end date in the count
  }
}
