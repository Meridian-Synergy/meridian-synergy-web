<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  categoryLabel?: string
}>(), {
  title: 'Meridian Synergy',
  description: 'Télépilotes certifiés DGAC',
  categoryLabel: 'Cas d\'usage',
})
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      background: '#1B2B56',
      padding: '64px 72px',
      fontFamily: 'Inter, sans-serif',
    }"
  >
    <!-- Top accent bar -->
    <div
      :style="{
        display: 'flex',
        width: '56px',
        height: '4px',
        background: '#00AAEF',
        borderRadius: '2px',
        marginBottom: '32px',
      }"
    />

    <!-- Category badge -->
    <div
      :style="{
        display: 'flex',
        marginBottom: '20px',
      }"
    >
      <span
        :style="{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0, 170, 239, 0.18)',
          border: '1px solid rgba(0, 170, 239, 0.4)',
          color: '#00AAEF',
          fontSize: '14px',
          fontWeight: '700',
          padding: '5px 14px',
          borderRadius: '999px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }"
      >
        {{ categoryLabel }}
      </span>
    </div>

    <!-- Title -->
    <div
      :style="{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
      }"
    >
      <h1
        :style="{
          fontSize: '52px',
          fontWeight: '800',
          color: '#FFFFFF',
          lineHeight: '1.15',
          margin: '0 0 20px 0',
          letterSpacing: '-0.02em',
          maxWidth: '880px',
        }"
      >
        {{ title }}
      </h1>

      <p
        :style="{
          fontSize: '22px',
          color: 'rgba(255, 255, 255, 0.68)',
          lineHeight: '1.55',
          margin: '0',
          maxWidth: '780px',
        }"
      >
        {{ description }}
      </p>
    </div>

    <!-- Footer -->
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.14)',
        paddingTop: '24px',
        marginTop: '40px',
      }"
    >
      <span
        :style="{
          fontSize: '18px',
          fontWeight: '700',
          color: '#FFFFFF',
          letterSpacing: '-0.01em',
        }"
      >
        Meridian Synergy
      </span>
      <span
        :style="{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.45)',
        }"
      >
        meridian-synergy.com
      </span>
    </div>
  </div>
</template>
