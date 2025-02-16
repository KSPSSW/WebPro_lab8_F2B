import { defineStore, acceptHMRUpdate } from 'pinia'
import { Loading } from 'quasar'
import { api } from 'src/boot/axios'
import { type User } from 'src/models'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
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
  function getUserByEmail(login: string): User | undefined {
    async function getUsers() {
      try {
        Loading.show()
        const res = await api.get('/users')
        users.value = res.data
        console.log(users.value)
      } catch (err) {
        console.error(err)
      } finally {
        console.log('finally')
        Loading.hide()
      }
    }
    return { users, addUser, delUser, updateUser, getUserByEmail, getUsers }
  }
  return { users, addUser, delUser, updateUser, getUserByEmail }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
