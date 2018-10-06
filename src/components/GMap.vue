<template>
  <GmapMap
    re="mapRef"
    :center="center"
    :zoom="16"
    map-type-id="terrain"
    style="width: 100%; height: 600px"
    @bounds_changed="fetchShelters()"
  >
  <GmapMarker
    v-for="(m, index) in markers"
    :key="index"
    :label="stateLabelMapper[m.state]"
    :title="m.name"
    :position="{lat: m.lat, lng: m.lng}"
    :clickable="true"
    :draggable="false"
    @click="showShelterBoard"
    @mouseover="showShelterInfo(m.name, m.state, {lat: m.lat, lng: m.lng})"
  />
  <GmapInfoWindow
    :position="infoWindow.position"
    :opened="infoWindow.opened"
    @closeclick="infoWindow.open=false"
  >
  <div id="infoWindowContent">"infoWindow.content"</div>
  </GmapInfoWindow>
  </GmapMap>
</template>

<script>

import axios from 'axios'

const SHELTERS_ENDPOINT = `${process.env.BACKEND_HOST}/api/shelter`

export default {
  name: 'SheltersMap',
  data () {
    return {
      center: {lat: 34.0783209, lng: 134.5586071},
      markers: {0: {name: '徳島大学常三島キャンパス', lat: 34.0783209, lng: 134.5586071, state: 'safe'}},
      infoWindow: {position: {lat: 34.0783209, lng: 134.5586071}, content: '', opened: false},
      stateLabelMapper: {safe: '安', danger: '危', unavailable: '不'},
      stateMsgMapper: {safe: '安全', danger: '危険', unavailable: '避難不可能'},
      stateColorMapper: {safe: '#74df00', danger: '#ffbf00', unavailable: '#ff0000'}
    }
  },
  mounted () {
    this.$getLocation().then(coordinates => {
      this.center = coordinates
      console.log(coordinates)
    })
  },
  methods: {
    async fetchShelters () {
      let conf = {}
      axios.get(`${SHELTERS_ENDPOINT}/by_id/10/20`, conf).then((response) => {
        response.data.forEach((row) => {
          this.markers[row.ID] = { name: row.Name, lat: row.Latitude, lng: row.Longitude, state: row.State }
          console.log('row', this.markers[row.ID])
        })
      })
    },
    showShelterInfo (name, state, pos) {
      console.log(`${name} ${state} ${pos}`)
      this.infoWindow.position = pos
      this.infoWindow.open = true
      this.infoWindow.content = name
    },
    showShelterBoard () {
      console.log('showShelterBoard')
    }
  }
}
</script>
