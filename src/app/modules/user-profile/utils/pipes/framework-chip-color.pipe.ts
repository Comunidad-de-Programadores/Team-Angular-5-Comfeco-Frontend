import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frameworkChipColor'
})
export class FrameworkChipColorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    // console.log('pipe value: ',value);

    switch (value) {
      case '605136f35218e11f9ca5c239':
        return 'chip-vue'
      case '6051368f5218e11f9ca5c237':
        return 'chip-angular'
      case '605136bf5218e11f9ca5c238':
        return 'chip-react'
      case '605137085218e11f9ca5c23a':
        return 'chip-svelte'
      default:
        break;
    }
    return null;
  }

}
