<template>
  <div ref='mapDiv' class="map"></div>
</template>

<script>
/* eslint-disable no-undef */
import { onMounted, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

const googleMapsApiKey = 'AIzaSyB5b5iG_F_qZ5LDvMIgTmDKmStXoI8wMIA'

export default {
  name: 'GoogleMap',
  props: ['location', 'displayLabel'],
  setup (props) {
    const loader = new Loader({ apiKey: googleMapsApiKey })
    const mapDiv = ref(null)

    onMounted(async () => {
      await loader.load()
      const map = new google.maps.Map(mapDiv.value, {
        center: props.location,
        zoom: 15
      })
      // eslint-disable-next-line
      new google.maps.Marker({
        position: props.location,
        map,
        title: props.displayLabel
      })
    })

    return { mapDiv }
  }
}
</script>
