<template>
    <div id="management" v-if="$store.state.showManagement">
        <div class="alert alert-primary" role="alert" v-if="this.refreshInProgress">
            Refresh In-Progress, please wait...
        </div>
        <h2>Book Link Management</h2><button type="button" class="btn btn-outline-primary btn-sm" v-on:click="refreshBooks()">Refresh</button>
        <p></p>
        <ul class="list-group">
            <li class="list-group-item" v-for="(genre, key) in this.$store.state.allBooks">
                {{ key }}
                <div>
                    <li class="list-group-item" v-for="(subgenre, key2) in genre">
                        {{ key2 }}
                        <div>
                            <li class="list-group-item" v-for="(author, key3) in subgenre">
                                {{ key3 }}
                            <div>
                                <li class="list-group-item" v-for="file in author">
                                    {{ file.name }}
                                    <button
                                    type="button"
                                    class="btn btn-secondary btn-sm custom-style"
                                    @click="showAvailableBook(file, key3)">
                                    +
                                    </button>
                                </li>
                            </div>
                            </li>
                        </div>
                    </li>
                </div>
                <!-- <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">add</button> -->
            </li>
        </ul>
        <AddAvailableBook :book="book" :author="author"/>
    </div> 
</template>

<script>
import axios from 'axios'
import AddAvailableBook from './AddAvailableBook.vue';

export default {
    mounted: function() { 
        this.$store.dispatch('setAllBooks'); 
    },
    components: {
        AddAvailableBook
    },
    data: function() {
        return {
            refreshInProgress: false,
            isModalVisible: true,
            book: {},
            author: '',
        }
    },
    methods: {
        refreshBooks: function() {
            this.refreshInProgress = true
            let config = {
                headers : {
                'Authorization' : 'Token '+process.env.VUE_APP_BOOK_API_KEY
                }
            }
            // console.log('headers', config)
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
            axios
                .put('http://'+process.env.VUE_APP_BOOK_API_IPADDRESS+'/bookapi/refresh/', '{}', config) //axios assumes second param is data for post and put
                .then(response => {
                    this.$store.dispatch('setAllBooks');
                    this.refreshInProgress = false
                })
                .catch(error => {
                    console.log('refreshBooks', error)
                    this.refreshInProgress = false
                })
        },
        showAvailableBook: function(theBook, theAuthor) {
            this.book = theBook;
            this.author = theAuthor;
            this.$store.state.showAddAvailableBook = true;
        },
       
    },
    computed: {
        
    }
}
</script>

<style>

</style>
