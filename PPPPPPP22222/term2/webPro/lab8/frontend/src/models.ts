export interface Product {
  id: number
  name: string
  price: number
  size: string // 'SMLE'
  image: string
}

export interface User {
  id: number
  login: string
  password: string
  roles: ('admin' | 'user')[]
  gender: 'male' | 'female'
  age: number
}
