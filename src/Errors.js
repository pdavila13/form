export default class Errors {
    /**
     *  Constructor
     */
  constructor () {
    this.errors = {}
  }

    /**
     * API
     */
  has (field) {
    return this.errors.hasOwnProperty(field)
  }

    /**
     * Determine if we hace any errors
     */
  any () {
    return Object.keys(this.errors).length > 0
  }

    /**
     * Retrieve the error message for a field
     *
     * @param field
     * @returns {*}
     */
  get (field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

    /**
     * Retrieve the error message for a field
     *
     * @param field
     * @returns {*}
     */
  getAllErrors (field) {
    if (this.errors[field]) {
      return this.errors[field]
    }
  }

    /**
     *
     * @param errors
     */
  record (errors) {
    this.errors = errors
  }

    /**
     *
     * @param field
     */
  clear (field) {
    if (field) {
      delete this.errors(field)
      return
    }
    this.errors = {}
  }
}
