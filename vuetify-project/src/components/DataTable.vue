<template>
    <VApp>
      <VMain>
        <VAppBar
          :elevated="false"
          color="primary"
          class="text-white"
        >
          <VToolbarTitle>User Admin Panel </VToolbarTitle>
        </VAppBar>
  
        <VContainer class="py-5">
          <VCard class="mt-4">
              <v-row style="margin-top: 10px; align-items: center;">
              <v-card-title class="text-h5">User Data Table</v-card-title>
              <VSpacer />
              <VBtn prepend-icon="mdi-account-plus" color="primary" @click="openCreateDialog"> New User </VBtn>
  
              <VTextField
                v-model="search"
                label="Search Users"
                clearable
                density="compact"
                variant="outlined"
                class="searchField"
              />
            </v-row>
            <VDataTable
              style="margin-top: 50px; padding: 20px; border: 1px solid black;"
              :coloumns="headers"
              :items="filteredUsers"
              :items-per-page="tableOptions.itemsPerPage"
              :page.sync="tableOptions.page"
              :sort-by.sync="tableOptions.sortBy"
              :sort-desc.sync="tableOptions.sortDesc"
              :footer-props="{itemsPerPageOptions: [5, 10, 20]}"
            >
              <template #item.gender="{ item }">
                <VChip
                  :color="item.gender === 'male' ? 'blue' : 'pink'"
                  text-color="white"
                  size="small"
                >
                  {{ item.gender }}
                </VChip>
              </template>
  
              <template #item.actions="{ item }">
                <VBtn icon variant="text" color="primary" @click="openEditDialog(item)">
                  <VIcon>mdi-pencil</VIcon>
                </VBtn>
                <VBtn icon variant="text" color="error" @click="deleteUser(item.id)">
                  <VIcon>mdi-delete</VIcon>
                </VBtn>
              </template>
  
              <template #no-data>
                <VAlert type="warning" variant="tonal" border="start">
                  No users found matching your search.
                </VAlert>
              </template>
            </VDataTable>
          </VCard>
        </VContainer>
  
        <VDialog
          v-model="createDialog"
          max-width="600"
        >
          <VCard>
            <VCardTitle>
              <span class="text-h5">Create New User</span>
            </VCardTitle>
            <VCardText>
              <VTextField
                label="First Name"
                v-model="newUser.firstName"
              />
              <VTextField
                label="Last Name"
                v-model="newUser.lastName"
              />
              <VTextField
                label="Username"
                v-model="newUser.userName"
              />
              <VTextField
                label="Email Address"
                v-model="newUser.emailAddress"
              />
              <VTextField
                label="Password"
                type="password"
                v-model="newUser.password"
              />
              <VSelect
                :items="['male', 'female']"
                label="Gender"
                v-model="newUser.gender"
              />
              <VTextField
                label="Phone Number"
                v-model="newUser.number"
              />
            </VCardText>
            <VCardActions>
              <VBtn variant="text" color="secondary" @click="createDialog = false">
                Cancel
              </VBtn>
              <VBtn color="primary" @click="createUser">
                Create
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
  
        <!-- Edit Dialog -->
        <VDialog
          v-model="editDialog"
          max-width="600"
        >
          <VCard>
            <VCardTitle>
              <span class="text-h5">Edit User</span>
            </VCardTitle>
            <VCardText>
              <VTextField
                label="First Name"
                v-model="editedUser.firstName"
              />
              <VTextField
                label="Last Name"
                v-model="editedUser.lastName"
              />
              <VTextField
                label="Username"
                v-model="editedUser.userName"
              />
              <VTextField
                label="Email Address"
                v-model="editedUser.emailAddress"
              />
              <VTextField
                label="Password"
                type="password"
                v-model="editedUser.password"
              />
              <VSelect
                :items="['male', 'female']"
                label="Gender"
                v-model="editedUser.gender"
              />
              <VTextField
                label="Phone Number"
                v-model="editedUser.number"
              />
            </VCardText>
            <VCardActions>
              <VBtn variant="text" color="secondary" @click="editDialog = false">
                Cancel
              </VBtn>
              <VBtn color="primary" @click="updateUser">
                Save
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
      </VMain>
    </VApp>
  </template>
  
  <script>

  export default {
    name: 'UserInformation',
    data() {
      return {
        search: '',
  
        headers: [
          { text: 'ID', value: 'id', sortable: true },
          { text: 'First Name', value: 'firstName', sortable: true },
          { text: 'Last Name', value: 'lastName', sortable: true },
          { text: 'Username', value: 'userName', sortable: true },
          { text: 'Email', value: 'emailAddress', sortable: true },
          { text: 'Password', value: 'password', sortable: false },
          { text: 'Gender', value: 'gender', sortable: false },
          { text: 'Phone Number', value: 'number', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
  
        userInfo: [
          {
            id: 'ea45',
            firstName: 'Terminator1',
            lastName: 'Alex',
            userName: 'Terminator1Alex',
            emailAddress: 'Terminator1Alex@gmail.com',
            password: 'Terminator1Alex',
            gender: 'male',
            number: '32131232131',
          },
          {
            id: 'ea46',
            firstName: 'Terminator2',
            lastName: 'Alex',
            userName: 'Terminator2Alex',
            emailAddress: 'Terminator2Alex@gmail.com',
            password: 'Terminator2Alex',
            gender: 'male',
            number: '32131232131',
          },
          {
            id: 'ea47',
            firstName: 'Terminator3',
            lastName: 'Alex',
            userName: 'Terminator3Alex',
            emailAddress: 'Terminator3Alex@gmail.com',
            password: 'Terminator3Alex',
            gender: 'male',
            number: '32131232131',
          },
          {
            id: '024b',
            firstName: 'Subhan',
            lastName: 'Pirzada',
            userName: 'subhanp360',
            emailAddress: 'subhanp360@gmail.com',
            password: 'Seaways@123',
            gender: 'male',
            number: '03224890822',
          },
          {
            id: '4b29',
            firstName: '11111111111',
            lastName: '1111111111111',
            userName: '111111111111111',
            emailAddress: '11111@gmail.com',
            password: '11111111111',
            gender: 'male',
            number: '111111111111111111',
          },
        ],
  
        tableOptions: {
          page: 1,
          itemsPerPage: 5,
          sortBy: [],
          sortDesc: [],
        },
  
        createDialog: false,
        editDialog: false,

        newUser: {
          id: '',
          firstName: '',
          lastName: '',
          userName: '',
          emailAddress: '',
          password: '',
          gender: 'male',
          number: '',
        },
        editedUser: {},
      }
    },
    computed: {
      filteredUsers() {
        const searchLower = this.search.toLowerCase()
        return this.userInfo.filter((user) =>
          Object.values(user).some((val) =>
            String(val).toLowerCase().includes(searchLower)
          )
        )
      },
    },
    methods: {
      openCreateDialog() {
        this.resetNewUserForm()
        this.createDialog = true
      },
      resetNewUserForm() {
        this.newUser = {
          id: '',
          firstName: '',
          lastName: '',
          userName: '',
          emailAddress: '',
          password: '',
          gender: 'male',
          number: '',
        }
      },
      createUser() {
        this.newUser.id = Math.random().toString(36).slice(2, 6)
        this.userInfo.push({ ...this.newUser })
        this.createDialog = false
      },
      openEditDialog(user) {
        this.editedUser = { ...user } 
        this.editDialog = true
      },
      updateUser() {
        const index = this.userInfo.findIndex(
          (item) => item.id === this.editedUser.id
        )
        if (index !== -1) {
          this.userInfo.splice(index, 1, this.editedUser)
        }
        this.editDialog = false
      },
      deleteUser(id) {
        this.userInfo = this.userInfo.filter((u) => u.id !== id)
      },
    },
  }
  </script>
  
  <style >
  .v-application .v-application--wrap main .VAppBar {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .VDataTable {
    border-radius: 8px;
    overflow: hidden;
  }
  .searchField .v-input__details {
    grid-area: auto;
    margin: 20px;
  }
  </style>
  