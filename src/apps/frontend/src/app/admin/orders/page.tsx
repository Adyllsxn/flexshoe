'use client';

import OrdersHeader from './_components/OrdersHeader';
import OrdersStats from './_components/OrdersStats';
import OrdersFilters from './_components/OrdersFilters';
import OrdersTable from './_components/OrdersTable';
import { useOrders } from './_hooks/useOrders';

export default function OrdersPage() {
  const {
    orders,
    loading,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    searchTerm,
    statusFilter,
    showFilters,
    totalOrders,
    totalRevenue,
    pendingOrders,
    deliveredOrders,
    setCurrentPage,
    handleSearch,
    handleStatusFilter,
    toggleFilters,
  } = useOrders();

  return (
    <div className="space-y-6">
      <OrdersHeader />
      <OrdersStats
        totalOrders={totalOrders}
        totalRevenue={totalRevenue}
        pendingOrders={pendingOrders}
        deliveredOrders={deliveredOrders}
      />
      <OrdersFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        statusFilter={statusFilter}
        onStatusChange={handleStatusFilter}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
      />
      <OrdersTable
        orders={orders}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        loading={loading}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}