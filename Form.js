import Errors from './Errors.js'
import axios from 'axios'

export default class Form {
    /**
     * Constructor
     */
  constructor (originalFields) {
    this.fields = originalFields

    for (let field in originalFields) {
      this[field] = originalFields[field]
    }

    this.errors = new Errors()
  }

    /**
     *
     */
  reset () {
    this.fields = {}

    for (let field in originalFields) {
      this[field] = ''
    }

    this.errors.clear()
  }

  data () {
    let data = {}

    for (let field in this.fields) {
      data[field] = this[field]
    }

    return data
  }

    /**
     *
     */
  submit (requesType, url) {
    return new Promise((resolve, reject) => {
      axios[requesType](url.this.data())
        .then(response => {
          this.onSuccess(response)
          resolve(response)
        })
        .catch(error => {
          this.onFail(error.response.data)
          reject(error)
        })
    })
  }

  onSuccess (data) {
    this.reset()
  }

  onFail (errors) {
    this.errors.record(errors)
  }
}
