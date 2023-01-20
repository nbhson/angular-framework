import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export class UtilHelper {
  static isEmptyString(operation = '') {
    return operation.trim().length === 0
  }
}