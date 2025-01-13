import jwt from 'jsonwebtoken'

export function createToken({ sub, name, expiresIn }){
  return jwt.sign({ 
    sub,
    name
  },
  process.env.JWT_SECRET ?? 'spacemanager',
  {
    expiresIn,
  });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw err;
    if (decoded) return decoded
  })
}