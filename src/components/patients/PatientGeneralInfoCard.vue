<template functional>
  <EditableCard title="General Information">
    <div>
      <div class="flex my-2">
        <div>
          <p class="text-3xl font-bold text-serenity-primary">AB+</p>
          <p class="text-secondary text-xs">Blood type</p>
        </div>
        <div
          v-if="props.patient.weight"
          class="mx-5"
        >
          <p class="text-3xl font-bold text-serenity-primary">
            {{ props.patient.weight }}kg
          </p>
          <p class="text-secondary text-xs">Weight</p>
        </div>
        <div v-if="props.patient.height">
          <p class="text-3xl font-bold text-serenity-primary">
            {{ props.patient.height }}cm
          </p>
          <p class="text-secondary text-xs">Height</p>
        </div>
      </div>
      <div class="h-px w-full bg-serenity-light-gray my-5" />
      <div class="grid grid-cols-2 gap-6 text-xs my-5">
        <!-- <div>
          <p class="text-secondary text-xs mb-1">Date of Birth</p>
          <p class="font-bold">{{ props.patient.birth_date }}</p>
        </div> -->
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
        <!-- <div>
          <p class="text-secondary text-xs mb-1">Phone Number</p>
          <p class="font-bold">{{ props.patient.phone }}</p>
        </div>
        <div>
          <p class="text-secondary text-xs mb-1">Address</p>
          <p class="font-bold">{{ props.patient.address_description }}</p>
        </div>
        <div>
          <p class="text-secondary text-xs mb-1">Email</p>
          <p class="font-bold">{{ props.patient.email }}</p>
        </div> -->
      </div>
    </div>
  </EditableCard>
</template>
