'use client';

import MarcasHeader from './_components/MarcasHeader';
import MarcasStats from './_components/MarcasStats';
import MarcasFilters from './_components/MarcasFilters';
import MarcasTable from './_components/MarcasTable';
import MarcasModal from './_components/MarcasModal';
import MarcasConfirmModal from './_components/MarcasConfirmModal';
import { useMarcas } from './_hooks/useMarcas';
import { usePermissions } from '@/lib/hooks/usePermissions';

export default function MarcasPage() {
  const { isAdmin, isEmployee, canCreate, canEdit, canDelete, loading: permissionsLoading } = usePermissions();
  const {
    marcas,
    loading,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    activeCount,
    inactiveCount,
    searchTerm,
    statusFilter,
    showModal,
    showConfirmModal,
    confirmAction,
    confirmMarca,
    editingMarca,
    setCurrentPage,
    handleSearch,
    handleStatusFilter,
    handleAddMarca,
    handleEditMarca,
    openEditModal,
    closeModal,
    openConfirmModal,
    closeConfirmModal,
    confirmToggleStatus,
  } = useMarcas();

  if (loading || permissionsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  // Se não tem permissão para ver, mostra mensagem
  if (!isEmployee) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Acesso Restrito</h2>
          <p className="text-gray-500">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MarcasHeader onAddClick={() => openEditModal(null)} canCreate={canCreate} />
      <MarcasStats total={marcas.length} active={activeCount} inactive={inactiveCount} />
      <MarcasFilters 
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        statusFilter={statusFilter}
        onStatusChange={handleStatusFilter}
      />
      <MarcasTable
        marcas={marcas}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        onPageChange={setCurrentPage}
        onEdit={openEditModal}
        onDelete={openConfirmModal}
        canEdit={canEdit}
        canDelete={canDelete}
      />
      <MarcasModal
        isOpen={showModal}
        editingMarca={editingMarca}
        onClose={closeModal}
        onSave={editingMarca ? handleEditMarca : handleAddMarca}
      />
      <MarcasConfirmModal
        isOpen={showConfirmModal}
        marcaName={confirmMarca?.name || ''}
        action={confirmAction}
        onConfirm={confirmToggleStatus}
        onCancel={closeConfirmModal}
      />
    </div>
  );
}