<template>
  <div>
    <h1 class="page-header">Businessses</h1>
    <div>
        <label for='searchText' class="searchLabel">Search Bussiness Name </label>
        <input id='searchText' type="text" v-model='searchText' />
    </div>
    <div class="table-wrapper">
      <table class="table table-hover table-striped">
        <thead class="table-dark table-header">
            <tr>
            <td scope='col' v-on:click="changeFilterCriteria('name')">Business Name <i class="bi" v-bind:class="iconClass('name')"></i></td>
            <td scope='col' v-on:click="changeFilterCriteria('category')">Category <i class="bi" v-bind:class="iconClass('category')"></i></td>
            <td scope='col' v-on:click="changeFilterCriteria('campaignCount')">Number of Campaigns <i class="bi" v-bind:class="iconClass('campaignCount')"></i></td>
            <td scope='col' v-on:click="changeFilterCriteria('averageBudget')">Average Campaign Budget <i class="bi" v-bind:class="iconClass('averageBudget')"></i></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for='business in filteredBusinesses' v-bind:key='business.id'>
            <td scope='col'>
              <router-link :to="{ name: 'details', params: { id: business.id } }">
                {{ business.name }}
              </router-link>
            </td>
            <td scope='col'>{{ business.category }}</td>
            <td scope='col'>{{ business.campaignCount }}</td>
            <td scope='col'>$ {{ parseFloat(business.averageBudget).toFixed(2) }}</td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'AllBusinesses',
  setup () {
    const businesses = ref([])
    const searchText = ref('')
    const sortField = ref({ field: 'name', isAscending: true })

    const getBusinessDatAxios = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/businesses')
        businesses.value = response.data
      } catch (err) {
        console.log(err)
      }
    }
    getBusinessDatAxios()

    const filteredBusinesses = computed(() => {
      const filtered = businesses.value.filter((business) => {
        return business.name.toLowerCase().includes(searchText.value.toLowerCase())
      })

      return _.orderBy(filtered, [sortField.value.field], [sortField.value.isAscending ? 'asc' : 'desc'])
    })

    const changeFilterCriteria = (field) => {
      if (sortField.value.field === field) {
        sortField.value.isAscending = !sortField.value.isAscending
        return
      }

      sortField.value.field = field
      sortField.value.isAscending = true
    }

    const iconClass = (field) => {
      if (field === sortField.value.field) {
        return sortField.value.isAscending ? 'bi-caret-up-fill' : 'bi-caret-down-fill'
      }
      return ''
    }

    return { businesses, searchText, filteredBusinesses, changeFilterCriteria, iconClass }
  }
}
</script>
