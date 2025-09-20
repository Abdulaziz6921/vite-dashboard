<script setup>
const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-filter", "clear-filters"]);

const updateFilter = (key, value) => {
  emit("update-filter", key, value);
};

const clearFilters = () => {
  emit("clear-filters");
};
</script>

<template>
  <div class="filters-panel">
    <div class="panel-header">
      <h3>Фильтры</h3>
      <button class="clear-button" @click="clearFilters">Очистить всё</button>
    </div>

    <div class="filters-content">
      <!-- Date Range Filters -->
      <div class="filter-group">
        <label for="dateFrom" class="filter-label">Дата с</label>
        <input
          id="dateFrom"
          type="date"
          :value="filters.dateFrom"
          @change="updateFilter('dateFrom', $event.target.value)"
          class="filter-input"
        />
      </div>

      <div class="filter-group">
        <label for="dateTo" class="filter-label">Дата по</label>
        <input
          id="dateTo"
          type="date"
          :value="filters.dateTo"
          @change="updateFilter('dateTo', $event.target.value)"
          class="filter-input"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters-panel {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.panel-header h3 {
  margin: 0;
  color: #2d3748;
  font-size: 1.125rem;
  font-weight: 600;
}

.clear-button {
  background: none;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.clear-button:hover {
  background-color: #f7fafc;
  border-color: #cbd5e0;
}

.filters-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.filter-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: white;
}

.filter-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .filters-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .panel-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .clear-button {
    width: 100%;
  }
}
</style>
