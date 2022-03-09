<template>
  <div class="details">
    <BusinessDetails v-bind:id=businessId />
  </div>
</template>

<script>
import BusinessDetails from '../components/BusinessDetails.vue'

export default {
  name: 'DetailsView',
  props: ['id'],
  components: {
    BusinessDetails
  },
  setup (props) {
    return { businessId: props.id }
  }
}
</script>
