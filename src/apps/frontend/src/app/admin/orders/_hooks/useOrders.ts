'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllOrders, type Order } from '@/lib/modules/order';
import { getMe } from '@/lib/modules/user';
import { toast } from 'sonner';
import { ITEMS_PER_PAGE } from '../_constants/orders';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const [ordersData, userData] = await Promise.all([
        getAllOrders(1, 100),
        getMe()
      ]);
      
      if (ordersData?.data) {
        setOrders(ordersData.data);
      }
      setIsAdmin(userData?.role === 'admin');
    } catch (error) {
      toast.error('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return {
    orders: paginatedOrders,
    loading,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    searchTerm,
    statusFilter,
    showFilters,
    isAdmin,
    totalOrders,
    totalRevenue,
    pendingOrders,
    deliveredOrders,
    setCurrentPage,
    handleSearch,
    handleStatusFilter,
    toggleFilters,
    fetchOrders,
  };
}