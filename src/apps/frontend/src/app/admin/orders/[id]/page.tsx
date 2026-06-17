'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiArrowLeft, 
  FiPackage, 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiCalendar,
  FiDollarSign,
  FiRefreshCw
} from 'react-icons/fi';
import { toast } from 'sonner';
import { getMe } from '@/lib/modules/user';
import { getOrderById, updateOrderStatus } from '@/lib/modules/order';
import { getStatusColor, getStatusLabel, formatPrice, formatDate } from '../_constants/orders';
import UpdateStatusModal from '../_modals/UpdateStatusModal';
import type { Order } from '@/lib/modules/order';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const [userData, orderData] = await Promise.all([
        getMe(),
        getOrderById(orderId)
      ]);
      
      setIsAdmin(userData?.role === 'admin');
      
      if (orderData) {
        // Garantir que items existe
        if (!orderData.items) {
          orderData.items = [];
        }
        setOrder(orderData);
      } else {
        toast.error('Pedido não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar pedido:', error);
      toast.error('Erro ao carregar pedido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handleStatusUpdate = async (newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result) {
      setOrder(result);
      toast.success('Status atualizado com sucesso!');
    } else {
      toast.error('Erro ao atualizar status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Pedido não encontrado</h3>
        <Link href="/admin/orders" className="text-blue-600 hover:underline">Voltar para pedidos</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/orders" 
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pedido {order.orderNumber}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Detalhes do pedido</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
          {getStatusLabel(order.status)}
        </span>
        {isAdmin && (
          <button 
            onClick={() => setShowStatusModal(true)}
            className="ml-auto px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
          >
            <FiRefreshCw size={14} />
            Alterar Status
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiUser size={18} />
            Dados do Cliente
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FiUser className="text-gray-400" size={16} />
              <span className="text-gray-700 dark:text-gray-300">{order.clientName}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-gray-400" size={16} />
              <span className="text-gray-700 dark:text-gray-300">{order.clientPhone || '-'}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="text-gray-400" size={16} />
              <span className="text-gray-700 dark:text-gray-300">{order.clientAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCalendar className="text-gray-400" size={16} />
              <span className="text-gray-700 dark:text-gray-300">{formatDate(order.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiDollarSign size={18} />
            Resumo
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
              <span className="font-medium text-gray-800 dark:text-white">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Entrega</span>
              <span className="font-medium text-gray-800 dark:text-white">Grátis</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-800 dark:text-white font-semibold">Total</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <FiPackage size={18} />
            Itens do Pedido
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Produto</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Marca</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tamanho</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Cor</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Qtd</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Preço</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.productName}</td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{item.brandName}</td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{item.size}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <div className="w-2 h-2 rounded-full" style={{ 
                          backgroundColor: item.color === 'Preto' ? '#1a1a1a' : 
                                       item.color === 'Branco' ? '#ffffff' : 
                                       item.color === 'Vermelho' ? '#dc2626' :
                                       item.color === 'Azul' ? '#2563eb' :
                                       item.color === 'Verde' ? '#16a34a' :
                                       '#cccccc' 
                        }} />
                        {item.color}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{item.quantity}</td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{formatPrice(item.price)}</td>
                    <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{formatPrice(item.total)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-500">
                    Nenhum item encontrado neste pedido
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UpdateStatusModal
        isOpen={showStatusModal}
        orderId={orderId}
        currentStatus={order.status}
        onClose={() => setShowStatusModal(false)}
        onUpdate={handleStatusUpdate}
      />
    </div>
  );
}