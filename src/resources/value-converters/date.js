import moment from 'moment';

export class DateValueConverter {
    toView(d, format) {
      const f = format ? format : 'DD/MM/YYYY';
      return moment(d).format(f);
    }
  
    fromView(d) {
      return moment(d);
    }
  }