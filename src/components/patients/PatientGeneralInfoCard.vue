<template>
  <EditableCard title="General Information">
    <div>
      <div class="flex my-2 space-x-6">
        <InfoSubBlock
          label="Blood type"
          :description="patient.blood_type"
        />
        <InfoSubBlock
          label="Weight"
          :description="vitals ? `${vitals.WEIGHT_KG}kg` : '-'"
        />
        <InfoSubBlock
          label="Height"
          :description="vitals ? `${vitals.HEIGHT_CM}cm` : '-'"
        />
      </div>
      <div class="h-px w-full bg-serenity-light-gray my-5" />
      <div class="grid grid-cols-2 gap-6 text-xs my-5">
        <InfoBlock
          label="Date of Birth"
          :description="$date.formatDate(patient.birth_date, 'dd MMM yyyy') || '-'"
        />
        <InfoBlock
          label="Phone Number"
          :description="patient.user ? patient.user.mobile : '-'"
        />
        <InfoBlock
          label="Address"
          :description="patient.address_description|| '-'"
        />
        <InfoBlock
          label="Email"
          :description="patient.user ? patient.user.email : '-'"
        />
      </div>
    </div>
  </EditableCard>
</template>


<script>

export default {
  name: 'PatientGeneralInfoCard',

  props: {
    patient: {
      type: Object,
      default: () => {},
    },
    vitals: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

