'use client';

import PermissoesHeader from './_components/PermissoesHeader';
import PermissoesTable from './_components/PermissoesTable';
import EditRoleModal from './_modals/EditRoleModal';
import { usePermissoes } from './_hooks/usePermissoes';

export default function PermissoesPage() {
  const {
    users,
    roles,
    loading,
    editingUser,
    selectedRole,
    saving,
    setSelectedRole,
    openEditModal,
    closeModal,
    handleSaveRole,
  } = usePermissoes();

  return (
    <div className="space-y-6">
      <PermissoesHeader />
      <PermissoesTable users={users} loading={loading} onEdit={openEditModal} />
      <EditRoleModal
        isOpen={!!editingUser}
        user={editingUser}
        selectedRole={selectedRole}
        roles={roles}
        saving={saving}
        onClose={closeModal}
        onRoleChange={setSelectedRole}
        onSave={handleSaveRole}
      />
    </div>
  );
}