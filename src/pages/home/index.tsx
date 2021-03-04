import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Header } from '../../components/header';
import { Product } from '../../interfaces/product.interface';
import { getProductsRequest } from '../../services/api';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsRequest()
      .then(res => {
        console.log(res);
        setProducts(res.data);

      })
      .catch(err => {
        console.error('Fail to get products');
      });
  }, []);

  return (
    <>
    <Header />
    <main className="container">
      <h4 className="mb-4">Products List</h4>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td className="text-center">
                  <Link className="btn btn-sm btn-primary m-1" to="" title="View">
                    <FontAwesomeIcon icon={faEye} size="1x" />
                  </Link>
                  <Link className="btn btn-sm btn-secondary m-1" to="" title="Edit">
                    <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                  </Link>
                  <Link className="btn btn-sm btn-danger m-1" to="" title="Delete">
                    <FontAwesomeIcon icon={faTrash} size="1x" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex align-items-center justify-content-center">
          <nav aria-label="Products pagination">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="?" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="?">1</a></li>
              <li className="page-item"><a className="page-link" href="?">2</a></li>
              <li className="page-item"><a className="page-link" href="?">3</a></li>
              <li className="page-item">
                <a className="page-link" href="?" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
    </main>
    </>
  );
}

export default Home;