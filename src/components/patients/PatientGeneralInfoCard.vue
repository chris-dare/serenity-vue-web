<template functional>
  <EditableCard title="General Information">
    <div>
      <div class="flex my-2 space-x-6">
        <InfoSubBlock
          label="Blood type"
          description="AB+"
        />
        <InfoSubBlock
          label="Weight"
          :description="`${props.vitals.WEIGHT_KG || 0}kg`"
        />
        <InfoSubBlock
          label="Height"
          :description="`${props.vitals.HEIGHT_CM || 0}cm`"
        />
      </div>
      <div class="h-px w-full bg-serenity-light-gray my-5" />
      <div class="grid grid-cols-2 gap-6 text-xs my-5">
        <InfoBlock
          label="Date of Birth"
          :description="props.patient.birth_date|| '-'"
        />
        <InfoBlock
          label="Phone Number"
          :description="props.patient.user.mobile|| '-'"
        />
        <InfoBlock
          label="Address"
          :description="props.patient.address_description|| '-'"
        />
        <InfoBlock
          label="Email"
          :description="props.patient.user.email|| '-'"
        />
      </div>
    </div>
  </EditableCard>
</template>
