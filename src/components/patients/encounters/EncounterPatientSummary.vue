<template functional>
  <div class="space-y-8 p-8">
    <p class="font-semibold">Patient details</p>
    <div class="flex items-center space-x-4">
      <ImageBlock
        v-if="props.patient"
        :url="props.patient.url"
        :alt="props.patient.name"
      />
      <ImageBlock
        v-else
        :url="null"
        :alt="null"
      />
      <div>
        <div
          v-if="props.patient"
          role="button"
          class="cursor-pointer"
          @click="listeners['click']"
        >
          <p>{{ props.patient.name }}</p>
        </div>
        <p v-else>--</p>
        <p class="text-secondary capitalize">
          <template v-if="props.patient">
            {{ props.patient.gender_age_description }}, {{ props.patient.mr_number }}
          </template>
          <template v-else>--</template>
        </p>
        <div class="mt-2 flex items-center">
          <div class="bg-green-700 w-3 h-3 rounded-full mr-2" />
          <p class="capitalize">{{ props.status }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="props.patient"
      class="grid grid-cols-3 gap-4"
    >
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
