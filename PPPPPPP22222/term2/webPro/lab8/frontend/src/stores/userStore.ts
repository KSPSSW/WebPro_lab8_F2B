import { defineStore, acceptHMRUpdate } from 'pinia'
import { Loading, useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { type User } from 'src/models'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const $q = useQuasar()
  async function addUser(u: User) {
    try {
      Loading.show()
      const res = await api.post('/users', u)
      console.log(res.data)
      await getUsers()
    } catch (err) {
      console.error(err)
      $q.notify({
        color: 'negative',
        position: 'top-right',
        message: 'User was not added',
        icon: 'report_problem',
      })
    } finally {
      console.log('finally')
      Loading.hide()
    }
  }
  async function delUser(u: User) {
    try {
      Loading.show()
      const res = await api.delete('/users/' + u.id)
      console.log(res.data)
      await getUsersbyDelete()
    } catch (err) {
      console.error(err)
      $q.notify({
        color: 'negative',
        position: 'top-right',
        message: 'User was not deleted',
        icon: 'report_problem',
      })
    } finally {
      console.log('finally')
      Loading.hide()
    }
  }
  async function updateUser(u: User) {
    try {
      Loading.show()
      const res = await api.patch('/users/' + u.id, u)
      console.log(res.data)
      await getUsers()
    } catch (err) {
      console.error(err)
      $q.notify({
        color: 'negative',
        position: 'top-right',
        message: 'User was not added or updated failed',
        icon: 'report_problem',
      })
    } finally {
      console.log('finally')
      Loading.hide()
    }
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
        $q.notify({
          color: 'negative',
          position: 'top-right',
          message: 'Users were not loaded',
          icon: 'report_problem',
        })
      } finally {
        console.log('finally')
        Loading.hide()
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Users were loaded',
          icon: 'check_circle',
        })
      }
    }
    async function getUsersbyDelete() {
      try {
        Loading.show()
        const res = await api.get('/users')
        users.value = res.data
        console.log(users.value)
      } catch (err) {
        console.error(err)
        $q.notify({
          color: 'negative',
          position: 'top-right',
          message: 'Users were not loaded',
          icon: 'report_problem',
        })
      } finally {
        console.log('finally')
        Loading.hide()
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Users were deleted',
          icon: 'check_circle',
        })
      }
    }

    return { users, addUser, delUser, updateUser, getUserByEmail, getUsers, getUsersbyDelete }
  }
  return { users, addUser, delUser, updateUser, getUserByEmail }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
