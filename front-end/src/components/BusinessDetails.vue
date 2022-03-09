<template>
  <div>
    <div class="table-wrapper">
        <h1 class="page-header">{{ businessDetails.name }}</h1>
        <table class="table table-hover table-striped">
          <thead class="table-dark table-header">
            <tr>
              <td>
                Campaign Name
              </td>
              <td>
                Budget
              </td>
            </tr>
          </thead>
          <tbody v-if="hasCampaigns">
            <tr v-for="campaign in businessDetails.campaigns" v-bind:key="campaign.id">
              <td>{{ campaign.name }}</td>
              <td>{{ parseFloat(campaign.budget).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tbody v-if="!hasCampaigns">
            <tr key="0">
              <td colspan="2">This business does not have any campaigns yet</td>
            </tr>
          </tbody>
        </table>
    </div>
    <GoogleMap v-if='isDataAvailable' v-bind:location=businessDetails.location v-bind:displayLabel=businessDetails.name />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import GoogleMap from '../components/GoogleMap.vue'

export default {
  name: 'BusinessDetails',
  props: ['id'],
  components: {
    GoogleMap
  },
  setup (props) {
    const businessDetails = ref({})
    const isDataAvailable = ref(false)
    const hasCampaigns = ref(false)
    const campaignCount = ref(0)
    const getBusinesssDetails = async (businessId) => {
      try {
        const response = await axios.get('http://localhost:8081/api/businesses/' + businessId)
        businessDetails.value = response.data
        hasCampaigns.value = businessDetails.value.campaigns.length > 0
        campaignCount.value = businessDetails.value.campaigns.length
        isDataAvailable.value = true
      } catch (err) {
        console.log(err)
      }
    }
    getBusinesssDetails(props.id)

    return { businessDetails, isDataAvailable, hasCampaigns, campaignCount }
  }
}
</script>
