<template>
  <q-page padding>
    <div class="row justify-end"><q-btn icon="add" flat @click="dialog = true"></q-btn></div>

    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ id === 0 ? 'Add New User' : 'Edit User' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="form" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="email"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="Your Password"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'Please type your password']"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Cancel" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="reset" />
          <q-btn flat label="Submit" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table :columns="columns" :rows="userStore.users">
      <template v-slot:body-cell-operation="{ row }">
        <q-btn flat icon="edit" @click="edit(row)"></q-btn>
        <q-btn flat icon="delete" @click="remove(row)">
          <template #default></template>
        </q-btn>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import type { User } from 'src/models'
import { ref } from 'vue'
import { type QForm, type QTableColumn } from 'quasar'
import { useUserStore } from 'src/stores/userStore'
const dialog = ref(false)
const form = ref<QForm | null>(null)
const columns: QTableColumn[] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'center',
  },
  {
    name: 'password',
    label: 'Password',
    field: 'password',
    align: 'center',
  },
  {
    name: 'operation',
    label: '',
    field: 'operation',
    align: 'center',
  },
]

const userStore = useUserStore()
const id = ref(0)
const email = ref('')
const password = ref('')

function edit(row: User) {
  id.value = row.id
  email.value = row.email
  password.value = row.password
  dialog.value = true
}

function onSubmit() {
  if (id.value === 0) {
    userStore.addUser({ id: id.value, email: email.value, password: password.value })
  } else {
    userStore.updateUser({ id: id.value, email: email.value, password: password.value })
  }
  dialog.value = false
  onReset()
}
function save() {
  form.value?.validate().then((success) => {
    if (success) {
      if (id.value === 0) {
        userStore.addUser({ id: id.value, email: email.value, password: password.value })
      } else {
        userStore.updateUser({ id: id.value, email: email.value, password: password.value })
      }
      dialog.value = false
      onReset()
    }
  })
}
function reset() {
  form.value?.resetValidation()
  id.value = 0
  email.value = ''
  password.value = ''
  dialog.value = false
}
function remove(row: User) {
  userStore.delUser(row)
}
function onReset() {
  id.value = 0
  email.value = ''
  password.value = ''
  dialog.value = false
}
</script>
