<template>
  <div>
    <GmapMap
      ref="map"
      :center="center"
      :zoom="16"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
      @bounds_changed="fetchShelters"
    >
    <GmapMarker
      v-for="(m, index) in shelters"
      :key="index"
      :label="stateLabelMapper[m.state]"
      :title="m.name"
      :position="{lat: m.lat, lng: m.lng}"
      :clickable="true"
      :draggable="false"
      @click="switchForcusedShelter(index)"
      @mouseover="showShelterInfo(m.name, m.state, {lat: m.lat, lng: m.lng})"
    />
    <GmapInfoWindow
      :position="infoWindow.position"
      :opened="infoWindow.opened"
      @closeclick="infoWindow.open=false"
    >
    <div id="infoWindowContent">{{ infoWindow.content }}</div>
    </GmapInfoWindow>
    </GmapMap>
    <Board
      ref="board"
    />
    <CommentList
      ref="commentList"
    />
    <CommentForm
      ref="commentForm"
    />
  </div>
</template>

<script>

import axios from 'axios'
import Board from '@/components/Board'
import CommentForm from '@/components/Form'
import CommentList from '@/components/CommentList'

const SHELTERS_ENDPOINT = `${process.env.BACKEND_HOST}/api/shelter`

export default {
  name: 'SheltersMap',
  components: { Board, CommentForm, CommentList },
  data () {
    return {
      center: {lat: 34.0783209, lng: 134.5586071},
      shelters: {0: {name: '徳島大学常三島キャンパス', lat: 34.0783209, lng: 134.5586071, state: 'safe'}},
      infoWindow: {position: {lat: 34.0783209, lng: 134.5586071}, content: '', opened: false},
      stateLabelMapper: {safe: '安', danger: '危', unavailable: '不'},
      stateMsgMapper: {safe: '安全', danger: '危険', unavailable: '避難不可能'},
      stateColorMapper: {safe: '#74df00', danger: '#ffbf00', unavailable: '#ff0000'}
    }
  },
  mounted () {
    this.$getLocation().then(coordinates => {
      this.center = coordinates
    })
  },
  methods: {
    async fetchShelters () { // 表示区画内の避難所一覧を取得
      this.$refs.map.$mapPromise.then((map) => {
        // 表示領域からエンドポイントを取得
        const bounds = map.getBounds()
        const endpointURL = `${SHELTERS_ENDPOINT}/by_rect/${bounds.f.b}/${bounds.b.b}/${bounds.f.f}/${bounds.b.f}`
        // エンドポイントを指定して避難所リストを取得
        axios.get(endpointURL).then((response) => {
          this.shelters = {}
          response.data.forEach((row) => {
            if (response.request.status === 200) {
              this.shelters[row.ID] = { name: row.Name, lat: row.Latitude, lng: row.Longitude, state: row.State }
            }
          })
        })
      })
    },
    showShelterInfo (name, state, pos) {
      this.infoWindow.position = pos
      this.infoWindow.open = true
      this.infoWindow.content = `${name}:${this.stateMsgMapper[state]}`
    },
    switchForcusedShelter (index) { // クリックしたマーカーに対応する避難所を選択
      this.$refs.board.switchShelter(index, this.shelters[index].name)
      this.$refs.commentList.loadComments(index)
      this.$refs.commentForm.setShelterID(index)
    }
  }
}
</script>
