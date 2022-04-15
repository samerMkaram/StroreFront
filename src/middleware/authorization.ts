import { Request } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'

function verifyAuthToken(req: Request, username: string | null = null): string {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader?.split(' ')[1]
    const decoded = verify(token as string, process.env.JWT_SECRET as string) as JwtPayload
    if (username && decoded.users.username !== username) {
      throw new Error('User id does not match!')
    }
    return decoded.users.username
  } catch (error) {
    throw new Error('Authorization failed!')
  }
}

export default verifyAuthToken
