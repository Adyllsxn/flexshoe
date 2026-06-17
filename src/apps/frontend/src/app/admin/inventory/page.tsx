'use client';

import InventoryHeader from './_components/InventoryHeader';
import InventoryStats from './_components/InventoryStats';
import InventoryFilters from './_components/InventoryFilters';
import InventoryTable from './_components/InventoryTable';
import InventoryModal from './_modals/InventoryModal';
import InventoryConfirmModal from './_modals/InventoryConfirmModal';
import { useInventory } from './_hooks/useInventory';

export default function InventoryPage() {
  const {
    inventory,
    loading,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    searchTerm,
    statusFilter,
    showModal,
    setShowModal,
    editingItem,
    saving,
    isAdmin,
    isEmployee,
    showConfirmModal,
    confirmAction,
    confirmItem,
    showFilterDropdown,
    formData,
    products,
    totalStock,
    totalReserved,
    totalAvailable,
    activeCount,
    setCurrentPage,
    setSearchTerm,
    setStatusFilter,
    setFormData,
    handleAddItem,
    handleEditItem,
    openEditModal,
    closeModal,
    openConfirmModal,
    closeConfirmModal,
    confirmActionHandler,
    handleFilterChange,
    getFilterLabel,
    setShowFilterDropdown,
  } = useInventory();

  const canCreate = isAdmin;
  const canEdit = isAdmin;
  const canDelete = isAdmin;

  if (loading && inventory.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <InventoryHeader onAddClick={() => setShowModal(true)} canCreate={canCreate} />
      
      <InventoryStats
        totalStock={totalStock}
        totalReserved={totalReserved}
        totalAvailable={totalAvailable}
        activeCount={activeCount}
      />
      
      <InventoryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={handleFilterChange}
        showFilterDropdown={showFilterDropdown}
        onToggleFilter={() => setShowFilterDropdown(!showFilterDropdown)}
        getFilterLabel={getFilterLabel}
      />
      
      <InventoryTable
        inventory={inventory}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        loading={loading}
        onPageChange={setCurrentPage}
        onEdit={openEditModal}
        onDelete={(id, name) => openConfirmModal(id, name, 'delete')}
        onRestore={(id, name) => openConfirmModal(id, name, 'restore')}
        canEdit={canEdit}
        canDelete={canDelete}
      />

      <InventoryModal
        isOpen={showModal}
        editingItem={editingItem}
        formData={formData}
        products={products}
        saving={saving}
        onClose={closeModal}
        onSave={editingItem ? handleEditItem : handleAddItem}
        onFormChange={setFormData}
      />

      <InventoryConfirmModal
        isOpen={showConfirmModal}
        itemName={confirmItem?.name || ''}
        action={confirmAction}
        onConfirm={confirmActionHandler}
        onCancel={closeConfirmModal}
      />
    </div>
  );
}