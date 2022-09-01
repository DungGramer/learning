import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string, limit?: number): string|null {
    if (!value) return null;

    const actualLimit = limit || 50;
    return `${value.substr(0, actualLimit)}...`;
  }

}
