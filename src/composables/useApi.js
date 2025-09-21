// import { ref, reactive, computed, watch } from "vue";
// import { apiService } from "../services/api";

// export function useApi(endpoint) {
//   const data = ref([]);
//   const loading = ref(false);
//   const error = ref(null);
//   const total = ref(0);
//   const currentPage = ref(1);
//   const pageSize = ref(10);

//   const filters = reactive({
//     search: "",
//     dateFrom: "",
//     dateTo: "",
//     status: "",
//     category: "",
//   });

//   const totalPages = computed(() =>
//     total.value > 0 ? Math.ceil(total.value / pageSize.value) : 1
//   );
//   const hasNextPage = computed(() => currentPage.value < totalPages.value);
//   const hasPrevPage = computed(() => currentPage.value > 1);

//   const buildParams = () => {
//     const params = {
//       page: currentPage.value,
//       limit: pageSize.value,
//     };

//     const now = new Date();

//     if (endpoint === "stocks") {
//       // For stocks, using today's date if no filter is set
//       const todayStr = now.toISOString().slice(0, 10);
//       params.dateFrom = filters.dateFrom || todayStr;
//       params.dateTo = filters.dateTo || todayStr;
//     } else {
//       // For other endpoints, default to last 1 month if no filter
//       const lastMonth = new Date();
//       lastMonth.setMonth(now.getMonth() - 1);
//       params.dateFrom =
//         filters.dateFrom || lastMonth.toISOString().slice(0, 10);
//       params.dateTo = filters.dateTo || now.toISOString().slice(0, 10);
//     }

//     if (filters.search) params.search = filters.search;
//     if (filters.status) params.status = filters.status;
//     if (filters.category) params.category = filters.category;

//     return params;
//   };

//   const fetchData = async () => {
//     if (loading.value) return;
//     loading.value = true;
//     error.value = null;

//     try {
//       const params = buildParams();
//       let result;

//       switch (endpoint) {
//         case "incomes":
//           result = await apiService.getIncomes(params);
//           break;
//         case "orders":
//           result = await apiService.getOrders(params);
//           break;
//         case "sales":
//           result = await apiService.getSales(params);
//           break;
//         case "stocks":
//           result = await apiService.getStocks(params);
//           break;
//         default:
//           result = [];
//       }

//       if (result && typeof result === "object") {
//         if (result.data && Array.isArray(result.data)) {
//           data.value = result.data;
//           total.value =
//             currentPage.value * pageSize.value +
//             (result.data.length > 0 ? 1 : 0);
//         } else if (Array.isArray(result)) {
//           data.value = result;
//           total.value = result.length;
//         } else {
//           data.value = [];
//           total.value = 0;
//         }
//       } else {
//         data.value = [];
//         total.value = 0;
//       }
//     } catch (err) {
//       error.value = err.message || "Failed to fetch data";
//       data.value = [];
//       total.value = 0;
//       console.error("API fetch error:", err);
//     } finally {
//       loading.value = false;
//     }
//   };

//   const nextPage = () => {
//     if (hasNextPage.value) {
//       currentPage.value++;
//       fetchData();
//     }
//   };

//   const prevPage = () => {
//     if (hasPrevPage.value) {
//       currentPage.value--;
//       fetchData();
//     }
//   };

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages.value) {
//       currentPage.value = page;
//       fetchData();
//     }
//   };

//   const applyFilters = () => {
//     currentPage.value = 1;
//     fetchData();
//   };

//   const clearFilters = () => {
//     filters.search = "";
//     filters.dateFrom = "";
//     filters.dateTo = "";
//     filters.status = "";
//     filters.category = "";
//     currentPage.value = 1;
//     fetchData();
//   };

//   const updateFilter = (key, value) => {
//     filters[key] = value;
//   };

//   let searchTimeout;
//   watch(
//     () => filters.search,
//     () => {
//       clearTimeout(searchTimeout);
//       searchTimeout = setTimeout(() => {
//         applyFilters();
//       }, 500);
//     }
//   );

//   watch(
//     () => [filters.dateFrom, filters.dateTo, filters.status, filters.category],
//     () => {
//       applyFilters();
//     },
//     { deep: true }
//   );

//   return {
//     data,
//     loading,
//     error,
//     total,
//     currentPage,
//     pageSize,
//     filters,

//     totalPages,
//     hasNextPage,
//     hasPrevPage,

//     fetchData,
//     nextPage,
//     prevPage,
//     goToPage,
//     applyFilters,
//     clearFilters,
//     updateFilter,
//   };
// }
import { ref, reactive, computed, watch } from "vue";
import { apiService } from "../services/api";

export function useApi(endpoint) {
  const data = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(10);

  const filters = reactive({
    search: "",
    dateFrom: "",
    dateTo: "",
    status: "",
    category: "",
  });

  const totalPages = computed(() =>
    total.value > 0 ? Math.ceil(total.value / pageSize.value) : 1
  );
  const hasNextPage = computed(() => currentPage.value < totalPages.value);
  const hasPrevPage = computed(() => currentPage.value > 1);

  const buildParams = () => {
    const params = {
      page: currentPage.value,
      limit: pageSize.value,
    };

    const now = new Date();

    if (endpoint === "stocks") {
      const todayStr = now.toISOString().slice(0, 10);
      params.dateFrom = filters.dateFrom || todayStr;
      params.dateTo = filters.dateTo || todayStr;
    } else {
      const lastMonth = new Date();
      lastMonth.setMonth(now.getMonth() - 1);
      params.dateFrom =
        filters.dateFrom || lastMonth.toISOString().slice(0, 10);
      params.dateTo = filters.dateTo || now.toISOString().slice(0, 10);
    }

    if (filters.search) params.search = filters.search;
    if (filters.status) params.status = filters.status;
    if (filters.category) params.category = filters.category;

    return params;
  };

  const fetchData = async () => {
    if (loading.value) return;
    loading.value = true;
    error.value = null;

    try {
      const params = buildParams();
      let result;

      switch (endpoint) {
        case "incomes":
          result = await apiService.getIncomes(params);
          break;
        case "orders":
          result = await apiService.getOrders(params);
          break;
        case "sales":
          result = await apiService.getSales(params);
          break;
        case "stocks":
          result = await apiService.getStocks(params);
          break;
        default:
          result = [];
      }

      if (result && typeof result === "object") {
        if (result.data && Array.isArray(result.data)) {
          data.value = result.data;
          total.value =
            currentPage.value * pageSize.value +
            (result.data.length > 0 ? 1 : 0);
        } else if (Array.isArray(result)) {
          data.value = result;
          total.value = result.length;
        } else {
          data.value = [];
          total.value = 0;
        }
      } else {
        data.value = [];
        total.value = 0;
      }
    } catch (err) {
      error.value = err.message || "Failed to fetch data";
      data.value = [];
      total.value = 0;
      console.error("API fetch error:", err);
    } finally {
      loading.value = false;
    }
  };

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++;
      fetchData();
    }
  };

  const prevPage = () => {
    if (hasPrevPage.value) {
      currentPage.value--;
      fetchData();
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      fetchData();
    }
  };

  const applyFilters = () => {
    currentPage.value = 1;
    fetchData();
  };

  const clearFilters = () => {
    filters.search = "";
    filters.dateFrom = "";
    filters.dateTo = "";
    filters.status = "";
    filters.category = "";
    currentPage.value = 1;
    fetchData();
  };

  const updateFilter = (key, value) => {
    filters[key] = value;
  };

  let searchTimeout;
  watch(
    () => filters.search,
    () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(applyFilters, 500);
    }
  );

  watch(
    () => [filters.dateFrom, filters.dateTo, filters.status, filters.category],
    applyFilters,
    { deep: true }
  );

  return {
    data,
    loading,
    error,
    total,
    currentPage,
    pageSize,
    filters,
    totalPages,
    hasNextPage,
    hasPrevPage,
    fetchData,
    nextPage,
    prevPage,
    goToPage,
    applyFilters,
    clearFilters,
    updateFilter,
  };
}
