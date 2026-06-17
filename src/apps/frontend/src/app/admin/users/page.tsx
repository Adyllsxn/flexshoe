'use client';

import UsersHeader from './_components/UsersHeader';
import UsersStats from './_components/UsersStats';
import UsersFilters from './_components/UsersFilters';
import UsersTable from './_components/UsersTable';
import UserModal from './_modals/UserModal';
import UserConfirmModal from './_modals/UserConfirmModal';
import { useUsers } from './_hooks/useUsers';

export default function UsersPage() {
  const {
    users,
    loading,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    searchTerm,
    statusFilter,
    showAddModal,
    editingUser,
    saving,
    isAdmin,
    isEmployee,
    showFilterDropdown,
    formData,
    error,
    showConfirmModal,
    confirmAction,
    confirmUserName,
    setSearchTerm,
    setCurrentPage,
    setShowAddModal,
    setEditingUser,
    setFormData,
    setShowFilterDropdown,
    handleAddUser,
    handleEditUser,
    openEditModal,
    handleFilterChange,
    getFilterLabel,
    openConfirmModal,
    closeConfirmModal,
    handleConfirmAction,
  } = useUsers();

  const canCreate = isAdmin;
  const canEdit = isAdmin;
  const canDelete = isAdmin;

  const activeUsers = users.filter(u => u.active && !u.deletedAt);
  const inactiveUsers = users.filter(u => !u.active || u.deletedAt);

  if (!isAdmin && !isEmployee) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Acesso Restrito</h2>
          <p className="text-gray-500 dark:text-gray-400">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin && isEmployee) {
    return (
      <div className="space-y-6">
        <UsersHeader onAddClick={() => {}} canCreate={false} />
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">👤</div>
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">Acesso Limitado</h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            Você tem acesso apenas ao seu próprio perfil. 
            Para gerenciar outros usuários, entre em contato com um administrador.
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
            Acesse seu perfil clicando no seu avatar no canto superior direito.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UsersHeader onAddClick={() => setShowAddModal(true)} canCreate={canCreate} />
      <UsersStats total={users.length} active={activeUsers.length} inactive={inactiveUsers.length} />
      <UsersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={handleFilterChange}
        showFilterDropdown={showFilterDropdown}
        onToggleFilter={() => setShowFilterDropdown(!showFilterDropdown)}
        getFilterLabel={getFilterLabel}
      />
      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <UsersTable
          users={users}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          loading={loading}
          onPageChange={setCurrentPage}
          onEdit={openEditModal}
          onDelete={(id) => {
            const user = users.find(u => u.id === id);
            if (user) openConfirmModal(id, user.name, 'delete');
          }}
          onRestore={(id) => {
            const user = users.find(u => u.id === id);
            if (user) openConfirmModal(id, user.name, 'restore');
          }}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      )}
      <UserModal
        isOpen={showAddModal || !!editingUser}
        editingUser={editingUser}
        formData={formData}
        saving={saving}
        onClose={() => {
          setShowAddModal(false);
          setEditingUser(null);
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        }}
        onSave={editingUser ? handleEditUser : handleAddUser}
        onFormChange={setFormData}
      />
      <UserConfirmModal
        isOpen={showConfirmModal}
        userName={confirmUserName}
        action={confirmAction}
        onConfirm={handleConfirmAction}
        onCancel={closeConfirmModal}
      />
    </div>
  );
}