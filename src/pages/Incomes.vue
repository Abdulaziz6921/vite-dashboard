<script setup>
import { onMounted, computed } from "vue";
import { useApi } from "../composables/useApi";
import ChartCard from "../components/ChartCard.vue";
import DataTable from "../components/DataTable.vue";
import FiltersPanel from "../components/FiltersPanel.vue";
import Pagination from "../components/Pagination.vue";

const {
  data,
  loading,
  error,
  total,
  currentPage,
  totalPages,
  filters,
  fetchData,
  nextPage,
  prevPage,
  goToPage,
  clearFilters,
  updateFilter,
} = useApi("incomes");

// Define columns for the data table
const columns = [
  { key: "income_id", label: "ИД", sortable: true },
  { key: "date", label: "Дата", sortable: true },
  { key: "last_change_date", label: "Последнее изменение", sortable: true },
  { key: "supplier_article", label: "Артикул поставщика", sortable: false },
  { key: "barcode", label: "Штрихкод", sortable: false },
  { key: "quantity", label: "Количество", sortable: true },
  { key: "date_close", label: "Дата закрытия", sortable: true },
  { key: "warehouse_name", label: "Склад", sortable: false },
  { key: "nm_id", label: "NM ID", sortable: false },
];

// Chart data computation
const chartData = computed(() => {
  if (!data.value || data.value.length === 0) return [];

  const grouped = data.value.reduce((acc, item) => {
    const warehouse = item.warehouse_name || "Unknown";
    const quantity = parseInt(item.quantity) || 0;

    if (!acc[warehouse]) acc[warehouse] = 0;
    acc[warehouse] += quantity;

    return acc;
  }, {});

  return Object.entries(grouped).map(([warehouse, totalQuantity]) => ({
    name: warehouse,
    value: totalQuantity,
  }));
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Доходы</h1>
      <p class="page-description">Управление и анализ данных о доходах</p>
    </div>

    <div class="content-grid">
      <!-- Chart Section -->
      <div class="chart-section">
        <ChartCard
          title="Доход по общему количеству на складе"
          :data="chartData"
          type="pie"
          :loading="loading"
        />
      </div>

      <!-- Filters Section -->
      <div class="filters-section">
        <FiltersPanel
          :filters="filters"
          @update-filter="updateFilter"
          @clear-filters="clearFilters"
        />
      </div>

      <!-- Data Table Section -->
      <div class="table-section">
        <DataTable
          :data="data"
          :columns="columns"
          :loading="loading"
          :error="error"
        />
      </div>

      <!-- Pagination Section -->
      <div class="pagination-section">
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :total="total"
          @next-page="nextPage"
          @prev-page="prevPage"
          @go-to-page="goToPage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0;
  color: #2d3748;
  font-size: 2rem;
  font-weight: 600;
}

.page-description {
  margin: 0.5rem 0 0 0;
  color: #718096;
  font-size: 1rem;
}

.content-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

.chart-section,
.filters-section,
.table-section,
.pagination-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "chart filters"
      "table table"
      "pagination pagination";
  }

  .chart-section {
    grid-area: chart;
  }

  .filters-section {
    grid-area: filters;
  }

  .table-section {
    grid-area: table;
  }

  .pagination-section {
    grid-area: pagination;
  }
}
</style>
