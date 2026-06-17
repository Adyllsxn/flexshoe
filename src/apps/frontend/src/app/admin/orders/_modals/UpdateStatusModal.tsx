'use client';

import { useState } from 'react';
import { FiX, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { toast } from 'sonner';
import { updateOrderStatus } from '@/lib/modules/order';
import { STATUS_OPTIONS, STATUS_TRANSITIONS } from '../_constants/orders';

interface UpdateStatusModalProps {
  isOpen: boolean;
  orderId: string;
  currentStatus: string;
  onClose: () => void;
  onUpdate: (newStatus: string) => void;
}

export default function UpdateStatusModal({
  isOpen,
  orderId,
  currentStatus,
  onClose,
  onUpdate,
}: UpdateStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!isOpen) return null;

  // Verifica se o status atual pode ser alterado
  const canTransition = STATUS_TRANSITIONS[currentStatus] || [];
  const availableStatuses = STATUS_OPTIONS.filter(
    opt => opt.value !== 'all' && 
    opt.value !== currentStatus && 
    canTransition.includes(opt.value)
  );

  // Se estiver cancelado, não pode alterar
  if (currentStatus === 'cancelled') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Status Cancelado</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <FiX size={20} />
            </button>
          </div>
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🚫</div>
            <p className="text-gray-600 dark:text-gray-300">
              Este pedido foi cancelado e não pode mais ser alterado.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  // Se não houver status disponíveis para transição
  if (availableStatuses.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Alterar Status</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <FiX size={20} />
            </button>
          </div>
          <div className="text-center py-6">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-gray-600 dark:text-gray-300">
              Não é possível alterar o status deste pedido no momento.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  const handleStatusSelect = (status: string) => {
    // Se for cancelar um pedido entregue, pedir confirmação
    if (status === 'cancelled' && currentStatus === 'delivered') {
      setShowCancelConfirm(true);
      return;
    }
    setSelectedStatus(status);
  };

  const handleConfirmCancel = () => {
    setSelectedStatus('cancelled');
    setShowCancelConfirm(false);
    // Submete automaticamente
    handleSubmit('cancelled');
  };

  const handleSubmit = async (status?: string) => {
    const finalStatus = status || selectedStatus;
    
    if (finalStatus === currentStatus) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      const result = await updateOrderStatus(orderId, finalStatus);
      if (result) {
        onUpdate(finalStatus);
        toast.success(`Status atualizado para ${getStatusLabel(finalStatus)}!`);
        onClose();
      } else {
        toast.error('Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-500';
      case 'approved': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'delivered': return 'Entregue';
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Alterar Status</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <FiX size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Pedido: {orderId} • Status atual: <span className="font-medium">{getStatusLabel(currentStatus)}</span>
        </p>

        <div className="space-y-2">
          {availableStatuses.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusSelect(option.value)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all border ${
                selectedStatus === option.value
                  ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-700'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(option.value)}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                {option.value === 'cancelled' && currentStatus === 'delivered' && (
                  <span className="text-xs text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
                    ⚠️ Confirmar
                  </span>
                )}
              </div>
              {selectedStatus === option.value && (
                <FiCheck size={18} className="text-black dark:text-white" />
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleSubmit()}
            disabled={loading || selectedStatus === currentStatus}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? 'Atualizando...' : 'Atualizar'}
          </button>
        </div>
      </div>

      {/* Modal de confirmação para cancelar pedido entregue */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiAlertTriangle className="text-red-500 text-2xl" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Confirmar Cancelamento</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Este pedido já foi <span className="font-semibold text-green-600">entregue</span>. 
              Tem certeza que deseja <span className="font-semibold text-red-600">cancelar</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Voltar
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Confirmar Cancelamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}