'use client';

import React from 'react';
import ProdutosHeader from './_components/ProdutosHeader';
import ProdutosSidebar from './_components/ProdutosSidebar';
import ProdutosTopBar from './_components/ProdutosTopBar';
import ProdutosGrid from './_components/ProdutosGrid';
import ProdutosPagination from './_components/ProdutosPagination';
import { useProdutos } from './_hooks/useProdutos';

export default function ProdutosPage() {
  const {
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    selectedGender,
    selectedBrandIds,
    selectedColors,
    minPrice,
    maxPrice,
    searchTerm,
    sortBy,
    setSortBy,
    loading,
    totalProducts,
    filteredCount,
    products,
    totalPages,
    genders,
    colors,
    brands,
    formatPrice,
    handleGenderChange,
    handleBrandChange,
    handleColorChange,
    setMinPrice,
    setMaxPrice,
    setSearchTerm,
    clearFilters,
  } = useProdutos();

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <ProdutosHeader />
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <ProdutosHeader />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <ProdutosSidebar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedGender={selectedGender}
            onGenderChange={handleGenderChange}
            selectedBrandIds={selectedBrandIds}
            onBrandChange={handleBrandChange}
            selectedColors={selectedColors}
            onColorChange={handleColorChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onApplyPrice={() => setCurrentPage(1)}
            onClearFilters={clearFilters}
            genders={genders}
            colors={colors}
            brands={brands}
          />

          <div className="lg:w-3/4">
            <ProdutosTopBar
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalProducts={totalProducts}
              filteredCount={filteredCount}
            />

            <ProdutosGrid
              products={products}
              viewMode={viewMode}
              formatPrice={formatPrice}
              onClearFilters={clearFilters}
            />

            <ProdutosPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}