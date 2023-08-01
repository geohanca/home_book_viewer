<template>
  <div id="addavailable" v-if="this.$store.state.showAddAvailableBook">
    <transition name="modal-book">
      <div class="modal-mask-book">
        <div class="modal-wrapper-book">
          <div class="modal-container-book">
            <div class="modal-body-book">
              <slot name="body-book">
              </slot>
            </div>
            <hr>

            {{ book.name }}
            <p></p>
            {{ author }}
            <p></p>
            <button type="button" class="btn btn-secondary" v-on:click="addBook()">Add Book</button>
            <p></p>
            <div>{{message}}</div>
            <p></p>
            <div class="modal-footer-book">
              <slot name="footer-book">
                <button class="modal-default-button-book" @click="closeModal()">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['book', 'author'],
    data: function() {
        return {
        message: "---",
        }
    },
    mounted: function() {
        
    },
    methods: {
        addBook: function(book) {
            let config = {
                headers : {
                'Content-Type' : 'multipart/form-data',
                'Authorization' : 'Token '+process.env.VUE_APP_BOOK_API_KEY
                }
            }
            var upload = new FormData();
            console.log(this.book.name)
            upload.append('title', this.book.name);
            upload.append('author', this.author);
            upload.append('book_id', this.book.file.id);
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
            axios
            .post('http://'+process.env.VUE_APP_BOOK_API_IPADDRESS+'/bookapi/availablebook/', upload, config)
            .then(response => {
                this.message = 'added'
            })
            .catch(error => {
                this.message = 'error - see log'
            })

    },
        closeModal() {
            this.$store.state.showAddAvailableBook = false;
        }
    }

}
</script>

<style>
@import '../assets/css/modal-book.css';
</style>
