'use client';

interface ProdutosPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProdutosPagination({ currentPage, totalPages, onPageChange }: ProdutosPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: number[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-10">
      <nav className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-200 rounded-lg text-gray-400 hover:border-black hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Anterior</span>
        </button>
        
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-2 border rounded-lg transition ${
              currentPage === pageNum
                ? 'bg-black text-white border-black'
                : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
            }`}
          >
            {pageNum}
          </button>
        ))}
        
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-gray-200 rounded-lg text-gray-400 hover:border-black hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Próximo</span>
        </button>
      </nav>
    </div>
  );
}