import { defineStore, acceptHMRUpdate } from 'pinia'
import { type User } from 'src/models'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([
    {
      id: 1,
      email: 'admin@mail.com',
      password: 'Pass@1234',
    },
    {
      id: 2,
      email: 'user@mail.com',
      password: 'Pass@1234',
    },
  ])

  let lastUserId = 3
  function addUser(u: User) {
    users.value.push({ ...u, id: lastUserId++ })
  }
  function delUser(u: User) {
    const index = users.value.findIndex((item) => {
      return u.id === item.id
    })
    users.value.splice(index, 1)
  }
  function updateUser(u: User) {
    const index = users.value.findIndex((item) => {
      return u.id === item.id
    })
    users.value[index] = { ...u }
  }
  function getUserByEmail(email: string): User | undefined {
    return users.value.find((item) => item.email === email)
  }
  return { users, addUser, delUser, updateUser, getUserByEmail }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
