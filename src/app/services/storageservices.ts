import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Storageservices {
 
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init() {
    if (!this._storage) {
      this._storage = await this.storage.create();
      console.log('✅ Storage initialized');
    }
  }

  async set(key: string, value: any) {
    await this.init();
    return this._storage?.set(key, value);
  }

  async get(key: string) {
    await this.init();
    return this._storage?.get(key);
  }

  async remove(key: string) {
  await this.init();
  return this._storage?.remove(key);
}

  async clear() {
    await this.init();
    return this._storage?.clear();
  }
}

