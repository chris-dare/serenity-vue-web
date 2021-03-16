
export default {
  data() {
    return {
      searchTerms: ['workspace_name', 'workspace_type'],
      search: '',
      page: 1,
      pageLength: 10,
      pageStart: 0,
    }
  },
  computed: {
    filteredData() {
      return this.data.filter(data => {
        if (!this.search) {
          return data
        }

        for (let index = 0; index < this.searchTerms.length; index++) {
          const element = this.searchTerms[index]
          if (data[element].toLowerCase().includes(this.search.toLowerCase())) {
            return data
          }
        }
      })
      //   for pagination
      //   .slice(this.pageStart-1, this.pageStart + this.pageLength)
      
    },

    dataCount() {
      return this.data.length
    },

    pagination() {
      return { numberOfItems: this.dataCount, pageSizes: [10, 15, 20, 25]  }
    },
  },
    
  // created() {
  //   this.refresh()
  // },
    
  methods: {
    async refresh() {
      this.loading = true
      await this.getData()
      this.loading = false
    },

    actionOnPagination(ev) {
      this.pageStart = ev.start
      this.pageLength = ev.length
      this.page = ev.page
    },
  },
}