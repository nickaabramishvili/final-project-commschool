import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: string[] | undefined): string {
    return value ? value.join(',') : '';
  }
}
