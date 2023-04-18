import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import hash from 'hash-it';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})

export abstract class CacheService<T> {

  readonly durationInMinutes = 5;
  readonly key = 'DEFAULT';

  private cache: {
    [id: string]: {
      expires: Date,
      value: Observable<T>
    }
  } = {};


  getValue(object?: any): any {
    const key = object ? hash(object).toString() : this.key;
    const item = this.cache[key];
    if (!item) {
      return null;
    }

    if (dayjs(new Date()).isAfter(item.expires)) {
      return null;
    }

    return item.value;
  }

  setValue(value: Observable<T>, object?: any) {
    const key = object ? hash(object).toString() : this.key;
    const expires = dayjs(new Date())
      .add(this.durationInMinutes, 'minutes')
      .toDate();
    this.cache[key] = {expires, value};
  }

  
}

