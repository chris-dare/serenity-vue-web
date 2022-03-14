import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      search: '',
      pageStart: 1,
      paginate: false,
      loading: false,
      pageSizes: [10, 25, 50, 100],
      // these are the filters
      params: {
        page: 1,
        page_size: 10,
      },
      filter: '',
      dataMeta: null,
    }
  },

  computed: {
    dataCount() {
      return this.total || this.dataMeta?.total || this.data.length || 0
    },

    noData() {
      return this.dataCount === 0
    },

    pagination() {
      return { itemsPerPage: this.params.page_size, numberOfItems: this.dataCount, pageSizes: this.pageSizes, page: this.params.page  }
    },
  },

  methods: {
    async refresh() {
      this.loading = true

      try {
        const data = await this.getData(this.params)
        if (data) {
          this.dataMeta = data.meta
        }
        
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    actionOnPagination(ev) {
      this.pageStart = ev.start
      this.params.page_size = ev.length
      this.params.page = ev.page
      this.refresh(this.params)
    },

    concatData(data, fields) {
      let fieldData = []
      fields.forEach(field => {
        fieldData.push(data[field])
      })
      return fieldData.filter(name => name).join(' ')
    },

    searchData: debounce(function() {
      this.params.page = 1
      this.refresh()
    }, 500, false),
  },
}