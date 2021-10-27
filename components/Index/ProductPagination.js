import React, { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import PagiBtn from '../../components/Index/PagiBtn';
import {
  HiChevronLeft,
  HiChevronDoubleLeft,
  HiChevronRight,
  HiChevronDoubleRight,
} from 'react-icons/hi';

export default function ProductPagination({ totalPages }) {
  const pages = Array.from({ length: totalPages }, (v, i) => i + 1);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  let currentHighlight = (page) =>
    currentPage === page
      ? 'bg-gray-600 text-white border-gray-300'
      : 'border-gray-600 text-gray-600 bg-white';

  function handleChangePage(e) {
    switch (e.currentTarget.name) {
      case 'prev':
        router.push(`/?page=${currentPage - 1}`);
        setCurrentPage(currentPage - 1);
        break;
      case 'next':
        router.push(`/?page=${currentPage + 1}`);
        setCurrentPage(currentPage + 1);
        break;
      default:
        const clickPage = +e.currentTarget.textContent;
        if (+clickPage === 1) {
          router.push(`/`);
          setCurrentPage(1);
        } else {
          router.push(`/?page=${clickPage}`);
          setCurrentPage(clickPage);
        }
        break;
    }
  }

  return (
    <div className='flex justify-center mb-20'>
      <nav className='block'>
        <div className='flex pl-0 rounded list-none flex-wrap'>
          <PagiBtn
            disabled={currentPage === 1}
            content={<HiChevronLeft />}
            handleClick={handleChangePage}
            name='prev'
          />

          {pages.map((p, i) => (
            <PagiBtn
              key={i}
              content={p}
              handleClick={handleChangePage}
              currentHighlight={currentHighlight(p)}
            />
          ))}
          <PagiBtn
            disabled={currentPage === totalPages}
            content={<HiChevronRight />}
            handleClick={handleChangePage}
            name='next'
          />
        </div>
      </nav>
    </div>
  );
}
