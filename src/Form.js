import Errors from './Errors.js'
import axios from 'axios'

export default class Form {
    /**
     * Constructor
     */
  constructor (originalFields) {
    this.submitting = false
    this.fields = originalFields

    for (let field in originalFields) {
      this[field] = originalFields[field]
    }

    this.errors = new Errors()
  }

    /**
     * Reset properties
     */
  reset () {
    this.submitting = false

    this.fields = {}

    for (let field in this.fields) {
      this[field] = ''
    }

    this.errors.clear()
  }

    /**
     * Returns the data of the form
     */
  data () {
    let data = {}

    for (let field in this.fields) {
      data[field] = this[field]
    }

    return data
  }

    /**
     * Put request type for Submit function
     */
  put (url) {
    return this.submit('put', url)
  }

    /**
     * Patch request type for Submit function
     */
  patch (url) {
    return this.submit('patch', url)
  }

    /**
     * Post request type for Submit function
     */
  post (url) {
    return this.submit('post', url)
  }

    /**
     * Submit the form
     */
  submit (requestType, url) {
    this.submitting = true
    return new Promise((resolve, reject) => {
      axios[requestType](url.this.data())
        .then(response => {
          this.submitting = false
          this.onSuccess(response)
          resolve(response)
        })
        .catch(error => {
          this.submitting = false
          this.onFail(error)
          reject(error)
        })
    })
  }

  onSuccess (data) {
    this.reset()
  }

  onFail (errors) {
    this.errors.record(error.response.data)
  }
}
