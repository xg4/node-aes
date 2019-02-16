import Crypto, {
  CipherCCMTypes,
  CipherGCMTypes,
  Utf8AsciiBinaryEncoding,
  HexBase64BinaryEncoding
} from 'crypto'

interface Options {
  module: string | CipherCCMTypes | CipherGCMTypes
  input: Utf8AsciiBinaryEncoding
  output: HexBase64BinaryEncoding
  encoding: string
}

export default class NodeAES {
  private static instance: NodeAES

  static create(options: Options) {
    if (!this.instance) {
      this.instance = new this(options)
    }
    return this.instance
  }

  private options: Options

  constructor(options: Options) {
    this.options = options
  }

  setOptions(options: Options) {
    this.options = {
      ...this.options,
      ...options
    }
  }

  encrypt(
    key: string | Buffer | NodeJS.TypedArray | DataView,
    data: string,
    iv: string | Buffer | NodeJS.TypedArray | DataView
  ) {
    const cipher = Crypto.createCipheriv(this.options.module, key, iv)
    cipher.setAutoPadding(true)
    let crypted = cipher.update(data, this.options.input, this.options.output)
    crypted += cipher.final(this.options.output)
    crypted = Buffer.from(crypted, this.options.output).toString(
      this.options.encoding
    )
    return crypted
  }

  decrypt(
    key: string | Buffer | NodeJS.TypedArray | DataView,
    crypted: string,
    iv: string | Buffer | NodeJS.TypedArray | DataView
  ) {
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
