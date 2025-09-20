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
} = useApi("sales");

const columns = [
  { key: "sale_id", label: "ID", sortable: true },
  { key: "subject", label: "Товар", sortable: false },
  { key: "spp", label: "Количество", sortable: true },
  { key: "total_price", label: "Сумма", sortable: true },
  { key: "discount_percent", label: "Скидка(%)", sortable: true },
  { key: "date", label: "Дата", sortable: true },
  { key: "barcode", label: "Штрихкод", sortable: false },
  { key: "warehouse_name", label: "Склад", sortable: false },
  { key: "country_name", label: "Страна", sortable: false },
  { key: "oblast_okrug_name", label: "Область/округ", sortable: false },
  { key: "region_name", label: "Регион", sortable: false },
  { key: "for_pay", label: "К оплате", sortable: true },
  { key: "finished_price", label: "Итоговая сумма", sortable: true },
  { key: "price_with_disc", label: "Сумма со скидкой", sortable: true },
  { key: "nm_id", label: "NM ID", sortable: false },
  { key: "category", label: "Категория", sortable: false },
  { key: "brand", label: "Бренд", sortable: false },
];

const chartData = computed(() => {
  if (!data.value || data.value.length === 0) return [];

  // Create monthly sales data
  const monthlySales = data.value.reduce((acc, item) => {
    const date = new Date(item.date || Date.now());
    const month = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    const total = parseFloat(item.spp) || 0;

    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += total;

    return acc;
  }, {});

  return Object.entries(monthlySales).map(([month, total]) => ({
    name: month,
    value: total,
  }));
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Продажи</h1>
      <p class="page-description">Мониторинг продаж и анализ тенденций</p>
    </div>

    <div class="content-grid">
      <div class="chart-section">
        <ChartCard
          title="Ежемесячные продажи"
          :data="chartData"
          type="bar"
          :loading="loading"
        />
      </div>

      <div class="filters-section">
        <FiltersPanel
          :filters="filters"
          @update-filter="updateFilter"
          @clear-filters="clearFilters"
        />
      </div>

      <div class="table-section">
        <DataTable
          :data="data"
          :columns="columns"
          :loading="loading"
          :error="error"
        />
      </div>

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
