import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  public transform(size: number): string {
    if (isNaN(size)) {
      return 'unknown size';
    }

    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    const gigabyte = megabyte * 1024;

    if (size < kilobyte) {
      return size + ' B'; // Bytes
    } else if (size < megabyte) {
      return (size / kilobyte).toFixed(2) + ' KB'; // Kilobytes
    } else if (size < gigabyte) {
      return (size / megabyte).toFixed(2) + ' MB'; // Megabytes
    } else {
      return (size / gigabyte).toFixed(2) + ' GB'; // Gigabytes
    }
  }
}
