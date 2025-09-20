<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">
        <h1>Панель данных</h1>
      </div>
      <ul class="nav-links">
        <li>
          <RouterLink to="/incomes" class="nav-link">Доходы</RouterLink>
        </li>
        <li>
          <RouterLink to="/orders" class="nav-link">Заказы</RouterLink>
        </li>
        <li>
          <RouterLink to="/sales" class="nav-link">Продажи</RouterLink>
        </li>
        <li>
          <RouterLink to="/stocks" class="nav-link">Акции</RouterLink>
        </li>
      </ul>
    </nav>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-brand h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.main-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
