'use client';

import ProdutosHeader from './_components/ProdutosHeader';
import ProdutosStats from './_components/ProdutosStats';
import ProdutosFilters from './_components/ProdutosFilters';
import ProdutosTable from './_components/ProdutosTable';
import ProdutosModal from './_modals/ProdutosModal';
import ProdutosConfirmModal from './_modals/ProdutosConfirmModal';
import { useProdutosAdmin } from './_hooks/useProdutosAdmin';

export default function ProdutosPage() {
  const {
    produtos,
    loading,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    searchTerm,
    statusFilter,
    genderFilter,
    brandFilter,
    showModal,
    showConfirmModal,
    confirmAction,
    confirmProduto,
    editingProduct,
    saving,
    canCreate,
    canEdit,
    canDelete,
    setCurrentPage,
    setSearchTerm,
    setStatusFilter,
    setGenderFilter,
    setBrandFilter,
    handleAddProduto,
    handleEditProduto,
    openEditModal,
    closeModal,
    openConfirmModal,
    closeConfirmModal,
    confirmActionHandler,
  } = useProdutosAdmin();

  if (loading && produtos.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProdutosHeader onAddClick={() => openEditModal(null)} canCreate={canCreate} />
      <ProdutosStats products={produtos} />
      <ProdutosFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        genderFilter={genderFilter}
        onGenderChange={setGenderFilter}
        brandFilter={brandFilter}
        onBrandChange={setBrandFilter}
      />
      <ProdutosTable
        produtos={produtos}
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
      <ProdutosModal
        isOpen={showModal}
        editingProduct={editingProduct}
        onClose={closeModal}
        onSave={editingProduct ? handleEditProduto : handleAddProduto}
        saving={saving}
      />
      <ProdutosConfirmModal
        isOpen={showConfirmModal}
        produtoName={confirmProduto?.name || ''}
        action={confirmAction}
        onConfirm={confirmActionHandler}
        onCancel={closeConfirmModal}
      />
    </div>
  );
}