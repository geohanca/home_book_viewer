<template>
    <div id="available" v-if="$store.state.showAvailable">
        <h2>Books</h2>
        <p></p>
        <ul class="list-group">
            <li class="list-group-item" v-for="book in this.allavailablebooks">
                <div class="col-4">{{ book.title }}</div>
                <div class="col-4">{{ book.author }}</div>
                <div class="col-4"><a :href="viewerbaseurl + book.book.viewer_path" target="_blank">view</a></div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted: function() {
        this.setAvailableBooks();
        this.getViewerBaseUrl();
    },
    data: function() {
      return {
            allavailablebooks: [],
            viewerbaseurl: 'unknown'
      }
    },
    components: {
        
    },
    methods: {
        setAvailableBooks() {
            let config = {
                headers : {
                'Authorization' : 'Token '+process.env.VUE_APP_BOOK_API_KEY
                }
            }
            axios
            .get('http://'+process.env.VUE_APP_BOOK_API_IPADDRESS+'/bookapi/availablebook/', config)
            .then(response => {
                this.allavailablebooks = response.data;
            })
            .catch(error => {
                console.log('setAvailableBooks:', error);
            })            
        },
        getViewerBaseUrl: function() {
        let config = {
            headers : {
            'Authorization' : 'Token '+process.env.VUE_APP_BOOK_API_KEY
          }
        }
        axios
        .get('http://'+process.env.VUE_APP_BOOK_API_IPADDRESS+'/bookapi/settings/', config)
        .then(response => {
          // console.log(response.data[0]['source_viewer_base_url'])
          this.viewerbaseurl = response.data[0]['source_viewer_base_url'];
        })
        .catch(error => {
            console.log('getViewerBaseUrl:', error);
        })            
      }
        
    }
}
</script>

<style>

</style>
