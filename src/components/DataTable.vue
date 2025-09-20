<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
});

const sortKey = ref("");
const sortOrder = ref(1); // 1 for asc, -1 for desc

const sortedData = computed(() => {
  if (!sortKey.value) return props.data;

  return [...props.data].sort((a, b) => {
    let aVal = a[sortKey.value];
    let bVal = b[sortKey.value];

    // Handle different data types
    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return -1 * sortOrder.value;
    if (aVal > bVal) return 1 * sortOrder.value;
    return 0;
  });
});

const sort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
};

const formatValue = (value, key) => {
  if (value === null || value === undefined) return "-";

  // Format dates
  if (key.toLowerCase().includes("date")) {
    try {
      return new Date(value).toLocaleDateString();
    } catch {
      return value;
    }
  }

  // Format numbers
  const num = Number(value); // Convert string to number
  if (!isNaN(num)) {
    return !Number.isInteger(num) ? num.toFixed(2) : num;
  }

  return value;
};

const getSortIcon = (columnKey) => {
  if (sortKey.value !== columnKey) return "↕️";
  return sortOrder.value === 1 ? "↑" : "↓";
};
</script>

<template>
  <div class="data-table">
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Загрузка данных...</p>
    </div>

    <div v-else-if="data.length === 0" class="empty-state">
      <p>Данные отсутствуют</p>
    </div>

    <div v-else class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="{ sortable: column.sortable }"
              @click="column.sortable && sort(column.key)"
            >
              <div class="header-content">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable" class="sort-icon">
                  {{ getSortIcon(column.key) }}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in sortedData"
            :key="row.id || index"
            class="table-row"
          >
            <td v-for="column in columns" :key="column.key" :class="column.key">
              {{ formatValue(row[column.key], column.key) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.data-table {
  width: 100%;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

thead {
  background-color: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #2d3748;
  border-bottom: 1px solid #e2e8f0;
}

th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

th.sortable:hover {
  background-color: #edf2f7;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  text-align: center;
}

.sort-icon {
  font-size: 0.8rem;
  opacity: 0.6;
}

td {
  text-align: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
}

.table-row:hover {
  background-color: #f7fafc;
}

.table-row:last-child td {
  border-bottom: none;
}

.loading-container,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #718096;
  text-align: center;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.error-message {
  padding: 1rem;
  background-color: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  color: #c53030;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  th,
  td {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .header-content {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
