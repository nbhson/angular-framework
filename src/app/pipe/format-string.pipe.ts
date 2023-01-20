import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatString'
})
export class FormatStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.substr(0, 10) + `...`;
  }

}
