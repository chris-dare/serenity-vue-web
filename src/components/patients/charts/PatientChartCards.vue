<template>
  <div>
    <div class="grid grid-cols-4 gap-2">
      <ChartCard :chart="chart" v-for="(chart, index) in charts" :key="index" />
      <NewChart />
    </div>
    <div class="grid grid-cols-2 gap-2 my-2">
        <EditableCard type="comment" title="Diagnosis/Issues">
            <div class="py-4">
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Asthma">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
            </div>
        </EditableCard>
        <EditableCard type="pills" title="Current Medication">
            <div class="py-4">
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Asthma">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
            </div>
        </EditableCard>
        <EditableCard type="comment" title="Medical conditions">
            <div class="py-4">
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Asthma">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
            </div>
        </EditableCard>
        <EditableCard type="pills" title="Medications">
            <div class="py-4">
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Asthma">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
            </div>
        </EditableCard>
        <EditableCard type="add" title="Allegies">
            <div class="py-4">
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Asthma">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
            </div>
        </EditableCard>
        <EditableCard title="Social History">
            <div class="py-4">
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Asthma">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
                <ToggleList title="Migraines (Jun 28, 2020)">
                    <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
                </ToggleList>
            </div>
        </EditableCard>
    </div>

  </div>
</template>

<script>
import NewChart from './NewChart'
import ChartCard from './ChartCard'


export default {
  name: 'PatientChartCards',

  components: { NewChart, ChartCard },

  data() {
    return {
      charts: [
        {
          title: 'Blood pressure',
          value: '125/85',
          per: 'Monthly',
          status: 'Normal',
          status_color: 'success',
        },
        {
          title: 'Heart rate',
          value: '84',
          per: 'per min',
          status: 'Normal',
          status_color: 'success',
        },
        {
          title: 'Oxygen sat',
          value: '85%',
          per: '',
          status: 'Below Normal',
          status_color: 'fail',
        },
        {
          title: 'Temperature',
          value: '36',
          per: 'C',
          status: 'Normal',
          status_color: 'success',
        },
        {
          title: 'BMI status',
          value: '25.4',
          per: '',
          status: 'Overweight',
          status_color: 'fail',
        },
        {
          title: 'Respiration',
          value: '22',
          per: 'per min',
          status: 'Normal',
          status_color: 'success',
        },
      ],
    }
  },
}
</script>
