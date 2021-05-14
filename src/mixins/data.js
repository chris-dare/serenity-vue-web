
export default {
  data() {
    return {
      searchTerms: ['workspace_name', 'workspace_type'],
      search: '',
      page: 1,
      pageLength: 10,
      pageStart: 1,
      paginate: false,
      loading: false,
      pageSizes: [10, 15, 20, 25],
    }
  },

  computed: {
    normalizedData() {
      return this.$utils.getFilteredData(this.data, this.search, this.searchTerms)
    },

    filteredData() {
      return this.paginate ? this.normalizedData.slice(this.pageStart - 1, this.pageStart + this.pageLength - 1) : this.normalizedData
    },

    dataCount() {
      return this.data.length || 0
    },

    noData() {
      return this.dataCount === 0
    },

    pagination() {
      return { itemsPerPage: this.pageLength, numberOfItems: this.dataCount, pageSizes: this.pageSizes  }
    },
  },
    
  // created() {
  //   this.refresh()
  // },
    
  methods: {
    async refresh(refreshData) {
      this.loading = true

      try {
        await this.getData(refreshData)
      } catch (error) {
        this.loading = false
      } finally {
        this.loading = false
      }
    },

    actionOnPagination(ev) {
      this.pageStart = ev.start
      this.pageLength = ev.length
      this.page = this.filteredData < ev.length ? 1 : ev.page
    },
  },
}