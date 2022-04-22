
export default {
  data() {
    return {
      searchTerms: ['workspace_name', 'workspace_type'],
      search: '',
      page: 1,
      pageLength: localStorage.getItem('pageSize') || 10,
      pageStart: 1,
      paginate: false,
      loading: false,
      pageSizes: [10, 25, 50, 100],
      dateFields: ['created_at__lte', 'created_at__gte'],
      date: '',
      params: {},
    }
  },

  computed: {
    normalizedData() {
      return this.searchTerms ? this.$utils.getFilteredData(this.data, this.search, this.searchTerms) : this.data
    },

    filteredData() {
      return this.paginate ? this.normalizedData.slice(this.pageStart - 1, this.pageStart + this.pageLength - 1) : this.normalizedData
    },

    dataCount() {
      return this.total || this.meta?.total || this.data.length || 0
    },

    noData() {
      return this.dataCount === 0
    },

    pagination() {
      return { itemsPerPage: this.pageLength, numberOfItems: this.dataCount, pageSizes: this.pageSizes, page: this.page  }
    },
  },

  created() {
    this.pageLength = 10
  },

  watch: {
    date: {
      immediate: true,
      handler(val, oldVal) {
        if (!val || !oldVal) return
        // if (val !== oldVal) {
        //   let values = val?.split(' to ')
        //   this.params[this.dateFields[0]] = values && values[1] ? this.$date.formatQueryParamsDate(values[1]) : null
        //   this.params[this.dateFields[1]] = values && values[0] ? this.$date.formatQueryParamsDate(values[0] || Date.now()) : null
        // }
      },
    },
  },

  methods: {
    async refresh(refreshData = false) {
      this.loading = true

      try {
        await this.getData(refreshData)
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    actionOnPagination(ev) {
      this.pageStart = ev.start
      this.pageLength = ev.length
      this.page = this.filteredData < ev.length ? 1 : ev.page
    },

    storePagination(ev) {
      this.pageStart = ev.start
      this.pageLength = ev.length
      this.page = ev.page
      this.refresh({ page: this.page, page_size: ev.length })
    },

    concatData(data, fields) {
      let fieldData = []
      fields.forEach(field => {
        fieldData.push(data[field])
      })
      return fieldData.filter(name => name).join(' ')
    },
  },
}