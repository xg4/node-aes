import Crypto from 'crypto'

export default class NodeAES {
  static create(...args) {
    if (!this._instance) {
      this._instance = new this(...args)
    }
    return this._instance
  }
  constructor(options = {}) {
    this.setOptions(options)
  }
  setOptions(options = {}) {
    this.options = {
      ...this.options,
      ...options
    }
  }
  encrypt(key, data, iv) {
    const cipher = Crypto.createCipheriv(this.options.module, key, iv)
    cipher.setAutoPadding(true)
    let crypted = cipher.update(data, this.options.input, this.options.output)
    crypted += cipher.final(this.options.output)
    crypted = Buffer.from(crypted, this.options.output).toString(
      this.options.encoding
    )
    return crypted
  }
  decrypt(key, crypted, iv) {
    crypted = Buffer.from(crypted, this.options.encoding).toString(
      this.options.output
    )
    const decipher = Crypto.createDecipheriv(this.options.module, key, iv)
    let decoded = decipher.update(
      crypted,
      this.options.output,
      this.options.input
    )
    decoded += decipher.final(this.options.input)
    return decoded
  }
}
