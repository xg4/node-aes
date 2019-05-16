import NodeAES from '../src'

test('encrypt', () => {
  const key = '00000000000000000000000000000000'
  const iv = '0000000000000000'
  const aes = new NodeAES({
    input: 'utf8',
    output: 'binary',
    encoding: 'base64',
    module: 'aes-256-cbc'
  })
  expect(aes.encrypt(key, 'test', iv)).toBe('pahPuLYrmUOUtPu/tNxidg==')
})

test('decrypt', () => {
  const key = '00000000000000000000000000000000'
  const iv = '0000000000000000'
  const aes = new NodeAES({
    input: 'utf8',
    output: 'binary',
    encoding: 'base64',
    module: 'aes-128-ccm'
  })
  aes.setOptions({ module: 'aes-256-cbc' })
  expect(aes.decrypt(key, 'pahPuLYrmUOUtPu/tNxidg==', iv)).toBe('test')
})

test('singleton', () => {
  const aes = NodeAES.create({
    input: 'utf8',
    output: 'binary',
    encoding: 'base64',
    module: 'aes-256-cbc'
  })
  const aes2 = NodeAES.create({
    input: 'utf8',
    output: 'binary',
    encoding: 'base64',
    module: 'aes-256-cbc'
  })
  expect(aes === aes2).toBeTruthy()
})
