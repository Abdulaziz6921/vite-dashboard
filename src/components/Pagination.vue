<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["next-page", "prev-page", "go-to-page"]);

const startItem = computed(() => {
  return (props.currentPage - 1) * props.pageSize + 1;
});

const endItem = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.total);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;

  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(props.totalPages, start + maxVisible - 1);

  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("go-to-page", page);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("next-page");
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("prev-page");
  }
};
</script>

<template>
  <div class="pagination">
    <div class="pagination-info">
      <span v-if="total > 0" class="info-text">
        Показано {{ startItem }}–{{ endItem }} из {{ total }} результатов
      </span>
      <span v-else class="info-text"> Результаты не найдены </span>
    </div>

    <div v-if="totalPages > 1" class="pagination-controls">
      <!-- Previous button -->
      <button
        class="pagination-button"
        :class="{ disabled: currentPage === 1 }"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        ← Назад
      </button>

      <!-- First page -->
      <button
        v-if="visiblePages[0] > 1"
        class="pagination-number"
        @click="goToPage(1)"
      >
        1
      </button>

      <!-- Ellipsis -->
      <span v-if="visiblePages[0] > 2" class="pagination-ellipsis"> ... </span>

      <!-- Visible page numbers -->
      <button
        v-for="page in visiblePages"
        :key="page"
        class="pagination-number"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <!-- Ellipsis -->
      <span
        v-if="visiblePages[visiblePages.length - 1] < totalPages - 1"
        class="pagination-ellipsis"
      >
        ...
      </span>

      <!-- Last page -->
      <button
        v-if="visiblePages[visiblePages.length - 1] < totalPages"
        class="pagination-number"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </button>

      <!-- Next button -->
      <button
        class="pagination-button"
        :class="{ disabled: currentPage === totalPages }"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Вперед →
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  flex-wrap: wrap;
  gap: 1rem;
}

.pagination-info {
  color: #4a5568;
  font-size: 0.875rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.pagination-button,
.pagination-number {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  font-size: 0.875rem;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-button:hover:not(.disabled),
.pagination-number:hover:not(.active) {
  background-color: #f7fafc;
  border-color: #cbd5e0;
}

.pagination-number.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
}

.pagination-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f7fafc;
}

.pagination-ellipsis {
  padding: 0.5rem;
  color: #a0aec0;
  font-size: 0.875rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .pagination {
    flex-direction: column;
    text-align: center;
  }

  .pagination-controls {
    justify-content: center;
    flex-wrap: wrap;
  }

  .pagination-button,
  .pagination-number {
    padding: 0.375rem 0.5rem;
    font-size: 0.8rem;
    min-width: 35px;
  }
}
</style>
