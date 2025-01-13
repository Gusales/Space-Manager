export function generatePassword(){
  const  chars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
  let code = ""
  for (let index = 0; index < 6; index++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }

  return code
}
