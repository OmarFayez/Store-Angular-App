import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncodeDecodeService {
  toBinary(string: string) {
    const codeUnits = Uint16Array.from(
      { length: string.length },
      (element, index) => string.charCodeAt(index)
    );
    const charCodes = new Uint8Array(codeUnits.buffer);

    let result = '';
    charCodes.forEach((char) => {
      result += String.fromCharCode(char);
    });
    return window.btoa(result);
  }

  fromBinary(binary: string) {
    const encoded = window.atob(binary);
    const bytes = Uint8Array.from(
      { length: encoded.length },
      (element, index) => encoded.charCodeAt(index)
    );
    const charCodes = new Uint16Array(bytes.buffer);

    let result = '';
    charCodes.forEach((char) => {
      result += String.fromCharCode(char);
    });
    return result;
  }
}
