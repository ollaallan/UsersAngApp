import { Injectable } from '@angular/core';
import { User } from '../user';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserCacheService extends CacheService<User[]>  {}
