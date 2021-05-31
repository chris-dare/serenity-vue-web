<template functional>
  <div class="space-y-8 p-8">
    <p class="font-semibold">Patient details</p>
    <div class="flex items-center space-x-4">
      <ImageBlock
        :url="props.patient.url"
        :alt="props.patient.name"
      />
      <div>
        <p>{{ props.patient.name }}</p>
        <p class="text-secondary  capitalize">
          {{ props.patient.gender_age_description }}
        </p>
        <div class="mt-2 flex items-center">
          <div class="bg-green-700 w-3 h-3 rounded-full mr-2" />
          <p class="capitalize">{{ props.status }}</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <InfoSubBlock
        label="Blood Type"
        :description="props.patient.blood_type"
      />
      <InfoSubBlock
        label="Weight"
        :description="props.vitals.WEIGHT_KG ? `${props.vitals.WEIGHT_KG}kg` : null"
      />
      <InfoSubBlock
        label="Height"
        :description="props.vitals.HEIGHT_CM ? `${props.vitals.HEIGHT_CM}cm` : null"
      />
    </div>
  </div>
</template>
