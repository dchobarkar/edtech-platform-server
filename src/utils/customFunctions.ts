import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomFunctions {
  sortFunction(toBeSorted: object[], sortedBy: string) {
    function compare(x: any, y: any) {
      if (x[sortedBy] < y[sortedBy]) {
        return -1;
      } else if (x[sortedBy] > y[sortedBy]) {
        return 1;
      } else {
        return 0;
      }
    }
    return toBeSorted.sort(compare);
  }
}
