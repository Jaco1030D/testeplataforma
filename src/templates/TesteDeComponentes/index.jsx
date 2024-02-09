import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { collection, getDocs, limit, query, startAfter } from 'firebase/firestore';
import { db } from '../../firebase/Config';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(number => (
        <li key={number} className={currentPage === number ? 'active' : ''}>
          <button onClick={() => onPageChange(number)}>{number}</button>
        </li>
      ))}
    </ul>
  );
};
const TesteDeComponentes = ({ withBorder, title, showDropdown }) => {
  const [docs, setDocs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastVisible, setLastVisible] = useState()

  const pegaDados = async (last) => {

    let first

    if (last) {
      
      first = query(collection(db, 'archives'), limit(10), startAfter(last) )
    } else {
      first = query(collection(db, 'archives'), limit(10))
    }

    let documentSnapshots = await getDocs(first);

    console.log(documentSnapshots.docs);

    if (documentSnapshots.docs.length === 0) {
      first = query(collection(db, 'archives'), limit(10))

      documentSnapshots = await getDocs(first);
    }

    const lastVisibleDoc = documentSnapshots.docs[documentSnapshots.docs.length-1]

    setLastVisible(lastVisibleDoc)

    setDocs(
      documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    )


    return documentSnapshots
  }

  console.log(lastVisible);

  useEffect(() => {
    pegaDados()
  },[])

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Document List</h1>
      <ul>
        {docs.map(doc => (
          <li key={doc.id}>{doc.id}</li>
        ))}
      </ul>
      <button onClick={() => pegaDados(lastVisible)}>passa</button>
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
    </div>
  );
};

// const TesteDeComponentes = () => {
//   const rectangles = [
//     { withBorder: true, title: 'Número do projeto' },
//     { withBorder: false, title: 'Par de idiomas' },
//     { withBorder: true, title: 'Tipo' },
//     { withBorder: false, title: 'Arquivos', showDropdown: true },
//     { withBorder: true, title: 'Entrega' },
//     { withBorder: false, title: 'Área' },
//     { withBorder: false, title: 'Status' },
//     { withBorder: true, title: 'Valor' },
//   ];

//   return (
//     <div className="container-test">
//       {rectangles.map((rectangle, index) => (
//         <SmallRectangle
//           key={index}
//           withBorder={rectangle.withBorder}
//           title={rectangle.title}
//           showDropdown={rectangle.showDropdown}
//         />
//       ))}
//       <div className="large-rectangle">
//         {/* Content for the large rectangle */}
//       </div>
//     </div>
//   );
// };

export default TesteDeComponentes;
