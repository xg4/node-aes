import NodeAES from '../src'

const aes = new NodeAES({
  input: 'utf8',
  output: 'binary',
  encoding: 'base64',
  module: 'aes-256-cbc'
})

const key = '00000000000000000000000000000000'
const iv = '0000000000000000'

test('encrypt', () => {
  expect(aes.encrypt(key, 'test', iv)).toBe('pahPuLYrmUOUtPu/tNxidg==')
})

test('decrypt', () => {
  expect(aes.decrypt(key, 'pahPuLYrmUOUtPu/tNxidg==', iv)).toBe('test')
})
