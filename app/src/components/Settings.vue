<template>
    <div id="settings" v-if="$store.state.showSettings">
        <h2>Settings</h2>
        <form>
            <div class="form-group">
                <label for="sourceipaddress">Source IP</label>
                <input type="text" class="form-control" id="sourceipaddress" placeholder="Enter Source IP" v-model="settings.source_ip">
                <small id="sourceIpHelp" class="form-text text-muted">enter ip address of mp3 server</small>
            </div>
            <div class="form-group">
                <label for="sourcepath">Source Path</label>
                <input type="text" class="form-control" id="sourcepath" placeholder="Enter Script Path" v-model="settings.source_script_path">
                <small id="sourcePathHelp" class="form-text text-muted">enter url path to php script to return mp3 file json</small>
            </div>
            <div class="form-group">
                <label for="sourceurl">Source Viewer Base Url</label>
                <input type="text" class="form-control" id="sourceurl" placeholder="Enter Source Url" v-model="settings.source_viewer_base_url">
                <small id="sourceUrlHelp" class="form-text text-muted">enter base url path to book viewers, path to book will be appended to this</small>
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="updateSettingsOnDatabase()">Save to Database</button>
        </form>
    </div> 
</template>

<script>
import axios from 'axios';

export default {
    mounted: function() { 
        this.$store.dispatch('setSettings');       
    },
    methods: {
        updateSettingsOnDatabase: function() {
            let config = {
                headers : {
                'Content-Type' : 'multipart/form-data',
                'Authorization' : 'Token '+process.env.VUE_APP_BOOK_API_KEY
                }
            }
            var upload = new FormData();
            upload.append('source_ip', this.$store.state.settings.source_ip);
            upload.append('source_script_path', this.$store.state.settings.source_script_path);
            upload.append('source_viewer_base_url', this.$store.state.settings.source_viewer_base_url);
            //console.log('updateSettingsOnDatabase', this.$store.state.settings)
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
            axios
                .post('http://'+process.env.VUE_APP_BOOK_API_IPADDRESS+'/bookapi/settings/', upload, config)
                .then(response => {
                this.$store.dispatch('setSettings');
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    computed: {
        settings: {
        get() {
            return this.$store.state.settings },
        set(value) {
            this.$store.commit('settings', value)
        }
        }
    }
}
</script>

<style>

</style>