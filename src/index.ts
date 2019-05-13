import Crypto from 'crypto'

interface Options {
  module: string | Crypto.CipherCCMTypes | Crypto.CipherGCMTypes
  input: Crypto.Utf8AsciiBinaryEncoding
  output: Crypto.HexBase64BinaryEncoding
  encoding: BufferEncoding
}

export default class NodeAES {
  private static instance: NodeAES

  public static create(options: Options): NodeAES {
    if (!this.instance) {
      this.instance = new this(options)
    }
    this.instance.setOptions(options)
    return this.instance
  }

  private options: Options

  public constructor(options: Options) {
    this.options = options
  }

  public setOptions(options: Options): void {
    this.options = {
      ...this.options,
      ...options
    }
  }

  public encrypt(
    key: Crypto.CipherKey,
    data: string,
    iv: Crypto.BinaryLike | null
  ): string {
    const cipher = Crypto.createCipheriv(this.options.module, key, iv)
    cipher.setAutoPadding(true)
    let crypted = cipher.update(data, this.options.input, this.options.output)
    crypted += cipher.final(this.options.output)
    crypted = Buffer.from(crypted, this.options.output).toString(
      this.options.encoding
    )
    return crypted
  }

  public decrypt(
    key: Crypto.BinaryLike,
    crypted: string,
    iv: Crypto.BinaryLike | null
  ): string {
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
