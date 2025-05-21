import {jwtDecode} from 'jwt-decode';

export interface JwtPayload {
  userId: number;
  [key: string]: any;
}


